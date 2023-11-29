import {Colors, windowHeight} from 'green-native-ts'
import React from 'react'
import {useEffect, useState} from 'react'
import {
  Alert,
  FlatList,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {colors, fonts} from '~/configs'
import Header1688 from './Modal1688/Header1688'
import {useNavigation} from '@react-navigation/native'
import {useGlobalContext} from '~/provider/AppProvider'

const RenderItem = props => {
  const {item, dataAll, index, data1688, noteInputState, priceStep, setNumberData, setArray1688} = props

  const [data, setData] = useState([])

  useEffect(() => {
    setData(dataAll)
  }, [])

  useEffect(() => {
    converData()
  }, [dataAll])

  const increaseNum = (index, max) => {
    // Cộng lên

    const newData = [...data]
    const curQuantity = newData[index].quantity

    if (newData[index].quantity < newData[index].canBookCount) {
      newData[index].quantity = curQuantity + 1
    }

    setArray1688([...newData])
  }

  const decreaseNum = index => {
    // Giảm xún

    const newData = [...data]
    const curQuantity = newData[index].quantity

    if (curQuantity > 0 && newData[index].quantity < newData[index].canBookCount) {
      newData[index].quantity = curQuantity - 1
    }

    setArray1688([...newData])
  }

  const handleInputQuanity = (val, index) => {
    const newData = [...data]

    if (newData[index].quantity < newData[index].canBookCount) {
      newData[index].quantity = !val ? 0 : parseInt(val)
    }

    setArray1688([...newData])
  }

  function converData() {
    const dataQuantity = data.filter(i => i?.quantity > 0)

    if (dataQuantity.length > 0) {
      let tamp = dataQuantity.map(quanItem => {
        const temp = {
          OrderTempID: '',
          productId: data1688?.tempModel?.offerId || '',
          ProductName: data1688?.tempModel?.offerTitle || '',
          Image: quanItem?.imageUrl || data1688?.tempModel?.defaultOfferImg,
          LinkProduct: data1688?.linkOrigin,
          Property: `${quanItem?.Property || data1688?.Property}-${quanItem?.specAttrs}`,
          Brand: noteInputState?.value || '',
          Quantity: quanItem?.quantity,
          ProviderID: data1688?.tempModel?.sellerUserId || '',
          ProviderName: data1688.tempModel.companyName || '',
          PriceCNY: quanItem?.price || priceStep[0]?.PriceText,
          PropertyValue: quanItem?.skuId || '',
          stock: quanItem?.canBookCount || '',
          pricestep: data1688?.priceStepData || '',
        }
        return temp
      })

      setNumberData([...tamp])
    } else {
      setNumberData([])
    }
  }

  return (
    <View style={{flex: 1, flexDirection: 'row', marginBottom: 12}}>
      {item.imageUrl && (
        <Image
          source={{uri: item.imageUrl}}
          style={{height: 42, width: 42, borderRadius: 5, marginRight: 8}}
          resizeMode="cover"
        />
      )}

      <View style={{flex: 1}}>
        <Text style={styles.proTitle}>{item.specAttrs}</Text>
        <Text style={styles.proCan}>Kho: {item.canBookCount}</Text>
      </View>

      {parseInt(item.canBookCount) > 0 ? (
        <View style={styles.quanContainer}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => decreaseNum(index)} style={styles.btnDec}>
            <Ionicons name="remove" color="#000" size={14} />
          </TouchableOpacity>

          <TextInput
            style={styles.inputQuan}
            keyboardType="numeric"
            value={item?.quantity.toString()}
            onChangeText={val => handleInputQuanity(val, index)}
          />

          <TouchableOpacity
            onPress={() => increaseNum(index, item.canBookCount)}
            activeOpacity={0.7}
            style={styles.btnQuanPlus}>
            <Ionicons name="add" color="#000" size={16} />
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.textEmpty}>Hết hàng</Text>
      )}
    </View>
  )
}

const Modal1688 = props => {
  const {filter, setFilter, data1688, priceStep, Array1688, setArray1688} = props
  const {extendInfo, noteInputState, onAddToCard, setAddingToCart} = props

  const [NumberData, setNumberData] = useState([])

  // console.log('--- THE data1688: ', data1688)

  const getVND = (price, suffix = ' VNĐ') => {
    if (price === null) return 0

    if (Number.isInteger(price)) {
      return (price?.toString() || '0').replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix
    }
    return price + suffix
  }

  const Quantity = NumberData.map(item => item.Quantity)
  const totalQuantity = Quantity.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

  let price = 0
  for (const item of priceStep) {
    const unitText = item.unitText
    const regex = /(\d+)/g
    const quantity = parseInt(unitText.match(regex)[0])

    if (totalQuantity >= quantity) {
      price = totalQuantity * parseFloat(item.PriceText)
    } else {
      break
    }
  }

  const arr = data1688?.skuModel?.skuPriceScale || ''
  const cleaned_string = arr.replace('￥', '')
  const index_string = totalQuantity * parseFloat(cleaned_string.split('-')[0] || 0)

  function handleClose() {
    setFilter(false)
    setNumberData([])
  }

  const navigation = useNavigation()
  const {getCarts} = useGlobalContext()

  async function handleAddToCart() {
    if (NumberData.length > 0) {
      setFilter(false)
      try {
        if (totalQuantity <= 0) {
          Alert.alert('Thông Báo', 'Sản phẩm phẩm đã hết hàng')
        } else {
          setAddingToCart(true)
          for (const numDataItem of NumberData) {
            await onAddToCard({...numDataItem}, true)
          }
          await getCarts()
          setAddingToCart(false)
          Alert.alert('Thành công', 'Đã thêm vào giỏ hàng', [
            {
              text: 'Xem giỏ hàng',
              onPress: () => navigation.navigate('Cart'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ])
        }
      } catch (error) {}
    } else {
      Alert.alert('Thông Báo', 'Vui lòng chọn sản phẩm')
    }

    setNumberData([])
  }

  return (
    <Modal visible={filter} animationType="slide" transparent={true} statusBarTranslucent={false}>
      <StatusBar backgroundColor={Colors.trans50} />

      <TouchableOpacity onPress={handleClose} style={{backgroundColor: Colors.trans50, flex: 1}} />

      <View style={styles.modalContainer}>
        <Header1688
          priceStep={priceStep}
          data1688={data1688}
          setFilter={setFilter}
          setNumberData={setNumberData}
          extendInfo={extendInfo}
        />

        <View style={{maxHeight: windowHeight / 2}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <Text style={styles.sku}>
                {!!data1688?.skuModel?.skuProps ? data1688?.skuModel?.skuProps[0]?.prop : ''}
              </Text>
            }
            numColumns={1}
            initialNumToRender={30}
            data={Array1688 && Array1688.length > 50 ? Array1688.slice(0, 50) : Array1688 || []}
            renderItem={({item, index}) => (
              <RenderItem
                item={item}
                dataAll={Array1688}
                setArray1688={setArray1688}
                index={index}
                data1688={data1688}
                noteInputState={noteInputState}
                priceStep={priceStep}
                setNumberData={setNumberData}
                NumberData={NumberData}
              />
            )}
            keyExtractor={item => {
              return item?.specId
            }}
            ListFooterComponent={<View style={{height: 30}} />}
            style={{padding: 16, borderTopWidth: 1, borderColor: Colors.trans10}}
          />
        </View>

        <View style={{height: 4}} />

        <View style={styles.footer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Text style={styles.titleQuan}>
                Số lượng: <Text style={styles.textQuan}>{getVND(totalQuantity.toFixed(2), '')}</Text>
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={styles.textTotalPrice}>
                Tổng: <Text style={styles.textY}>￥</Text>
                <Text style={styles.textPrice}>
                  {priceStep.length > 0 ? getVND(price.toFixed(2) || 0, '') : getVND(index_string.toFixed(2) || 0, '')}
                </Text>
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={handleAddToCart} style={styles.btnOrder}>
            <Text style={styles.textOrder}>Đặt hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default Modal1688

const styles = StyleSheet.create({
  proTitle: {fontSize: 16, color: '#000', fontFamily: fonts.Semibold},
  proCan: {fontSize: 12, fontFamily: fonts.Regular, color: 'rgba(0, 0, 0, 0.5)'},
  quanContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
    height: 28,
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    width: '100%',
    backgroundColor: '#F4F4F4',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  btnOrder: {
    backgroundColor: colors.primary,
    height: 40,
    borderRadius: 99,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  textEmpty: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: 'red',
    textAlign: 'center',
    width: 100,
  },
  btnQuanPlus: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 26,
    borderLeftWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  inputQuan: {
    fontSize: 14,
    fontFamily: fonts.Medium,
    color: '#000',
    width: 40,
    textAlign: 'center',
    padding: 0,
  },
  btnDec: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 26,
    borderRightWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  sku: {fontSize: 16, color: '#000', marginBottom: 16, fontFamily: fonts.Medium},
  footer: {backgroundColor: '#fff', padding: 12, paddingBottom: 24},
  titleQuan: {color: '#000', fontSize: 14, fontFamily: fonts.Semibold},
  textQuan: {color: 'red', fontSize: 16, fontFamily: fonts.Semibold},
  textTotalPrice: {color: '#000', fontSize: 14, fontFamily: fonts.Semibold},
  textOrder: {fontSize: 16, color: '#ffff', fontFamily: fonts.Semibold},
  textPrice: {color: 'red', fontFamily: fonts.Semibold, fontSize: 18},
  textY: {color: 'red', fontSize: 12, fontFamily: fonts.Semibold},
})
