import {Alert, StyleSheet, View} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import SuperWebview from '~/common/components/SuperWebview'
import {useNavigation, useRoute} from '@react-navigation/native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {isIOS} from 'green-native-ts'
import {webViewURLs} from '~/configs'
import {useGlobalContext} from '~/provider/AppProvider'
import {closeTaobaoModal, detailJS} from '~/common/components/SuperWebview/injectScript'
import RestApi from '~/api/RestApi'
import translate from '~/api/translatetion'
import WebHeader from './WebHeader'
import WebFooter from './WebFooter'

import Modal1688 from './Modal1688'
import Spinner from 'react-native-loading-spinner-overlay'

const ProcessBar = props => {
  return (
    <View style={{height: 3, width: '100%', backgroundColor: '#fff'}}>
      <View style={{backgroundColor: '#81C784', height: '100%', width: `${props.percent}%`}} />
    </View>
  )
}

const WebScreen = () => {
  const webview = useRef(null)
  const [curUri, setCurUri] = useState<string>('')
  const [loadingPage, setLoadPage] = useState<boolean>(true)
  const [isRefresh, setRefresh] = useState(false)
  const [searchText, setSearchText] = useState('')

  const [addingToCart, setAddingToCart] = useState<boolean>(false)

  const {canBack, getCarts, isDetail, wvProcess, webState} = useGlobalContext()

  const router = useRoute<any>()

  const [Array1688, setArray1688] = useState([])
  const [priceStep, setPriceStep] = useState([])
  const [data1688, setData1688] = useState(null)
  const [extendInfo, setExtendInfo] = useState('')
  const [showModal168, setShowModal1688] = useState(false)

  useEffect(() => {
    if (router.params) {
      setCurUri(router.params?.url)
      setSearchText(router.params?.vnValue)
    }
  }, [router])

  const insets = useSafeAreaInsets()

  const SENDMESS_getCurrentProductProps = () => {
    console.log('---- GỌI HÀM: getCurrentProductProps: ', webState.url)

    const injectJs = (() => {
      if (webState.url.includes('taobao')) {
        return detailJS.TAOBAO
      }

      if (webState.url.includes('1688')) {
        setShowModal1688(true)
        return detailJS['1688']
      }

      return ''
    })()

    webview.current.injectJavaScript(injectJs)
  }

  const _onPressOrderProps = () => {
    if (isDetail) {
      if (webview.current) {
        let jsToggleViewinfo = ``

        if (webState.url.includes('taobao')) {
          jsToggleViewinfo = `if(document.querySelectorAll(".split > .card.sku .modal-mask-enter").length > 0){
                    document.querySelectorAll(".split > .card.sku .modal-mask-enter")[0].click();
                } else {
                    document.querySelectorAll(".split > .card.sku")[0].click();
                }`
        }

        if (webState.url.includes('1688')) {
          jsToggleViewinfo = `
            if(document.querySelectorAll("[data-track='addCart']").length > 0){
              document.querySelectorAll("[data-track='addCart']")[0].click();
            } else {
              document.querySelectorAll(".detail-footer")[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].click();
            }`
        }

        webview.current.injectJavaScript(jsToggleViewinfo)
      }
    }
  }

  const _onPressOrderAddToCart = () => {
    if (isDetail) {
      if (webview.current) {
        if (false) {
        } else {
          if (webState.url.includes('taobao')) {
            webview.current.injectJavaScript(`
              if(document.querySelectorAll(".split > .card.sku .modal-mask-enter").length > 0){
                } else {
                  document.querySelectorAll(".split > .card.sku")[0].click();
              }`)

            if (webState.url.includes('detail')) {
              webview.current.injectJavaScript(`
                if(document.querySelectorAll(".shop-title-text").length > 0){
                  window.ReactNativeWebView.postMessage(
                    JSON.stringify({ action: 'OHMY_SHOP', data: document.querySelectorAll(".shop-title-text")[0]?.innerText }),
                  );
                }
              `)
            }
          }

          // if (webState.url.includes('1688')) {
          //   webview.current.injectJavaScript(`
          //     if(document.querySelectorAll("[data-track='addCart']").length > 0){
          //       document.querySelectorAll("[data-track='addCart']")[0].click();
          //     } else {
          //       document.querySelectorAll(".detail-footer")[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].click();
          //     }`)
          // }

          SENDMESS_getCurrentProductProps()
        }
      }
    }
  }

  // Call api add product to cart
  async function addToCart(params, isNotShow?: boolean) {
    setAddingToCart(true)
    console.log('--------- IIIIII Adding to cart: ', params)

    try {
      const res = await RestApi.post('Cart/add-to-cart', params)
      if (res.status == 200 && !isNotShow) {
        await getCarts()
        webState.url.includes('taobao') && webview.current.injectJavaScript(closeTaobaoModal)

        Alert.alert('Thành công', 'Đã thêm vào giỏ hàng', [
          {
            text: 'Xem giỏ hàng',
            onPress: () => navigation.navigate('Cart'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ])
      }
    } catch (error) {
      Alert.alert('Lỗi', error?.message)
    } finally {
      setAddingToCart(false)
    }
  }

  const translateText = async text => {
    let temp = text
    try {
      const translateValue = await translate(text, {to: 'vi'})
      temp = await translateValue[0][0][0]
    } catch (error) {}
    return temp
  }

  const [shopId, setShopId] = useState('')

  const _onMessage = async e => {
    console.log('________onMessage data: ', JSON.parse(e?.nativeEvent?.data))

    const res = JSON.parse(e.nativeEvent.data)

    switch (JSON.parse(e?.nativeEvent?.data).action) {
      case 'OHMY_SHOP_ID':
        const shopIdTemp = await JSON.parse(e?.nativeEvent?.data)?.data
        console.log('--- shopIdTemp: ', shopIdTemp)

        setShopId(shopIdTemp)
        break

      case 'OHMY_SHOP':
        const shopNameTemp = await JSON.parse(e?.nativeEvent?.data)?.data

        break

      case 'GET_PRODUCT_PROPS_TB':
        if (e?.nativeEvent?.data) {
          const temp = await JSON.parse(e?.nativeEvent?.data)?.data

          let theFuckingTamp = []
          let thePropIdsTamp = []

          if (temp) {
            if (temp?.productSKU?.list) {
              for (let i = 0; i < temp?.productSKU?.list.length; i++) {
                const element = temp?.productSKU?.list[i]
                if (element?.props) {
                  for (let k = 0; k < element?.props.length; k++) {
                    const prop = element?.props[k]
                    if (prop?.isSelected) {
                      theFuckingTamp.push(prop?.title)
                      thePropIdsTamp.push(prop?.value)
                    }
                  }
                }
              }
            }

            const theData = {
              quantity: temp?.productMeta?.quantity,
              url: e?.nativeEvent?.url,
              title: e?.nativeEvent?.title,
              productName: temp?.productMeta?.productName,
              productId: temp?.productMeta?.productId,
              img: temp?.productSKU?.img,
              price: temp?.productSKU?.price,
              stock: temp?.productSKU?.stock,
              shopId: temp?.productMeta?.provider?.id,
              shopName: temp?.productMeta?.provider?.name,
              properties: theFuckingTamp.join(', '),
              dataValue: thePropIdsTamp.join(', '),
            }

            console.log('----- THE DATA: ', theData)

            if (theData.stock.match(/\d+/g)[0] === '0') {
              Alert.alert('Thông báo', 'Sản phẩm này đã hết hàng.')
              break
            }

            if (temp?.productSKU?.list) {
              const isSelectedAll = temp?.productSKU?.list
                .map(item => {
                  return item?.props.some(item => item.isSelected)
                })
                .every(Boolean)

              if (!isSelectedAll) {
                Alert.alert(
                  'Chưa chọn thuộc tính',
                  'Vui lòng chọn đủ các thuộc tính sản phẩm (mẫu mã, kích cỡ, màu sắc, số lượng,...)',
                )
                break
              }
            }

            // if (theData.quantity < 5) {
            //   Alert.alert('Không thể đặt', 'Vui lòng mua từ 5 sản phẩm')
            //   break
            // }

            // setAddingToCart(true)

            const vietnameseName = await translateText(theData.productName)
            const vietnameseProperties = await translateText(theData.properties)

            const DATA_SUBMIT = {
              TitleOrigin: theData.productName,
              TitleTranslated: vietnameseName,
              PriceOrigin: theData.price,
              PricePromotion: theData.price,
              PropertyTranslated: vietnameseProperties,
              Property: theData.properties,
              DataValue: theData?.dataValue,
              ImageModel: theData.img,
              ImageOrigin: theData.img,
              ShopId: theData?.shopId,
              ShopName: theData?.shopName,
              SellerId: '',
              Wangwang: '',
              Quantity: theData.quantity,
              Stock: theData.stock,
              LocationSale: '',
              Site: 'TAOBAO',
              Comment: '',
              ItemId: theData.productId,
              LinkOrigin: theData.url,
              OuterId: '',
              Error: '',
              Weight: '',
              Step: '',
              StepPrice: '',
              Brand: '',
              CategoryName: '',
              CategoryId: '',
              Tool: 'app-' + (isIOS() ? 'ios' : 'android'),
              Version: '',
              IsTranslate: '',
            }

            addToCart(DATA_SUBMIT)
          }
        }

      case 'GET_PRODUCT_PROPS_1688':
        const skuModel = res?.data?.skuModel
        const Property = res.data?.skuModel?.skuProps[1]?.value[0]?.name

        setData1688({
          ...res.data,
          linkOrigin: res.linkOrigin,
          priceStepData: res.priceStepData,
          Property: Property || '',
          Shop: {
            Id: res?.data?.tempModel?.sellerMemberId,
            Name: res?.data?.tempModel?.companyName,
            Link: res?.data?.tempModel?.winportUrl,
          },
        })

        if (res.priceStep.length > 0) {
          setPriceStep(res.priceStep)
        }

        if (!!res.extendInfo) {
          setExtendInfo(res.extendInfo)
        }

        if (!!skuModel.skuInfoMapOriginal) {
          const imgArray = skuModel.skuProps[0].value || []
          const skuInfoMapOriginal = Object.values(skuModel.skuInfoMapOriginal) || []
          const AllArray = skuInfoMapOriginal.map((item: any) => {
            const {specAttrs} = item
            let arr = specAttrs?.split('&gt;')
            if (arr.length > 1) {
              let result = arr[0]?.trim()
              const priceInfo = imgArray.find(item => item.name === result)
              const imageUrl = priceInfo ? priceInfo.imageUrl : null
              const specAttrs = arr[1].trim()
              return {...item, imageUrl, specAttrs, quantity: 0}
            } else {
              const priceInfo = imgArray.find(item => item.name === specAttrs)
              const imageUrl = priceInfo ? priceInfo.imageUrl : null
              return {...item, imageUrl, quantity: 0}
            }
          })
          const skuProps = res.data?.skuModel?.skuProps[0]?.value
          const check = res.data?.skuModel?.skuProps[0]?.value[0]?.imageUrl
          if (check !== undefined) {
            console.log('check')
            AllArray.forEach(item => {
              const matchingItem = skuProps.find(skuItem => skuItem.imageUrl === item.imageUrl)
              if (matchingItem) {
                item.Property = matchingItem.name
              }
            })
            setArray1688(AllArray)
          } else {
            console.log('no check')
            AllArray.forEach((item, index) => {
              if (skuProps[index]) {
                item.Property = skuProps[index].name
              }
            })
            setArray1688(AllArray)
          }
        } else {
          setArray1688([
            {
              canBookCount: 500,
              discountPrice: '',
              imageUrl: res.data.shareModel.picUrl,
              isPromotionSku: false,
              price: '',
              quantity: 0,
              saleCount: 0,
              skuId: 0,
              specAttrs: '',
              specId: '',
            },
          ])
        }
        break
      default:
        console.log('_onMessage res: chưa handle action hoặc thiếu key action')
        break
    }
  }

  const navigation = useNavigation<any>()

  const translateSearch = async url => {
    let temp = ''
    try {
      const translateValue = await translate(searchText, {to: 'zh-cn'})
      temp = translateValue[0][0][0]
    } catch (error) {}
    setCurUri(url + temp)
  }

  function handleSearch() {
    if (curUri.includes('taobao')) {
      translateSearch(webViewURLs.taobao.searchUrl)
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <WebHeader
        key="web-header-23"
        setSearchText={setSearchText}
        webview={webview}
        handleSearch={handleSearch}
        searchText={searchText}
      />

      <ProcessBar percent={wvProcess} />

      <SuperWebview
        isRefresh={isRefresh}
        ref={webview}
        style={{marginTop: 0}}
        source={{uri: curUri}}
        onError={(error: any) => console.error('WebView error:', error)}
        javaScriptEnabled={true}
        setLoadPage
        onMessage={_onMessage}
        onLoadEnd={() => setLoadPage(true)}
        cacheEnabled={true}
        // cacheMode={'LOAD_NO_CACHE'}
        javaScriptEnabledAndroid={true}
      />

      <WebFooter
        onPressAddToCard={_onPressOrderAddToCart}
        onPressProps={_onPressOrderProps}
        addingToCart={addingToCart}
      />

      <Modal1688
        filter={showModal168}
        setFilter={setShowModal1688}
        data1688={data1688}
        priceStep={priceStep}
        Array1688={Array1688}
        setArray1688={setArray1688}
        extendInfo={extendInfo}
        noteInputState={''}
        setAddingToCart={setAddingToCart}
        onAddToCard={(item: any) => {
          console.log('MODAL: add to cart: ', item)
          console.log('---- data1688: ', data1688)

          const DATA_SUBMIT = {
            TitleOrigin: item.ProductName,
            TitleTranslated: '',
            PriceOrigin: item.PriceCNY,
            PricePromotion: item.PriceCNY,
            PropertyTranslated: '',
            Property: item?.Property,
            DataValue: item?.PropertyValue,
            ImageModel: item.Image,
            ImageOrigin: item.Image,
            ShopId: data1688?.Shop?.Id,
            ShopName: data1688?.Shop?.Name,
            SellerId: '',
            Wangwang: '',
            Quantity: item.Quantity,
            Stock: item.stock,
            LocationSale: '',
            Site: '1688',
            Comment: '',
            ItemId: item.productId,
            LinkOrigin: item?.LinkProduct,
            OuterId: '',
            Error: '',
            Weight: '',
            Step: '',
            StepPrice: item?.pricestep,
            Brand: '',
            CategoryName: '',
            CategoryId: '',
            Tool: 'app-' + (isIOS() ? 'ios' : 'android'),
            Version: '',
            IsTranslate: '',
          }

          console.log('---- DATA_SUBMIT: ', DATA_SUBMIT)

          addToCart(DATA_SUBMIT, true)
        }}
        setatc_Loading={() => {}}
      />

      <Spinner visible={addingToCart} textStyle={{color: '#fff'}} textContent={'Đang thêm vào giỏ hàng...'} />
    </View>
  )
}

export default WebScreen

const styles = StyleSheet.create({})
