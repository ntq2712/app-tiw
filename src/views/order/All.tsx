import {FlatList, Image, StyleSheet, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useGlobalContext} from '~/provider/AppProvider'
import OrderItem from './OrderItem'
import {RefreshControl} from 'react-native'
import {isIOS, windowHeight} from 'green-native-ts'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

const AllOrders = props => {
  const {status, isOther} = props

  const {orders, otherOrders, getOtherOrders, getOrders, getCarts} = useGlobalContext()

  const [refreshing, setRefreshing] = React.useState(false)
  const [data, setData] = useState([])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)

    if (!isOther) {
      getOrders()
    } else {
      getOtherOrders()
    }

    getCarts()

    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  useEffect(() => {
    let temp = []

    if (!isOther) {
      orders.forEach((item, index) => {
        if (item?.Status == status || status == -1) {
          temp.push(item)
        }
      })
    }

    if (isOther) {
      otherOrders.forEach((item, index) => {
        if (item?.Status == status || status == -1) {
          temp.push(item)
        }
      })
    }

    setData(temp)
  }, [])

  const insets = useSafeAreaInsets()

  return (
    <View style={{flex: 1}}>
      <FlatList
        key="piget-carts"
        data={data}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({item}) => <OrderItem key={`cart-item-${item?.Id}`} item={item} />}
        keyExtractor={(item: any) => {
          return item?.Id
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
        ListFooterComponent={<View style={{height: isIOS() ? insets.bottom : 16}} />}
      />
    </View>
  )
}

export default AllOrders
