import {FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {colors, fonts} from '~/configs'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Colors, isIOS, parseMoney, windowHeight} from 'green-native-ts'
import {useGlobalContext} from '~/provider/AppProvider'
import CartItem from './CartItem'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'

const CartTab = () => {
  const insets = useSafeAreaInsets()

  const {isProd, carts, getCarts, cartChecked, setCartChecked} = useGlobalContext()

  const [loading, setLoading] = useState<boolean>(false)

  const focused = useIsFocused()

  useEffect(() => {
    updateCartChecked()
  }, [carts])

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
    cartChecked.forEach(element => {
      temp += element?.TotalPriceVN
      tamp += element?.TotalPriceCNY
    })
    return {
      TotalPriceVN: temp,
      TotalPriceCNY: tamp,
    }
  }

  const navigation = useNavigation<any>()

  return (
    <>
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" />

        <View style={[{paddingTop: isIOS() ? insets.top + 4 : insets.top + 12}, styles.headerContainer]}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.headerTitle}>{isProd ? 'Giỏ hàng' : 'Đơn hàng'}</Text>
          </View>
        </View>

        <FlatList
          key="piget-carts"
          data={carts}
          renderItem={({item}) => <CartItem key={`cart-item-${item?.Id}`} item={item} />}
          keyExtractor={(item: any) => {
            return item.Id
          }}
          ListEmptyComponent={
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                height: windowHeight - 200,
                justifyContent: 'center',
              }}>
              <Image source={require('~/assets/images/empty.png')} style={{width: 130, height: 130, opacity: 0.4}} />
            </View>
          }
          ListFooterComponent={<View style={{height: 16}} />}
        />

        {carts.length > 0 && (
          <View
            style={{
              backgroundColor: '#fff',
              padding: 8,
              borderTopWidth: 1,
              borderColor: Colors.trans10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text style={{fontFamily: fonts.Bold, color: '#000'}}>
                Tổng TQ: ¥ {getTotalPrice().TotalPriceCNY + ''}
              </Text>
              <Text style={{fontFamily: fonts.Bold, color: '#000'}}>
                Tổng VN: {parseMoney(getTotalPrice().TotalPriceVN + '')} VNĐ
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('ReviewOrderScreen')}
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
              <Text style={{fontFamily: fonts.Bold, color: '#fff'}}>Đặt hàng ({cartChecked.length})</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Spinner visible={loading} textContent={'Chờ xíu, tôi đang xử lý...'} />
    </>
  )
}

export default CartTab

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingBottom: 12,
  },
  headerTitle: {fontFamily: fonts.Bold, fontSize: 20, color: '#fff'},
})
