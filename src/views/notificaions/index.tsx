import {FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {colors, fonts} from '~/configs'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Icon, isIOS, windowHeight} from 'green-native-ts'
import {useGlobalContext} from '~/provider/AppProvider'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import NotiItem from './CartItem'

const NotiScreen = () => {
  const insets = useSafeAreaInsets()

  const {user, notifications, getNotifications, getCarts} = useGlobalContext()

  const [loading, setLoading] = useState<boolean>(false)

  const focused = useIsFocused()

  useEffect(() => {
    if (focused) {
      getNotifications()
      getCarts()
    }
  }, [focused])

  const navigation = useNavigation<any>()

  return (
    <>
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" />
        <View style={[{paddingTop: isIOS() ? insets.top + 4 : insets.top + 12}, styles.headerContainer]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
            style={{alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16}}>
            <Icon type="MaterialIcons" name="arrow-back-ios" color="#fff" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.headerTitle}>Thông báo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, opacity: 0}}>
            <Icon type="MaterialIcons" name="arrow-back-ios" color="#fff" size={20} />
          </TouchableOpacity>
        </View>

        <FlatList
          key="piget-noti"
          data={notifications}
          renderItem={({item}) => <NotiItem key={`cart-item-${item?.Id}`} item={item} />}
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
      </View>

      <Spinner visible={loading} textContent={'Chờ xíu, tôi đang xử lý...'} />
    </>
  )
}

export default NotiScreen

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
