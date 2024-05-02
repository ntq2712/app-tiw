import {Colors} from 'green-native-ts'
import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {Alert, ScrollView, StatusBar, StyleSheet, View} from 'react-native'
import * as Animatable from 'react-native-animatable'
import {authApi} from '~/api/Auth/login'
import {fonts} from '~/configs'
import useCountDown from '~/hooks/useCountDown'
import Button from '../Button'
import Input from '../Controller/Input'
import HeaderWhite from '../Header/HeaderWhite'

const ForgotPassword = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [count, setCount] = useCountDown(0)

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      username: '',
    },
  })
  const onSubmit = async data => {
    setLoading(true)
    try {
      const res = await authApi.forgotPassword({
        UserName: data.username,
      })
      Alert.alert('Thông báo', 'Yêu cầu đổi mật khẩu đã được gửi về email, vui lòng kiểm tra !')
      reset()
      setCount(10)
    } catch (error) {
      Alert.alert('Có lỗi xảy ra !', error?.data?.message || 'Lỗi đã xảy ra rồi !')
    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <HeaderWhite>Quên mật khẩu</HeaderWhite>
      <StatusBar translucent barStyle="dark-content" />
      <ScrollView
        endFillColor={Colors.transparent}
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={{width: '100%', backgroundColor: '#fff', alignItems: 'center', marginTop: 20}}>
          <Animatable.Image
            resizeMode="contain"
            source={require('~/assets/images/logo-gdc-01.png')}
            style={{
              width: 140,
              height: 140,
            }}
            animation="slideInDown"
          />
          <Animatable.Text
            animation="slideInDown"
            style={{
              fontFamily: fonts.Regular,
              fontSize: 14,
              color: '#555962',
              lineHeight: 21,
              marginBottom: 26,
              textAlign: 'center',
            }}>
            Đội ngũ GDC sẽ luôn đồng hành và chia sẻ cùng bạn trong suốt quá trình chinh phục IELTS!
          </Animatable.Text>
          <Input
            control={control}
            name="username"
            autoCapitalize="none"
            label="Tài khoản"
            placeholder="Vui lòng nhập vào tài khoản"
            errors={errors.username}
            isLogin={true}
            inputStyle={{height: 44}}
          />
          <Button
            loading={loading}
            disabled={count !== 0}
            text={`Gửi về email ${count ? `(${count})` : ''}`}
            onPress={handleSubmit(onSubmit)}
            style={{marginTop: 24, height: 44}}
          />
        </View>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
})

export default ForgotPassword
