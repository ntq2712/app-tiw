import {Alert, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {Colors, Icon, isIOS} from 'green-native-ts'
import appConfigs, {colors, fonts, sizes} from '~/configs'
import Spinner from 'react-native-loading-spinner-overlay'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import RestApi from '~/api/RestApi'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useGlobalContext} from '~/provider/AppProvider'
import {useForm} from 'react-hook-form'
import Input from '~/common/components/Controller/Input'

const UserPassword = () => {
  const insets = useSafeAreaInsets()

  const {user, setUser} = useGlobalContext()

  const [loading, setLoading] = useState<boolean>(false)

  const focused = useIsFocused()

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {...user},
  })

  const scrollHeight = sizes.dH - insets.top

  const navigation = useNavigation<any>()

  const [textError, setTextError] = useState<string>('')

  async function updateInformation(params) {
    console.log('---- updateInformation: ', params)

    setLoading(true)

    try {
      const res = await RestApi.post('Auth/change-password', params)
      if (res.status == 200) {
        navigation.goBack()
      }
    } catch (error) {
      Alert.alert('Ồ.. có lỗi rồi', error?.message)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = data => {
    setTextError('')

    if (data?.Phone.length < 9) {
      setTextError('Số điện thoại không hợp lệ')
      return
    }

    updateInformation({
      OldPassword: data?.OldPassword,
      NewPassword: data?.NewPassword,
      ConfirmNewPassword: data?.ConfirmNewPassword,
    })
  }

  return (
    <>
      <ScrollView
        endFillColor={Colors.transparent}
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={[{minHeight: scrollHeight}]}>
        <View style={{flex: 1}}>
          <StatusBar barStyle="light-content" />

          <View style={[{paddingTop: isIOS() ? insets.top + 4 : insets.top + 12}, styles.headerContainer]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 16,
              }}>
              <Icon type="MaterialIcons" name="arrow-back-ios" color="#fff" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.headerTitle}>Đổi mật khẩu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 16,
                opacity: 0,
              }}>
              <Icon type="MaterialIcons" name="arrow-back-ios" color="#fff" size={20} />
            </TouchableOpacity>
          </View>

          <View style={{width: '100%', backgroundColor: '#fff', marginTop: 8, padding: 16}}>
            <Input
              inputStyle={{height: 40}}
              control={control}
              name="OldPassword"
              label="Mật khẩu cũ"
              isPassword
              wrapStyle={{marginTop: 16}}
            />

            <Input
              inputStyle={{height: 40}}
              control={control}
              name="NewPassword"
              label="Mật khẩu mới"
              isPassword
              wrapStyle={{marginTop: 16}}
            />

            <Input
              inputStyle={{height: 40}}
              control={control}
              name="ConfirmNewPassword"
              label="Nhập lại mật khẩu"
              isPassword
              wrapStyle={{marginTop: 16}}
            />

            {textError && (
              <Text
                style={{
                  color: 'red',
                  marginTop: 16,
                  fontSize: 14,
                  fontFamily: fonts.Regular,
                  textAlign: 'left',
                  width: '100%',
                }}>
                {textError}
              </Text>
            )}

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              activeOpacity={0.7}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.primary,
                borderRadius: 12,
                height: 44,
                marginTop: 16,
              }}>
              <Text style={{fontFamily: fonts.Bold, fontSize: 16, color: '#fff'}}>Lưu thay đổi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Spinner visible={loading} textContent={'Chờ xíu, tôi đang xử lý...'} />
    </>
  )
}

export default UserPassword

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingBottom: 12,
  },
  headerTitle: {
    fontFamily: fonts.Bold,
    fontSize: 20,
    color: '#fff',
  },
  lable: {
    color: '#000',
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: appConfigs.fonts.Bold,
  },
  wrapInput: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    flexDirection: 'row',
    position: 'relative',
    height: 42,
    paddingHorizontal: 16,
  },
  fullName: {
    fontFamily: fonts.Semibold,
    fontSize: 16,
    color: '#000',
  },
  phone: {
    fontFamily: fonts.Semibold,
    fontSize: 16,
  },
})
