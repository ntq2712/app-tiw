import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import React, {FC} from 'react'
import Input from '../Controller/Input'
import {useForm, Controller} from 'react-hook-form'
import Button from '../Button'
import appConfigs, {sizes} from '~/configs'
import ButtonRegister from '../Button/ButtonRegister'
import {useNavigation} from '@react-navigation/native'

type ILoginForm = {
  onLogin: Function
  loading: boolean
}

const LoginForm: FC<ILoginForm> = ({onLogin, loading}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      userName: '', // thupham - hoangyen - giabao
      password: '', // 123456
    },
  })

  const navigation = useNavigation<any>()

  const onSubmit = (data: {userName: string; password: string}) => {
    onLogin(data)
  }

  return (
    <View style={styles.container}>
      <Input control={control} name="userName" label="Tên đăng nhập" errors={errors.userName} />

      <Input
        control={control}
        name="password"
        label="Mật khẩu"
        isPassword
        errors={errors.password}
        wrapStyle={{marginTop: 16}}
      />

      {/* <View style={{width: '100%', flexDirection: 'row', marginTop: 0, justifyContent: 'flex-end'}}>
        <TouchableOpacity activeOpacity={0.6} style={{paddingVertical: 8}}>
          <Text style={{color: '#000'}}>Quên mật khẩu</Text>
        </TouchableOpacity>
      </View> */}

      <Button loading={loading} text="Đăng nhập" onPress={handleSubmit(onSubmit)} style={{marginTop: 24}} />
    </View>
  )
}

export default LoginForm

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
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
