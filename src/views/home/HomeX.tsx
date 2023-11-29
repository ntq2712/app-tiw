import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {isIOS, windowHeight} from 'green-native-ts'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import XOrderItem from './XOrderItem'
import {colors, fonts} from '~/configs'

const FAKE_ORDERS = [
  {
    Id: 16382,
    ShopName: 'DH3598782168',
    StatusName: 'Đang xử lý',
    type: 'Đồ điện tử',
    dateX: '18/11/2023',
    dateY: '10/12/2023',
  },
  {
    Id: 16383,
    ShopName: 'DH3598782269',
    StatusName: 'Đã xử lý',
    type: 'Đồ điện tử',
    dateX: '05/07/2023',
    dateY: '16/07/2023',
  },
]

const FakeHome = () => {
  const insets = useSafeAreaInsets()

  return (
    <View style={{flex: 1}}>
      <View style={[{paddingTop: isIOS() ? insets.top + 2 : insets.top + 12}, styles.headerContainer]}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.headerTitle}>Danh sách đơn</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        key="piget-carts"
        data={FAKE_ORDERS}
        renderItem={({item}) => <XOrderItem key={`cart-item-${item?.Id}`} item={item} />}
        keyExtractor={(item: any) => {
          return item?.Id
        }}
        ListEmptyComponent={
          <View style={{width: '100%', alignItems: 'center', height: windowHeight - 200, justifyContent: 'center'}}>
            <Image source={require('~/assets/images/empty.png')} style={{width: 130, height: 130, opacity: 0.4}} />
          </View>
        }
        ListFooterComponent={<View style={{height: isIOS() ? insets.bottom : 16}} />}
      />
    </View>
  )
}

export default FakeHome

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
