import {FlatList, Image, RefreshControl, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {colors, fonts} from '~/configs'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import {Icon, isIOS, windowHeight} from 'green-native-ts'
import RestApi from '~/api/RestApi'
import TransCartItem from './CartItem'
import {useGlobalContext} from '~/provider/AppProvider'

const TransportationOrders = () => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<any>()

  const {getOrders, isProd, getNotifications} = useGlobalContext()

  const [data, setData] = useState([])

  const focused = useIsFocused()

  useEffect(() => {
    if (focused) {
      getTrans()
      getOrders()
      getNotifications()
    }
  }, [focused])

  async function getTrans() {
    try {
      const res = await RestApi.get<any>('TransportationOrder', {})
      if (res.status == 200) {
        setData(res.data?.data)
      } else {
        setData([])
      }
    } catch (error) {
      setData([])
    }
  }

  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await getTrans()
    setRefreshing(false)
  }, [])

  return (
    <>
      {focused && <StatusBar barStyle="light-content" />}

      <View style={[{paddingTop: isIOS() ? insets.top + 4 : insets.top + 12}, styles.headerContainer]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={{alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16}}>
          <Icon type="MaterialIcons" name="arrow-back-ios" color="#fff" size={20} />
        </TouchableOpacity>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.headerTitle}>Đơn ký gửi</Text>
        </View>

        <TouchableOpacity
          activeOpacity={isProd ? 0.7 : 0}
          onPress={() => isProd && navigation.navigate('CreateTrans')}
          style={{
            opacity: isProd ? 1 : 0,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
          }}>
          <Icon type="Entypo" name="plus" color="#fff" size={26} />
        </TouchableOpacity>
      </View>

      <FlatList
        key="piget-trans"
        data={data}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({item, index}) => <TransCartItem key={`trans-item-${item?.Id}`} item={item} index={index} />}
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
            <Image
              source={require('~/assets/images/empty.png')}
              style={{
                width: 130,
                height: 130,
                opacity: 0.4,
              }}
            />
          </View>
        }
        ListFooterComponent={<View style={{height: isIOS() ? insets.bottom : 16}} />}
      />
    </>
  )
}

export default TransportationOrders

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
