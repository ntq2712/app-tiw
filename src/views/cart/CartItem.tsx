import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {colors, fonts} from '~/configs'
import {CheckBox, Colors, Icon} from 'green-native-ts'
import CartChildItem from './CartChildItem'
import RestApi from '~/api/RestApi'
import {useGlobalContext} from '~/provider/AppProvider'
import Spinner from 'react-native-loading-spinner-overlay'

const CartItem = ({item}) => {
  const [checked, setChecked] = useState<boolean>(false)

  const {getCarts} = useGlobalContext()

  function getWebName() {
    let temp = ''

    if (item?.OrderTemps.length > 0) {
      if (item?.OrderTemps[0]?.LinkProduct?.includes('taobao.com')) {
        temp = 'TAOBAO'
      }
      if (item?.OrderTemps[0]?.LinkProduct?.includes('1688')) {
        temp = '1688'
      }
    }

    return temp
  }

  const [loading, setLoading] = useState<boolean>(false)

  async function delChildItem(orderTempId) {
    setLoading(true)

    try {
      const res = await RestApi.delete('Cart/order-shop-temp', orderTempId)
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

  async function updateShop(value) {
    setLoading(true)
    try {
      const res = await RestApi.put('Cart/fee', {OrderShopTempId: item?.Id, ...value})
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

  const [visible, setVisible] = useState<boolean>(true)

  return (
    <View style={{backgroundColor: '#fff', marginHorizontal: 16, marginTop: 16, padding: 16, borderRadius: 12}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {/* @ts-ignore */}
        <CheckBox
          iconCheckedColor={colors.primary}
          iconColor={Colors.trans20}
          iconSize={24}
          checked={checked}
          onPress={() => setChecked(!checked)}
        />
        <Icon type="Entypo" name="shop" size={18} color="#000" />
        <Text style={{fontFamily: fonts.Semibold, flex: 1, marginLeft: 8, fontSize: 14, color: colors.primary}}>
          {item?.ShopName || 'Không xác định'}
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
          <Text style={{fontFamily: fonts.Semibold, fontSize: 10, color: '#fff'}}>{getWebName()}</Text>
        </View>

        <TouchableOpacity
          onPress={() => delChildItem(item?.Id)}
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
          <Text style={{fontFamily: fonts.Semibold, fontSize: 10, color: '#fff', marginLeft: 4}}>XOÁ</Text>
        </TouchableOpacity>
      </View>

      <View style={{height: 8}} />

      {item?.OrderTemps.map((orderItem, index) => (
        <>
          {index > 0 && (
            <View style={{height: 1, marginTop: 16, marginBottom: 8, width: '100%', backgroundColor: Colors.trans10}} />
          )}
          <CartChildItem key="piget-child-carts" item={{...orderItem, shop: item}} shopChecked={checked} />
        </>
      ))}

      {visible && (
        <>
          <View style={{height: 1, marginTop: 16, width: '100%', backgroundColor: Colors.trans10}} />
          <View style={{}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  flex: 1,
                  padding: 8,
                  backgroundColor: Colors.trans05,
                  borderRadius: 8,
                  marginTop: 16,
                  marginRight: 8,
                }}>
                {/* @ts-ignore */}
                <CheckBox
                  onPress={() => updateShop({IsPacked: !item?.IsPacked})}
                  checked={item?.IsPacked}
                  text="Đóng gỗ"
                  iconSize={20}
                  textColor="#000"
                  textSize={14}
                />
              </View>
              <View style={{flex: 1, padding: 8, backgroundColor: Colors.trans05, borderRadius: 8, marginTop: 16}}>
                {/* @ts-ignore */}
                <CheckBox
                  onPress={() => updateShop({IsFastDelivery: !item?.IsFastDelivery})}
                  checked={item?.IsFastDelivery}
                  text="Giao tận nhà"
                  iconSize={20}
                  textColor="#000"
                  textSize={14}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 8}}>
              <View style={{flex: 1, padding: 8, backgroundColor: Colors.trans05, borderRadius: 8, marginRight: 8}}>
                {/* @ts-ignore */}
                <CheckBox
                  onPress={() => updateShop({IsCheckProduct: !item?.IsCheckProduct})}
                  checked={item?.IsCheckProduct}
                  text="Kiểm hàng"
                  iconSize={20}
                  textColor="#000"
                  textSize={14}
                />
              </View>

              <View style={{flex: 1, padding: 8, backgroundColor: Colors.trans05, borderRadius: 8, opacity: 0}} />
            </View>
          </View>
        </>
      )}

      {/* <TouchableOpacity
        onPress={() => setVisible(!visible)}
        activeOpacity={0.7}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          marginLeft: 8,
          borderRadius: 6,
          paddingHorizontal: 4,
          marginTop: 16,
        }}>
        <Text style={{fontFamily: fonts.Semibold, fontSize: 12, color: !visible ? '#1E88E5' : 'red'}}>
          {!visible ? 'Xem thêm' : 'Ẩn bớt'}
        </Text>
      </TouchableOpacity> */}

      <Spinner
        visible={loading}
        textContent={'Chờ xíu, tôi đang xử lý...'}
        textStyle={{color: '#fff', fontSize: 14, fontFamily: fonts.Semibold}}
      />
    </View>
  )
}

export default CartItem

const styles = StyleSheet.create({})
