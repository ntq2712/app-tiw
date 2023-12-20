import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Colors, windowHeight} from 'green-native-ts'
import {fonts} from '~/configs'
import Spinner from 'react-native-loading-spinner-overlay'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import RestApi from '~/api/RestApi'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useGlobalContext} from '~/provider/AppProvider'
import {useForm} from 'react-hook-form'
import {LocalStorage} from '~/common'
import {GStatusBar, HeaderWhite} from '~/common/components'
import Select from '~/common/components/Controller/Select'

const UserLearn = () => {
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
      SaleId: data?.SaleId,
      LearningNeedId: data?.LearningNeedId,
      PurposeId: data?.PurposeId,
      SourceId: data?.SourceId,
      UserInformationId: data?.UserInformationId,
    })
  }

  // ----------------------------------------------------------------

  useEffect(() => {
    if (focused) {
      getLearningNeed()
      getDistrics()
      getPurpose()
      getSources()
    }
  }, [focused])

  const [learningNeed, setLearningNeed] = useState([])

  async function getLearningNeed() {
    try {
      const res = await RestApi.get<any>('LearningNeed', {}, true)
      if (res.status == 200) {
        setLearningNeed(res?.data?.data)
      }
    } catch (error) {}
  }

  const [staff, setStaff] = useState([])

  async function getDistrics(area?: any) {
    try {
      const res = await RestApi.get<any>('UserInformation/user-available/5', {}, true)
      if (res.status == 200) {
        setStaff(res?.data?.data)
      }
    } catch (error) {}
  }

  const [purposes, setPurposes] = useState([])

  async function getPurpose() {
    try {
      const res = await RestApi.get<any>('Purpose', {}, true)
      if (res.status == 200) {
        setPurposes(res?.data?.data)
      }
    } catch (error) {}
  }

  const [sources, setSources] = useState([])

  async function getSources() {
    try {
      const res = await RestApi.get<any>('Source', {}, true)
      if (res.status == 200) {
        setSources(res?.data?.data)
      }
    } catch (error) {}
  }

  return (
    <>
      <GStatusBar.Dark />
      <HeaderWhite>Thông tin học</HeaderWhite>

      <ScrollView
        endFillColor={Colors.transparent}
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={[{minHeight: scrollHeight}]}>
        <View style={{flex: 1}}>
          <View style={{width: '100%', backgroundColor: '#fff', marginTop: 8, padding: 16}}>
            <Select
              inputStyle={{height: 40}}
              headerTitle="Chọn tư vấn viên"
              control={control}
              name="SaleId"
              label="Tư vấn viên"
              errors={errors.SaleId}
              data={staff.map(item => {
                return {value: item?.UserInformationId, title: `${item?.FullName}`}
              })}
              wrapStyle={{marginTop: 16}}
              required={false}
            />

            <Select
              inputStyle={{height: 40}}
              headerTitle="Chọn nhu cầu học"
              control={control}
              name="LearningNeedId"
              label="Nhu cầu học"
              errors={errors.LearningNeedId}
              data={learningNeed.map(item => {
                return {value: item?.Id, title: item?.Name}
              })}
              wrapStyle={{marginTop: 16}}
              required={false}
            />

            <Select
              inputStyle={{height: 40}}
              headerTitle="Chọn mục đích học"
              control={control}
              name="PurposeId"
              label="Mục đích học"
              errors={errors.PurposeId}
              data={purposes.map(item => {
                return {value: item?.Id, title: item?.Name}
              })}
              wrapStyle={{marginTop: 16}}
              required={false}
            />

            <Select
              inputStyle={{height: 40}}
              headerTitle="Chọn nguồn"
              control={control}
              name="SourceId"
              label="Nguồn"
              required={false}
              errors={errors.SourceId}
              data={sources.map(item => {
                return {value: item?.Id, title: item?.Name}
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

export default UserLearn
