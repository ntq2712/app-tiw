import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {Colors, windowHeight} from 'green-native-ts'
import {fonts} from '~/configs'
import Spinner from 'react-native-loading-spinner-overlay'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import RestApi from '~/api/RestApi'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useGlobalContext} from '~/provider/AppProvider'
import {useForm} from 'react-hook-form'
import Input from '~/common/components/Controller/Input'
import {LocalStorage} from '~/common'
import {GStatusBar, HeaderWhite} from '~/common/components'
import Select from '~/common/components/Controller/Select'
import DatePicker from '~/common/components/Controller/Date'

const UserInformation = () => {
  const insets = useSafeAreaInsets()
  const focused = useIsFocused()
  const navigation = useNavigation<any>()

  const {user, isProd, setUser} = useGlobalContext()

  const [loading, setLoading] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {...user},
  })

  const scrollHeight = windowHeight - insets.top

  async function getNewInformation() {
    try {
      const res = await RestApi.getBy<any>('UserInformation', user?.UserInformationId + '')
      if (res.status == 200) {
        await LocalStorage.setUserInformation(res?.data?.data)
        await setUser({token: user?.token, ...res.data?.data})

        Alert.alert('Thành công', 'Đã cập nhật thông tin tài khoản', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ])
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  async function updateInformation(params) {
    console.log('---- updateInformation: ', params)

    setLoading(true)

    try {
      const res = await RestApi.put('UserInformation', params)
      if (res.status == 200) {
        getNewInformation()
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Lỗi', error?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = data => {
    if (data?.Mobile.length < 8) {
      Alert.alert('Lỗi', 'Số điện thoại không hợp lệ')
      return
    }

    updateInformation({
      FullName: data?.FullName,
      UserName: data?.UserName,
      Mobile: data?.Mobile,
      Email: data?.Email,
      Gender: data?.Gender,
      DOB: data?.DOB,
      UserInformationId: data?.UserInformationId,
    })
  }

  return (
    <>
      <GStatusBar.Dark />
      <HeaderWhite>Thay đổi thông tin</HeaderWhite>

      <ScrollView
        endFillColor={Colors.transparent}
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={[{minHeight: scrollHeight}]}>
        <View style={{flex: 1}}>
          <View
            style={{
              width: '100%',
              backgroundColor: '#fff',
              marginTop: 8,
              padding: 16,
            }}>
            <Input
              inputStyle={{height: 40}}
              control={control}
              name="FullName"
              label="Họ tên"
              errors={errors.FullName}
              required={true}
              wrapStyle={{marginTop: 16}}
            />

            <Input
              inputStyle={{height: 40}}
              control={control}
              name="UserName"
              label="Tên đăng nhập"
              errors={errors.UserName}
              required
              wrapStyle={{marginTop: 16}}
            />

            <Input
              inputStyle={{height: 40}}
              control={control}
              name="Mobile"
              label="Điện thoại"
              errors={errors.Mobile}
              wrapStyle={{marginTop: 16}}
            />

            <Input
              inputStyle={{height: 40}}
              control={control}
              name="Email"
              label="Email"
              errors={errors.Email}
              wrapStyle={{marginTop: 16}}
            />

            <Select
              inputStyle={{height: 40}}
              headerTitle="Chọn giới tính"
              control={control}
              name="Gender"
              label="Giới tính"
              errors={errors.Gender}
              data={[
                {value: 0, title: 'Nam'},
                {value: 1, title: 'Nữ'},
                {value: 2, title: 'Khác'},
              ]}
              wrapStyle={{marginTop: 16}}
            />

            <DatePicker
              placeholder="Chọn ngày sinh"
              control={control}
              name="DOB"
              label="Ngày sinh"
              errors={errors.DOB}
              wrapStyle={{marginTop: 16}}
              inputStyle={{height: 40}}
            />

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              activeOpacity={0.7}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#2196F3',
                borderRadius: 8,
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

export default UserInformation
