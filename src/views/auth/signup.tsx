import {View, Text, StyleSheet, StatusBar, ScrollView, SafeAreaView} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import appConfigs, {sizes} from '~/configs'
import RegisterForm from '~/common/components/Auth/RegisterForm'
import {isIOS} from 'green-native-ts'
import {useGlobalContext} from '~/provider/AppProvider'
import {useIsFocused} from '@react-navigation/native'

const Signup = () => {
  const insets = useSafeAreaInsets()

  const [loading, setLoading] = useState<boolean>(false)

  const {getConfigs, setIsProd} = useGlobalContext()

  const focused = useIsFocused()

  useEffect(() => {
    setIsProd(false)
    getConfigs()
  }, [focused])

  const scrollHeight = sizes.dH - insets.top

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <StatusBar translucent barStyle="light-content" />

      <ScrollView
        endFillColor="#6a53e6"
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={[styles.contentContainer, {minHeight: scrollHeight}]}>
        <View style={{flex: 1}} />

        <Text style={[styles.textTitle, {marginBottom: -10, marginTop: 10}]}>Đăng ký</Text>

        <RegisterForm loading={loading} setLoading={setLoading} />

        {isIOS() && <View style={{height: insets.bottom + 16}} />}
      </ScrollView>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6a53e6',
    width: '100%',
    flex: 1,
  },
  textBold: {
    fontWeight: 'bold',
    fontFamily: appConfigs.fonts.Bold,
  },
  textTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: appConfigs.fonts.Bold,
    textAlign: 'center',
  },
  footer: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  contentContainer: {
    // backgroundColor: 'green',
    padding: 16,
  },
  logo: {
    width: 100,
    height: undefined,
    aspectRatio: 1,
  },
})
