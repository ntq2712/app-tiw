import {Alert, ScrollView, StyleSheet, View} from 'react-native'
import React, {useState} from 'react'
import {Colors} from 'green-native-ts'
import {sizes} from '~/configs'
import {useNavigation} from '@react-navigation/native'
import RestApi from '~/api/RestApi'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {GInput, GStatusBar, HeaderWhite, TextError} from '~/common/components'
import Button from '~/common/components/Button'

const UserPassword = () => {
  const insets = useSafeAreaInsets()

  const [loading, setLoading] = useState<boolean>(false)

  const [curPass, setCurPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confPass, setConfPass] = useState('')

  const navigation = useNavigation<any>()

  const [textError, setTextError] = useState<string>('')

  async function updateInformation(params) {
    setLoading(true)
    try {
      const res = await RestApi.post('ChangePassword', params)
      if (res.status == 200) {
        Alert.alert('Thành công', 'Mật khẩu đã được thay đổi', [{text: 'OK', onPress: () => navigation.goBack()}])
      }
    } catch (error) {
      setTextError(error?.data?.message || 'Lỗi không xác định')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = () => {
    setTextError('')

    if (!curPass || !newPass || !confPass) {
      setTextError('Vui lòng điền đầy đủ thông tin')
      return
    }

    if (newPass.length < 6) {
      setTextError('Mật khẩu phải trên 6 ký tự')
      return
    }

    if (newPass != confPass) {
      setTextError('Mật khẩu nhập lại không khớp')
      return
    }

    if (curPass == newPass) {
      setTextError('Mật khẩu không có sự thay đổi')
      return
    }

    updateInformation({
      OldPassword: curPass,
      NewPassword: newPass,
      ConfirmNewPassword: confPass,
    })
  }

  return (
    <>
      <GStatusBar.Dark />

      <HeaderWhite>Đổi mật khẩu</HeaderWhite>

      <ScrollView endFillColor={Colors.transparent} automaticallyAdjustKeyboardInsets={true}>
        <View style={{flex: 1}}>
          <View style={styles.formWrapper}>
            <GInput
              value={curPass}
              onChange={e => setCurPass(e)}
              inputStyle={{height: 40}}
              label="Mật khẩu cũ"
              isPassword
              wrapStyle={{marginTop: 16}}
              disabled={loading}
            />

            <GInput
              value={newPass}
              onChange={e => setNewPass(e)}
              inputStyle={{height: 40}}
              label="Mật khẩu mới"
              isPassword
              disabled={loading}
              wrapStyle={{marginTop: 16}}
            />

            <GInput
              value={confPass}
              onChange={e => setConfPass(e)}
              inputStyle={{height: 40}}
              label="Nhập lại mật khẩu"
              disabled={loading}
              isPassword
              wrapStyle={{marginTop: 16}}
            />

            <TextError>{textError}</TextError>

            <Button
              onPress={onSubmit}
              loading={loading}
              disabled={!curPass || !newPass || !confPass}
              style={{marginTop: 16, height: 42}}>
              Lưu thay đổi
            </Button>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default UserPassword

const styles = StyleSheet.create({
  formWrapper: {
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 8,
    padding: 16,
  },
})
