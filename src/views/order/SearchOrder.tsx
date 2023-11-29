import {FlatList, Image, View} from 'react-native'
import React from 'react'
import {useGlobalContext} from '~/provider/AppProvider'
import OrderItem from './OrderItem'
import {isIOS, windowHeight} from 'green-native-ts'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

const SearchOrders = props => {
  const {orders} = useGlobalContext()

  const insets = useSafeAreaInsets()

  return (
    <View style={{flex: 1}}>
      <FlatList
        key="piget-search-order"
        data={orders || []}
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

export default SearchOrders
