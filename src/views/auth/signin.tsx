import {View, StyleSheet, StatusBar, ScrollView, Alert, SafeAreaView} from 'react-native'
import React, {useEffect, useState} from 'react'
import LoginForm from '~/common/components/Auth/LoginForm'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {colors, fonts} from '~/configs'
import {useGlobalContext} from '~/provider/AppProvider'
import RestApi from '~/api/RestApi'
import {loginApi} from '~/api/Auth/login'
import {LocalStorage} from '~/common'
import {setToken} from '~/api/instance'
import {Colors, isIOS, useKeyboard, windowWidth} from 'green-native-ts'
import OneSignal from 'react-native-onesignal'
import * as Animatable from 'react-native-animatable'

export function parseJwt(token) {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString())
  return JSON.parse(jsonPayload) || {}
}

import {Buffer} from 'buffer'

const Signin = () => {
  const insets = useSafeAreaInsets()

  const {setUser, getConfigs} = useGlobalContext()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setUser({token: '', fullName: '', email: '', phone: ''})
    getConfigs()
  }, [])

  async function getMyInfo(token, id) {
    try {
      const res = await RestApi.get<any>('UserInformation/' + id, {})
      if (res.status == 200) {
        LocalStorage.setToken(token)
        !!setUser && setUser({token: token, ...res?.data?.data})
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  async function oneSignalUser() {
    try {
      const deviceState = await OneSignal.getDeviceState()
      console.log('--- deviceState: ', deviceState)
      await RestApi.put('Auth/one-signal', {PlayerId: deviceState?.userId})
    } catch (error) {}
  }

  async function onLogin(params: any) {
    setLoading(true)

    try {
      const res = await loginApi(params)
      if (res?.token) {
        await setToken(res?.token)
        const tempUser = await parseJwt(res?.token)
        getMyInfo(res?.token, tempUser?.UserInformationId || null)
      } else {
        Alert.alert('Lỗi', res?.message)
      }
    } catch (error) {
      console.log(error?.message)
    } finally {
      setLoading(false)
    }
  }

  const keyShowing = useKeyboard()

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <StatusBar translucent barStyle="dark-content" />

      <ScrollView
        endFillColor={Colors.transparent}
        automaticallyAdjustKeyboardInsets={true}
        style={{marginBottom: -90}}
        contentContainerStyle={[styles.contentContainer, {marginBottom: -56}]}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Animatable.Image
            resizeMode="contain"
            source={require('~/assets/images/logo-gdc-01.png')}
            style={{
              width: 140,
              height: 140,
            }}
            animation="slideInDown"
          />

          {/* <Animatable.Text
            animation="slideInDown"
            style={{
              fontFamily: fonts.Bold,
              fontSize: 20,
              color: '#b00000',
              lineHeight: 36,
              marginTop: -8,
            }}>
            Đăng nhập
          </Animatable.Text> */}

          <Animatable.Text
            animation="slideInDown"
            style={{
              fontFamily: fonts.Regular,
              fontSize: 14,
              color: '#555962',

              lineHeight: 21,
              marginBottom: 16,
              textAlign: 'center',
            }}>
            Đội ngũ GDC sẽ luôn đồng hành và chia sẻ cùng bạn trong suốt quá trình chinh phục IELTS!
          </Animatable.Text>
        </View>

        <LoginForm onLogin={onLogin} loading={loading} />

        {isIOS() && <SafeAreaView />}
      </ScrollView>

      {!keyShowing && (
        <Animatable.Image
          resizeMode="stretch"
          source={require('~/assets/images/login-bottom.png')}
          style={{
            width: windowWidth,
            height: windowWidth,
            zIndex: -1,
            position: 'absolute',
            bottom: 0,
            left: 0,
          }}
          animation="slideInUp"
        />
      )}
    </View>
  )
}

export default Signin

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    flex: 1,
    position: 'relative',
  },
  contentContainer: {
    padding: 16,
  },
})
