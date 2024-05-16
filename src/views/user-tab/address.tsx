import {useIsFocused, useNavigation} from '@react-navigation/native'
import {Colors, windowHeight} from 'green-native-ts'
import React, {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import RestApi from '~/api/RestApi'
import {LocalStorage} from '~/common'
import {GStatusBar, HeaderWhite} from '~/common/components'
import Input from '~/common/components/Controller/Input'
import Select from '~/common/components/Controller/Select'
import {fonts} from '~/configs'
import {useGlobalContext} from '~/provider/AppProvider'

const UserAddress = () => {
  const insets = useSafeAreaInsets()
  const focused = useIsFocused()

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

  const navigation = useNavigation<any>()

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
    updateInformation({
      Address: data?.Address,
      AreaId: data?.AreaId,
      DistrictId: data?.DistrictId,
      WardId: data?.WardId,
      UserInformationId: data?.UserInformationId,
    })
  }

  // ----------------------------------------------------------------

  useEffect(() => {
    if (focused) {
      getAreas()
      getDistrics()
      getWards()
    }
  }, [focused])

  const [areas, setAreas] = useState([])

  async function getAreas() {
    try {
      const res = await RestApi.get<any>('Area', {}, true)
      if (res.status == 200) {
        setAreas(res?.data?.data)
      }
    } catch (error) {}
  }

  const [districs, setDistrics] = useState([])

  async function getDistrics(area?: any) {
    try {
      const res = await RestApi.get<any>('District', {areaId: area || null}, true)
      if (res.status == 200) {
        setDistrics(res?.data?.data)
      }
    } catch (error) {}
  }

  const [wards, setWards] = useState([])

  async function getWards(districtId?: any) {
    try {
      const res = await RestApi.get<any>('Ward', {districtId: districtId || null}, true)
      if (res.status == 200) {
        setWards(res?.data?.data)
      }
    } catch (error) {}
  }

  return (
    <>
      <GStatusBar.Dark />
      <HeaderWhite>Thay đổi địa chỉ</HeaderWhite>

      <ScrollView
        endFillColor={Colors.transparent}
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={[{minHeight: scrollHeight}]}>
        <View style={{flex: 1}}>
          <View style={{width: '100%', backgroundColor: '#fff', marginTop: 8, padding: 16}}>
            <Input
              inputStyle={{height: 40}}
              control={control}
              name="Address"
              label="Địa chỉ"
              errors={errors.Address}
              required={true}
              wrapStyle={{marginTop: 16}}
            />

            <Select
              inputStyle={{height: 40}}
              headerTitle="Chọn tỉnh / thành phố"
              control={control}
              name="AreaId"
              label="Tỉnh / thành phố"
              errors={errors.AreaId}
              data={areas.map(area => {
                return {value: area?.Id, title: area?.Name}
              })}
              wrapStyle={{marginTop: 16}}
              onChangeValue={area => getDistrics(area)}
            />

            <Select
              inputStyle={{height: 40}}
              headerTitle="Chọn quận / huyện"
              control={control}
              name="DistrictId"
              label="Quận / huyện"
              errors={errors.DistrictId}
              data={districs.map(distric => {
                return {value: distric?.Id, title: distric?.Name}
              })}
              wrapStyle={{marginTop: 16}}
              onChangeValue={distric => getWards(distric)}
            />

            <Select
              inputStyle={{height: 40}}
              headerTitle="Chọn phường / xã"
              control={control}
              name="WardId"
              label="Phường / xã"
              errors={errors.WardId}
              data={wards.map(ward => {
                return {value: ward?.Id, title: ward?.Name}
              })}
              wrapStyle={{marginTop: 16}}
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

export default UserAddress
