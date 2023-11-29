import {Alert, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {FC, useEffect, useState} from 'react'
import {colors, fonts} from '~/configs'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {CheckBox, Colors, Icon, isIOS, parseMoney} from 'green-native-ts'
import {useGlobalContext} from '~/provider/AppProvider'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import RestApi from '~/api/RestApi'
import CartItem from '../CartItem'

const PriceItem: FC<{
  title: string
  value: string | number
  hiddeLine?: boolean
  suffix?: React.ReactElement | string | number
}> = ({title, value, hiddeLine, suffix}) => {
  return (
    <>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text style={{color: '#000', fontSize: 16, fontFamily: fonts.Regular}}>{title}</Text>
        <Text style={{color: '#000', fontSize: 16, fontFamily: fonts.Semibold}}>
          {!!value ? parseMoney(value + '') : 0}
          {!!suffix && suffix}
        </Text>
      </View>
      {!hiddeLine && (
        <View style={{width: '100%', marginTop: 8, marginBottom: 6, backgroundColor: Colors.trans10, height: 1}} />
      )}
    </>
  )
}

const ReviewOrderScreen = () => {
  const insets = useSafeAreaInsets()

  const {user, carts, getCarts, cartChecked, setCartChecked} = useGlobalContext()

  const [loading, setLoading] = useState<boolean>(false)
  const [shipTypes, setShipTypes] = useState([])

  const focused = useIsFocused()

  const [data, setData] = useState([])

  console.log('--- ReviewOrderScreen data: ', data)

  useEffect(() => {
    updateCartChecked()
  }, [carts])

  useEffect(() => {
    if (focused) {
      console.log('---- cartChecked: ', cartChecked)

      getShipTypes()

      formatChecked()
    }
  }, [focused])

  function formatChecked() {
    let temp = []
    let tamp = []

    const shops = []

    cartChecked.forEach(item => {
      const shopId = item.shop.ShopId

      const existingShop = shops.find(shop => shop?.ShopId === shopId)

      if (existingShop) {
        existingShop.items.push(item)
      } else {
        shops.push({...item.shop, items: [item]})
      }
    })

    getReviewOrder(shops)
    setData(shops)
  }

  async function getShipTypes() {
    try {
      const res = await RestApi.get<any>('Cart/shipping-type', {})
      if (res.status == 200) {
        setShipTypes(res.data.data)
        setCurType(res.data.data[0]?.Id)
      }
    } catch (error) {}
  }

  const [review, setReview] = useState<any>({})
  async function getReviewOrder(shops) {
    try {
      const res = await RestApi.get<any>('MainOrder/review-order', {
        orderShopTempIds: shops.map((orderItem: any) => orderItem?.Id).join(','),
        // shippingType: curType,
      })
      if (res.status == 200) {
        setReview(res.data.data)
      }
    } catch (error) {}
  }

  function removeItemFromArray(arr, index) {
    if (index !== -1) {
      arr.splice(index, 1)
    }
    return arr
  }

  function updateCartChecked() {
    setLoading(true)
    let temp = []
    carts.forEach(element => {
      temp = [...temp, ...element?.OrderTemps]
    })
    cartChecked.forEach((element, index) => {
      const factIndex = temp.findIndex(thisItem => thisItem?.Id == element?.Id)
      if (factIndex == -1) {
        const arrayRemovedItem = removeItemFromArray(cartChecked, index)
        setCartChecked([...arrayRemovedItem])
      }
    })
    setLoading(false)
  }

  useEffect(() => {
    if (focused) {
      getCarts()
    }
  }, [focused])

  function getTotalPrice() {
    let temp = 0
    let tamp = 0

    if (review?.OrderShopTemps) {
      review?.OrderShopTemps.forEach(element => {
        console.log('--- element: ', element)

        temp += parseInt(element?.TotalPriceVND)
        tamp += parseInt(element?.TotalPriceVND)
      })
    }

    // review?.OrderShopTemps[index]?.TotalPriceVND
    return {
      TotalPriceVN: temp,
      TotalPriceCNY: tamp,
    }
  }

  const navigation = useNavigation<any>()

  const [curType, setCurType] = useState(null)

  function getWebName(item) {
    let temp = ''

    if (item?.items.length > 0) {
      if (item?.items[0]?.LinkProduct?.includes('taobao.com')) {
        temp = 'TAOBAO'
      }
      if (item?.items[0]?.LinkProduct?.includes('1688')) {
        temp = '1688'
      }
    }

    return temp
  }

  async function postOrder() {
    setLoading(true)
    let temp = []

    data.forEach(element => {
      temp.push(element.Id)
    })

    const submit_data = {
      OrderShopTempIds: temp.join(','),
      WarehouseFromId: user?.WarehouseFrom,
      WarehouseToId: user?.WarehouseTo,
      ShippingType: curType,
      FullName: user?.FirstName + ' ' + user?.LastName,
      Phone: user?.Phone,
      Email: user?.Email,
      Address: user?.Address,
    }

    console.log('--- submit_data: ', submit_data)

    try {
      const res = await RestApi.post('MainOrder/order', submit_data)

      if (res.status == 200) {
        setCartChecked([])
        Alert.alert('Xin chúc mừng!', 'Bạn đã đặt hàng thành công', [
          {
            text: 'Danh sách đơn',
            onPress: async () => {
              getCarts()
              navigation.replace('Orders')
            },
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              await getCarts()
              navigation.goBack()
            },
          },
        ])
      }
    } catch (error) {
      Alert.alert('Ố ồ.. có lỗi rồi', error?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" />

      <View style={[{paddingTop: isIOS() ? insets.top + 4 : insets.top + 12}, styles.headerContainer]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
          }}>
          <Icon type="MaterialIcons" name="arrow-back-ios" color="#fff" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.headerTitle}>Thông tin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
            opacity: 0,
          }}>
          <Icon type="MaterialIcons" name="arrow-back-ios" color="#fff" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('UserInformation')}
            activeOpacity={0.7}
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              marginTop: 8,
              padding: 16,
            }}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Text style={{color: '#000', marginBottom: 4, fontSize: 16, fontFamily: fonts.Semibold}}>
                {`${user?.FirstName} ${user?.LastName}`}
              </Text>
              <View
                style={{
                  borderRadius: 6,
                  paddingHorizontal: 5,
                  paddingTop: 1,
                  paddingBottom: 3,
                  backgroundColor: Colors.trans10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                }}>
                <Text style={{color: '#000', fontSize: 14, fontFamily: fonts.Semibold}}>{`${user?.Phone}`}</Text>
              </View>

              <View
                style={{
                  borderRadius: 6,
                  paddingHorizontal: 5,
                  paddingTop: 1,
                  paddingBottom: 3,
                  backgroundColor: Colors.trans10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                }}>
                <Text style={{color: '#000', fontSize: 14, fontFamily: fonts.Semibold}}>{`${user?.Email}`}</Text>
              </View>
              <Text numberOfLines={2} style={{color: '#000', fontSize: 14, fontFamily: fonts.Regular}}>
                {`${user?.Address}`}
              </Text>
            </View>

            <Icon type="MaterialIcons" name="arrow-forward-ios" color="#000" size={20} />
          </TouchableOpacity>

          <View style={{width: '100%', backgroundColor: '#fff', marginTop: 8, padding: 16}}>
            <Text style={{color: '#000', marginBottom: 8, fontSize: 16, fontFamily: fonts.Semibold}}>
              Hình thức giao hàng
            </Text>
            <View
              style={{
                width: '100%',
                padding: 16,
                backgroundColor: '#f6f8ff',
                borderWidth: 1,
                borderColor: '#d7e3ed',
                borderRadius: 12,
              }}>
              {shipTypes.map(shipType => {
                return (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {/* @ts-ignore */}
                    <CheckBox
                      key={shipType?.Id}
                      iconSize={22}
                      iconCheckedColor={colors.primary}
                      checked={curType == shipType?.Id}
                      onPress={() => setCurType(shipType?.Id)}
                      text={shipType?.Name}
                      textColor="#000"
                    />
                  </View>
                )
              })}
            </View>
          </View>

          <View style={{width: '100%', backgroundColor: '#fff', marginTop: 8, padding: 16}}>
            <Text style={{color: '#000', marginBottom: 8, fontSize: 16, fontFamily: fonts.Semibold}}>Sản phẩm</Text>

            {data.map((cartItem, index) => {
              console.log('--- cartItem: ', cartItem)

              return (
                <>
                  <View
                    style={{
                      backgroundColor: Colors.trans05,
                      marginTop: index > 0 ? 16 : 8,
                      padding: 16,
                      borderRadius: 12,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon type="Entypo" name="shop" size={18} color="#000" />
                      <Text
                        numberOfLines={1}
                        style={{
                          fontFamily: fonts.Semibold,
                          flex: 1,
                          marginLeft: 8,
                          fontSize: 14,
                          color: colors.primary,
                        }}>
                        {cartItem?.ShopName || 'Không xác định'}
                      </Text>

                      <View
                        style={{
                          borderRadius: 6,
                          paddingHorizontal: 4,
                          paddingVertical: 2,
                          backgroundColor: '#ff5406',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text style={{fontFamily: fonts.Semibold, fontSize: 10, color: '#fff'}}>
                          {getWebName(cartItem)}
                        </Text>
                      </View>

                      <TouchableOpacity
                        // onPress={() => delChildItem(item?.Id)}
                        activeOpacity={0.7}
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'red',
                          flexDirection: 'row',
                          marginLeft: 8,
                          borderRadius: 6,
                          paddingHorizontal: 4,
                          paddingVertical: 2,
                        }}>
                        <Icon type="FontAwesome" name="trash-o" size={11} color="#fff" />
                        <Text style={{fontFamily: fonts.Semibold, fontSize: 10, color: '#fff', marginLeft: 4}}>
                          XOÁ
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{height: 8}} />

                    {cartItem?.items.map((orderItem, index) => (
                      <>
                        <View
                          style={{
                            marginTop: 8,
                            padding: 8,
                            borderRadius: 12,
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            borderColor: Colors.trans10,
                          }}>
                          <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                            <View style={{flexDirection: 'row', flex: 1, alignItems: 'flex-start'}}>
                              <View style={{backgroundColor: Colors.trans05, borderRadius: 8}}>
                                <Image
                                  source={{uri: orderItem?.Image}}
                                  resizeMode="contain"
                                  style={{width: 50, height: 50, borderRadius: 8}}
                                />
                              </View>

                              <View style={{flex: 1, marginLeft: 8, alignItems: 'flex-start'}}>
                                <Text style={{fontFamily: fonts.Regular, fontSize: 14, color: '#000'}}>
                                  {orderItem?.ProductName || 'không xác định'}
                                </Text>

                                <View style={{flexDirection: 'row', marginTop: 8, alignItems: 'center'}}>
                                  <View
                                    style={{
                                      backgroundColor: Colors.trans10,
                                      paddingHorizontal: 4,
                                      borderRadius: 6,
                                      padding: 2,
                                    }}>
                                    <Text style={{fontFamily: fonts.Medium, fontSize: 12, color: '#000'}}>
                                      {orderItem?.Property || 'Không xác định'}
                                    </Text>
                                  </View>
                                </View>

                                <View style={{marginTop: 8}}>
                                  <Text style={{fontFamily: fonts.Semibold, fontSize: 14, color: '#000'}}>
                                    Giá TQ: ¥{orderItem?.PriceCNY || ''}
                                  </Text>

                                  <Text style={{fontFamily: fonts.Semibold, fontSize: 14, color: '#000'}}>
                                    Giá VN: {parseMoney(orderItem?.PriceVN) || ''}VNĐ
                                  </Text>

                                  <Text style={{fontFamily: fonts.Semibold, fontSize: 14, color: '#000'}}>
                                    Số lượng: {orderItem?.Quantity || ''}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </>
                    ))}

                    {review?.OrderShopTemps && (
                      <>
                        <View
                          style={{
                            height: 1,
                            marginTop: 16,
                            marginBottom: 8,
                            width: '100%',
                            backgroundColor: Colors.trans10,
                          }}
                        />
                        <PriceItem title="Phí mua hàng" value={review?.OrderShopTemps[index]?.FeeBuyPro} />
                        <PriceItem title="Phí kiểm đếm" value={review?.OrderShopTemps[index]?.FeeCheck} />
                        <PriceItem hiddeLine title="Tổng tiền hàng" value={review?.OrderShopTemps[index]?.PriceVND} />

                        <View style={styles.totalBlock}>
                          <Text style={styles.totalTitle}>Tổng</Text>
                          <Text style={styles.totalTitle}>
                            {!!review?.OrderShopTemps[index]?.TotalPriceVND
                              ? parseMoney(review?.OrderShopTemps[index]?.TotalPriceVND + '')
                              : 0}
                          </Text>
                        </View>
                      </>
                    )}
                  </View>
                </>
              )
            })}
          </View>
        </View>

        <View style={{height: 8}} />
      </ScrollView>

      <View
        style={{
          backgroundColor: '#fff',
          padding: 16,
          borderTopWidth: 1,
          borderColor: Colors.trans10,
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: isIOS() ? 8 + insets.bottom : 16,
        }}>
        <View style={{flex: 1}}>
          {/* <Text style={{fontFamily: fonts.Bold, color: '#000'}}>Tổng TQ: ¥{getTotalPrice().TotalPriceCNY + ''}</Text> */}
          <Text style={{fontFamily: fonts.Bold, fontSize: 17, color: '#000'}}>
            Tổng: {parseMoney(getTotalPrice().TotalPriceVN + '')} VNĐ
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => postOrder()}
          activeOpacity={cartChecked.length > 0 ? 1 : 0.7}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 8,
            height: 36,
            paddingHorizontal: 12,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: cartChecked.length > 0 ? 1 : 0.5,
          }}>
          <Text style={{fontFamily: fonts.Bold, color: '#fff'}}>Hoàn tất</Text>
        </TouchableOpacity>
      </View>

      <Spinner visible={loading} textContent={'Chờ xíu, tôi đang xử lý...'} />
    </>
  )
}

export default ReviewOrderScreen

const styles = StyleSheet.create({
  totalBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.trans05,
    paddingVertical: 4,
    paddingBottom: 6,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 16,
  },
  totalTitle: {color: '#000', fontSize: 18, fontFamily: fonts.Semibold},

  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingBottom: 12,
  },
  headerTitle: {fontFamily: fonts.Bold, fontSize: 20, color: '#fff'},
})
