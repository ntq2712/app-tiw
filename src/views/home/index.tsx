import {
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {useEffect} from 'react'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {colors, fonts} from '~/configs'
import {Colors, GreenStyles, Icon, parseMoney, windowHeight, windowWidth} from 'green-native-ts'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import {useGlobalContext} from '~/provider/AppProvider'
import FakeHome from './HomeX'

const HomeScreen = () => {
  const insets = useSafeAreaInsets()
  const {
    user,
    isProd,
    notifications,
    getConfigs,
    getOrders,
    getNotifications,
    getOrderStatus,
    getOtherOrders,
    getCarts,
  } = useGlobalContext()

  const navigation = useNavigation<any>()
  const focused = useIsFocused()

  useEffect(() => {
    if (focused) {
      getOrderStatus()
      getOtherOrders()
      getCarts()
      getOrders()
      getNotifications()
      getConfigs()
    }
  }, [focused])

  return (
    <>
      {focused && <StatusBar translucent barStyle="light-content" />}

      <View
        style={{
          backgroundColor: '#F87171',
          width: '100%',
          padding: 16,
          paddingTop: 16 + insets.top,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{color: '#fff', fontFamily: fonts.Semibold, fontSize: 18, flex: 1}}>TRANG CHỦ</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('NotiScreen')}
            activeOpacity={0.7}
            style={{position: 'relative'}}>
            <Image style={{width: 24, height: 24}} source={require('~/assets/icons/bell.png')} resizeMode="contain" />
            {notifications?.length > 0 && (
              <View
                style={{
                  borderRadius: 999,
                  width: 16,
                  height: 16,
                  backgroundColor: '#FCD34D',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: -3,
                  right: -4,
                }}>
                <Text style={{fontFamily: fonts.Bold, fontSize: 8, color: '#393D48'}}>
                  {notifications?.length > 98 ? 99 : notifications?.length || 0}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{flex: 1, backgroundColor: isProd ? '#fff' : null}}>
        <View style={{position: 'relative'}}>
          <View
            style={{
              height: 110,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: -110,
              zIndex: 12,
              paddingHorizontal: 16,
            }}>
            <Image
              source={{uri: user?.Avatar}}
              resizeMode="cover"
              style={[{width: 80, height: 80, borderRadius: 99}]}
            />
            <View style={{marginLeft: 16}}>
              <Text style={{color: '#fff', fontFamily: fonts.Regular, fontSize: 14}}>{user?.RoleName}</Text>
              <Text style={{color: '#fff', fontFamily: fonts.Semibold, fontSize: 16}}>{user?.FullName}</Text>
              <Text style={{color: '#fff', fontFamily: fonts.Regular, fontSize: 14}}>Mã: {user?.UserCode}</Text>
            </View>
          </View>
          <Image resizeMode="stretch" source={require('~/assets/608.png')} style={{width: windowWidth, height: 120}} />
        </View>

        <View style={{}}>
          <Text
            style={{
              color: '#393D48',
              fontFamily: fonts.Semibold,
              fontSize: 16,
              marginLeft: 16,
              marginTop: 16,
            }}>
            Tra cứu
          </Text>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity activeOpacity={0.7} style={{flex: 1, marginTop: 16, alignItems: 'center'}}>
              <Image
                resizeMode="contain"
                source={require('~/assets/37560.png')}
                style={{width: '80%', height: windowWidth / 3.6}}
              />
              <Text style={{color: '#393D48', fontFamily: fonts.Semibold, fontSize: 16, marginTop: 16}}>
                Danh sách lớp
              </Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} style={{flex: 1, alignItems: 'center', marginTop: 16}}>
              <Image
                resizeMode="contain"
                source={require('~/assets/37562.png')}
                style={{width: '80%', height: windowWidth / 3.6}}
              />
              <Text style={{color: '#393D48', fontFamily: fonts.Semibold, fontSize: 16, marginTop: 16}}>Công nợ</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity activeOpacity={0.7} style={{flex: 1, alignItems: 'center', marginTop: 16}}>
              <Image
                resizeMode="contain"
                source={require('~/assets/37563.png')}
                style={{width: '80%', height: windowWidth / 3.6}}
              />
              <Text style={{color: '#393D48', fontFamily: fonts.Semibold, fontSize: 16, marginTop: 16}}>Lịch học</Text>
            </TouchableOpacity> */}
          </View>
        </View>

        <View style={{height: windowHeight}}></View>

        <View style={{height: 24}} />
      </ScrollView>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {},
})
