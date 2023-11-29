import {Alert, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import {Colors, Icon, isIOS} from 'green-native-ts'
import appConfigs, {colors, fonts, sizes} from '~/configs'
import Spinner from 'react-native-loading-spinner-overlay'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import RestApi from '~/api/RestApi'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useGlobalContext} from '~/provider/AppProvider'
import {useForm} from 'react-hook-form'
import Input from '~/common/components/Controller/Input'
import {LocalStorage} from '~/common'
import {Picker} from '@react-native-picker/picker'
import RNPickerSelect from 'react-native-picker-select'

const UserInformation = () => {
  const insets = useSafeAreaInsets()

  const {user, isProd, setUser} = useGlobalContext()

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

  async function getNewInformation() {
    try {
      const res = await RestApi.get<any>('Auth/my-info', {})
      if (res.status == 200) {
        await LocalStorage.setUserInformation(res?.data?.data)
        await setUser({token: user?.token, ...res.data?.data})
        navigation.goBack()
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
      const res = await RestApi.put('Auth/my-info', params)
      if (res.status == 200) {
        getNewInformation()
      }
    } catch (error) {
      console.log(error)

      Alert.alert('Ồ.. có lỗi rồi', error?.data?.message)
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
      Address: data?.Address,
      FirstName: data?.FirstName,
      LastName: data?.LastName,
      Phone: data?.Phone,

      WarehouseFrom: data?.WarehouseFrom,
      WarehouseTo: data?.WarehouseTo,
    })
  }

  useEffect(() => {
    if (focused) {
      getWareHouseFrom()
      getWareHouseTo()
    }
  }, [focused])

  const [selectedFrom, setSelectedFrom] = useState<any>(null)
  const [selectedTo, setSelectedTo] = useState<any>(null)
  const [wareHouseFrom, setWareHouseFrom] = useState([])
  const [wareHouseTo, setWareHouseTo] = useState([])

  async function getWareHouseFrom() {
    try {
      const res = await RestApi.get<any>('Auth/warehouse-from', {})
      if (res.status == 200) {
        setWareHouseFrom(res?.data?.data)
      }
    } catch (error) {}
  }

  async function getWareHouseTo() {
    try {
      const res = await RestApi.get<any>('Auth/warehouse-to', {})
      if (res.status == 200) {
        setWareHouseTo(res?.data?.data)
      }
    } catch (error) {}
  }
  const whfRef = useRef(null)
  const whtRef = useRef(null)

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
              <Text style={styles.headerTitle}>Thay đổi thông tin</Text>
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
              name="FirstName"
              label="Họ"
              errors={errors.FirstName}
              wrapStyle={{marginTop: 16}}
            />
            <Input
              inputStyle={{height: 40}}
              control={control}
              name="LastName"
              label="Tên"
              errors={errors.LastName}
              wrapStyle={{marginTop: 16}}
            />
            {isProd && (
              <>
                <Input
                  inputStyle={{height: 40}}
                  control={control}
                  name="Phone"
                  label="Điện thoại"
                  errors={errors.Phone}
                  wrapStyle={{marginTop: 16}}
                />
                <Input
                  inputStyle={{height: 40}}
                  control={control}
                  name="Address"
                  label="Địa chỉ"
                  errors={errors.Address}
                  wrapStyle={{marginTop: 16}}
                />
              </>
            )}

            {isProd && (
              <>
                <View style={{marginTop: 16}}>
                  <Text style={styles.lable}>Kho TQ</Text>
                  {isIOS() && (
                    <View style={{height: 0, opacity: 0}}>
                      <RNPickerSelect
                        key="whf-ios"
                        ref={whfRef}
                        items={[
                          ...wareHouseFrom.map(item => {
                            return {label: item?.Name, value: JSON.stringify({...item})}
                          }),
                        ]}
                        onValueChange={(value, item) => setSelectedFrom(JSON.parse(value + ''))}
                      />
                    </View>
                  )}

                  <TouchableOpacity
                    onPress={() => {
                      if (isIOS()) {
                        whfRef.current?.togglePicker()
                      } else {
                        whfRef.current?.focus()
                      }
                    }}
                    activeOpacity={0.7}
                    style={[
                      styles.wrapInput,
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                      },
                    ]}>
                    <Text style={{color: '#000', flex: 1}}>
                      {!selectedFrom?.Name ? 'Chọn kho TQ' : selectedFrom?.Name}
                    </Text>
                    <Icon name="caretdown" type="AntDesign" color="#000" size={14} />
                  </TouchableOpacity>
                </View>

                <View style={{marginTop: 16}}>
                  <Text style={styles.lable}>Kho VN</Text>

                  {isIOS() && (
                    <View style={{height: 0, opacity: 0}}>
                      <RNPickerSelect
                        key="wht-ios"
                        ref={whtRef}
                        items={[
                          ...wareHouseTo.map(item => {
                            return {label: item?.Name, value: JSON.stringify({...item})}
                          }),
                        ]}
                        onValueChange={(value, item) => setSelectedTo(JSON.parse(value + ''))}
                      />
                    </View>
                  )}

                  <TouchableOpacity
                    onPress={() => {
                      if (isIOS()) {
                        whtRef.current?.togglePicker()
                      } else {
                        whtRef.current?.focus()
                      }
                    }}
                    activeOpacity={0.7}
                    style={[
                      styles.wrapInput,
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                      },
                    ]}>
                    <Text style={{color: '#000', flex: 1}}>{!selectedTo?.Name ? 'Chọn kho TQ' : selectedTo?.Name}</Text>
                    <Icon name="caretdown" type="AntDesign" color="#000" size={14} />
                  </TouchableOpacity>
                </View>

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
              </>
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

      {!isIOS() && (
        <>
          <Picker
            key="pk-wh-from"
            onValueChange={(value, item) => setSelectedFrom(JSON.parse(value + ''))}
            ref={whfRef}
            selectedValue={null}
            style={{height: 0, opacity: 0, display: 'none'}}>
            {wareHouseFrom.map((item, index) => (
              <Picker.Item label={item?.Name} value={JSON.stringify({...item})} />
            ))}
          </Picker>
          <Picker
            key="pk-wh-to"
            onValueChange={(value, item) => setSelectedTo(JSON.parse(value + ''))}
            ref={whtRef}
            selectedValue={null}
            style={{height: 0, opacity: 0, display: 'none'}}>
            {wareHouseTo.map((item, index) => (
              <Picker.Item label={item?.Name} value={JSON.stringify({...item})} />
            ))}
          </Picker>
        </>
      )}

      <Spinner visible={loading} textContent={'Chờ xíu, tôi đang xử lý...'} />
    </>
  )
}

export default UserInformation

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
