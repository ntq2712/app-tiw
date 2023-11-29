import {Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {colors, fonts} from '~/configs'
import {CheckBox, Colors, Icon, parseMoney} from 'green-native-ts'
import RestApi from '~/api/RestApi'
import {useGlobalContext} from '~/provider/AppProvider'
import Spinner from 'react-native-loading-spinner-overlay'

const CartChildItem = ({item, shopChecked}) => {
  const [checked, setChecked] = useState<boolean>(false)
  const {getCarts, cartChecked, setCartChecked} = useGlobalContext()

  useEffect(() => {
    setChecked(shopChecked)
  }, [shopChecked])

  useEffect(() => {
    updateChecked()
  }, [item?.Quantity])

  useEffect(() => {
    handleCartChecked()
  }, [checked])

  function updateChecked() {
    const factIndex = cartChecked.findIndex(thisItem => thisItem?.Id == item?.Id)
    if (factIndex > -1) {
      cartChecked[factIndex] = {...item}
      setCartChecked([...cartChecked])
    }
  }

  function removeItemFromArray(arr, index) {
    if (index !== -1) {
      arr.splice(index, 1)
    }
    return arr
  }

  function handleCartChecked() {
    if (checked) {
      const factIndex = cartChecked.findIndex(thisItem => thisItem?.Id == item?.Id)
      if (factIndex == -1) {
        cartChecked.push(item)
        setCartChecked([...cartChecked])
      }
    }

    if (!checked) {
      const factIndex = cartChecked.findIndex(thisItem => thisItem?.Id == item?.Id)
      if (factIndex > -1) {
        const arrayRemovedItem = removeItemFromArray(cartChecked, factIndex)
        setCartChecked([...arrayRemovedItem])
      }
    }
  }

  const [curQuan, setCurQuan] = useState<number>(item?.Quantity || 0)

  async function updateQuantity(orderTempId, quantity) {
    try {
      const res = await RestApi.put('Cart/order-temp', {
        OrderTempId: orderTempId,
        Quantity: quantity,
        Note: '',
      })
      if (res.status == 200) {
        getCarts()
      } else {
        Alert.alert('Ồ.. có lỗi rồi', res.data?.message)
      }
    } catch (error) {
      Alert.alert('Ồ.. có lỗi rồi', error?.message)
    }
  }

  const [loading, setLoading] = useState<boolean>(false)

  async function delChildItem(orderTempId) {
    setLoading(true)

    if (checked) {
      const factIndex = cartChecked.findIndex(thisItem => thisItem?.Id == item?.Id)
      if (factIndex > -1) {
        const arrayRemovedItem = removeItemFromArray(cartChecked, factIndex)
        setCartChecked([...arrayRemovedItem])
      }
    }

    try {
      const res = await RestApi.delete('Cart/order-temp', orderTempId)
      if (res.status == 200) {
        await getCarts()
        setLoading(false)
      } else {
        Alert.alert('Ồ.. có lỗi rồi', res.data?.message)
        setLoading(false)
      }
    } catch (error) {
      Alert.alert('Ồ.. có lỗi rồi', error?.message)
      setLoading(false)
    }
  }

  return (
    <>
      <View style={{marginTop: 8}}>
        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          {/* <CheckBox
            iconCheckedColor={colors.primary}
            iconColor={Colors.trans20}
            iconSize={24}
            checked={checked}
            onPress={() => setChecked(!checked)}
          /> */}

          <View style={{flexDirection: 'row', flex: 1, alignItems: 'flex-start'}}>
            <View style={{backgroundColor: Colors.trans05, borderRadius: 8}}>
              <Image
                source={{uri: item?.Image}}
                resizeMode="contain"
                style={{width: 50, height: 50, borderRadius: 8}}
              />
            </View>

            <View style={{flex: 1, marginLeft: 8, alignItems: 'flex-start'}}>
              <Text
                style={{
                  fontFamily: fonts.Regular,
                  fontSize: 14,
                  color: '#000',
                  flex: 1,
                }}>
                {item?.ProductName || 'không xác định'}
              </Text>

              <View
                style={{
                  backgroundColor: Colors.trans10,
                  paddingHorizontal: 4,
                  borderRadius: 6,
                  marginTop: 8,
                  padding: 2,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.Medium,
                    fontSize: 12,
                    color: '#000',
                  }}>
                  {item?.Property || 'Không xác định'}
                </Text>
              </View>

              <View style={{marginTop: 8}}>
                <Text
                  style={{
                    fontFamily: fonts.Semibold,
                    fontSize: 14,
                    color: '#000',
                  }}>
                  Giá TQ: ¥{item?.PriceCNY || ''}
                </Text>

                <Text
                  style={{
                    fontFamily: fonts.Semibold,
                    fontSize: 14,
                    color: '#000',
                  }}>
                  Giá VN: {parseMoney(item?.PriceVN) || ''}VNĐ
                </Text>
              </View>

              <View style={{flexDirection: 'row', marginTop: 8, alignItems: 'center'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderRadius: 6,
                    borderColor: Colors.trans20,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (curQuan > 1) {
                        setCurQuan(curQuan - 1)
                        updateQuantity(item?.Id, curQuan - 1)
                      }
                    }}
                    activeOpacity={0.7}
                    style={{
                      width: 22,
                      alignItems: 'center',
                    }}>
                    <Icon type="Entypo" name="minus" size={18} color="#000" />
                  </TouchableOpacity>

                  <TextInput
                    keyboardType="numeric"
                    value={curQuan + '' || item?.Quantity + ''}
                    style={{
                      height: 24,
                      width: 30,
                      fontFamily: fonts.Medium,
                      padding: 0,
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      fontSize: 12,
                      borderColor: Colors.trans20,
                      color: '#000',
                    }}
                    onChangeText={e => setCurQuan(parseInt(e))}
                    onBlur={() => updateQuantity(item?.Id, curQuan)}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      setCurQuan(curQuan + 1)
                      updateQuantity(item?.Id, item?.Quantity + 1)
                    }}
                    activeOpacity={0.7}
                    style={{width: 22, alignItems: 'center'}}>
                    <Icon type="Entypo" name="plus" size={18} color="#000" />
                  </TouchableOpacity>
                </View>

                <View style={{flex: 1}} />

                <TouchableOpacity
                  onPress={() => delChildItem(item?.Id)}
                  activeOpacity={0.7}
                  style={{
                    width: 22,
                    alignItems: 'center',
                  }}>
                  <Icon type="FontAwesome" name="trash-o" size={20} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      <Spinner visible={loading} textContent={'Chờ xíu, tôi đang xử lý...'} />
    </>
  )
}

export default CartChildItem

const styles = StyleSheet.create({})
