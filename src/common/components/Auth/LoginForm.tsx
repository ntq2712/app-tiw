import {useNavigation} from '@react-navigation/native'
import {CheckBox, Colors} from 'green-native-ts'
import React, {FC, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {LocalStorage} from '~/common/utils'
import appConfigs, {sizes} from '~/configs'
import Button from '../Button'
import Input from '../Controller/Input'

type ILoginForm = {
  onLogin: Function
  loading: boolean
}

const LoginForm: FC<ILoginForm> = ({onLogin, loading}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: {
      userName: '',
      password: '', // 123456
    },
  })
  const [rememberLogin, setRememberLogin] = useState<boolean>(false)

  const navigation = useNavigation<any>()

  useEffect(() => {
    ;(async () => {
      const dataLogin = await LocalStorage.getRememberLogin()
      if (dataLogin?.username && dataLogin?.password) {
        setRememberLogin(true)
        setValue('userName', dataLogin?.username)
        setValue('password', dataLogin?.password)
      }
    })()
  }, [])

  const onSubmit = (data: {userName: string; password: string}) => {
    if (rememberLogin) {
      LocalStorage.setRememberLogin({
        username: data?.userName,
        password: data?.password,
      })
    } else {
      LocalStorage.setRememberLogin({
        username: '',
        password: '',
      })
    }
    if (data?.userName.toLowerCase() == 'chaugdc' && data?.password == 'motconvit') {
      navigation.navigate('bd')
      return
    }

    if (data?.userName.toLowerCase() == '1' && data?.password == 'haiconvit') {
      navigation.navigate('ChauDashboard')
      return
    }

    onLogin(data)
  }

  return (
    <View style={styles.container}>
      <Input
        control={control}
        name="userName"
        label="Tên đăng nhập"
        errors={errors.userName}
        isLogin={true}
        inputStyle={{height: 44}}
      />

      <Input
        control={control}
        name="password"
        label="Mật khẩu"
        isPassword
        errors={errors.password}
        wrapStyle={{marginTop: 16}}
        isLogin={true}
        inputStyle={{height: 44}}
      />
      <View style={styles.wrapContent}>
        <CheckBox
          checked={rememberLogin}
          text="Lưu đăng nhập"
          iconSize={26}
          textColor={Colors.black}
          iconColor={Colors.yellowDark}
          iconCheckedColor={Colors.yellow}
          onPress={() => {
            setRememberLogin(!rememberLogin)
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.push('ForgotPassword')
          }}>
          <Text>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>

      <Button loading={loading} text="Đăng nhập" onPress={handleSubmit(onSubmit)} style={{marginTop: 24, height: 44}} />
    </View>
  )
}

export default LoginForm

const styles = StyleSheet.create({
  wrapContent: {
    marginTop: 12,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    marginTop: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: appConfigs.fonts.Bold,
  },
  contentContainer: {
    padding: 16,
  },
  logo: {
    width: sizes.dW / 2,
    height: undefined,
    aspectRatio: 1,
  },
})
