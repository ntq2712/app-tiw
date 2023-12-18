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
import {GStatusBar} from '~/common/components'
import GreenAvatar from '~/common/components/Avatar'
import RoleBlock from './components/RoleBlock'
import NotiBlock from './components/NotiBlock'
import LinearGradient from 'react-native-linear-gradient'
import HomeHeader from './components/Header'
import HomeMenu from './components/Menu'
import {ScheduleItem} from '../Schedule'
import ScheduleBlock from './components/ScheduleBlock'
import ClassBlock from './components/ClassBlock'

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
    schedule,
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

  console.log('--- schedule: ', schedule)

  return (
    <>
      <GStatusBar.Light />

      <HomeHeader />

      <ScrollView style={{flex: 1, backgroundColor: null}}>
        <View>
          <HomeMenu />

          <ScheduleBlock />

          <ClassBlock />
        </View>

        {/* <View style={{}}>
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

            <TouchableOpacity activeOpacity={0.7} style={{flex: 1, alignItems: 'center', marginTop: 16}}>
              <Image
                resizeMode="contain"
                source={require('~/assets/37563.png')}
                style={{width: '80%', height: windowWidth / 3.6}}
              />
              <Text style={{color: '#393D48', fontFamily: fonts.Semibold, fontSize: 16, marginTop: 16}}>Lịch học</Text>
            </TouchableOpacity>
          </View>
        </View> */}

        {/* <View style={{height: windowHeight}}></View> */}

        <View style={{height: 24}} />
      </ScrollView>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {},
})
