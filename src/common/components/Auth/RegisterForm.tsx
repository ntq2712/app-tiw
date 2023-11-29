import {View, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native'
import React, {FC, useEffect, useRef, useState} from 'react'
import Button from '../Button'
import appConfigs, {fonts, sizes} from '~/configs'
import ButtonRegister from '../Button/ButtonRegister'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import RestApi from '~/api/RestApi'

import {Picker} from '@react-native-picker/picker'
import {Icon, isIOS} from 'green-native-ts'
import {useGlobalContext} from '~/provider/AppProvider'

import RNPickerSelect from 'react-native-picker-select'
import CustomInput from '../Controller/CustomInput'

type ILoginForm = {
  loading: boolean
  setLoading?: Function
}

const RegisterForm: FC<ILoginForm> = ({loading, setLoading}) => {
  const [UserName, setUserName] = useState<string>('')
  const [FirstName, setFirstName] = useState<string>('')
  const [LastName, setLastName] = useState<string>('')
  const [Email, setEmail] = useState<string>('')
  const [Phone, setPhone] = useState<string>('')
  const [Password, setPassword] = useState<string>('')
  const [ConfirmPassword, setConfirmPassword] = useState<string>('')
  const [Address, setAddress] = useState<string>('')

  const [selectedFrom, setSelectedFrom] = useState<any>(null)
  const [selectedTo, setSelectedTo] = useState<any>(null)

  const [textError, setTextError] = useState<string>('')

  const navigation = useNavigation<any>()

  async function handleRegister(params: any) {
    setLoading(true)

    try {
      const res = await RestApi.post('Auth/register', {...params})
      if (res.status == 200) {
        Alert.alert('Chúc mừng', 'Bạn đã đăng ký thành công', [
          {
            text: 'Đăng nhập',
            onPress: () => navigation.goBack(),
          },
        ])
      }
    } catch (error) {
      setTextError(error?.message)
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit() {
    onSubmit({
      UserName: UserName,
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Phone: Phone,
      BirthDay: '2023-10-15T04:06:24.444Z',
      LevelId: 0,
      Password: Password,
      ConfirmPassword: ConfirmPassword,
      Gender: 0,
      Address: Address,
    })
  }

  const onSubmit = data => {
    setTextError('')

    if (!data?.Password) {
      setTextError('Vui lòng nhập mật khẩu')
      return
    }

    if (data?.Password.length < 6) {
      setTextError('Mật khẩu phải từ 6 ký tự')
      return
    }

    if (data?.Password !== data?.ConfirmPassword) {
      setTextError('Mật khẩu nhập lại không khớp')
      return
    }

    // if (data?.Phone.length < 9) {
    //   setTextError('Số điện thoại không hợp lệ')
    //   return
    // }

    // if (!data?.Email.includes('@')) {
    //   setTextError('Email không hợp lệ')
    //   return
    // }

    if (!isProd && isIOS()) {
      Alert.alert('Chúc mừng', 'Bạn đã đăng ký thành công', [
        {
          text: 'Đăng nhập',
          onPress: () => navigation.goBack(),
        },
      ])
      return
    }

    handleRegister({...data, WarehouseFrom: selectedFrom?.Id, WarehouseTo: selectedTo?.Id})
  }

  const focused = useIsFocused()

  useEffect(() => {
    if (focused) {
      getWareHouseFrom()
      getWareHouseTo()
    }
  }, [focused])

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

  const {isProd} = useGlobalContext()

  return (
    <>
      <View style={styles.container}>
        <Image resizeMode="contain" source={require('~/assets/images/logo.png')} style={styles.logo} />
        <>
          <CustomInput inputStyle={{height: 40}} value={UserName} onBlur={e => setUserName(e)} label="Tài khoản" />

          <CustomInput
            inputStyle={{height: 40}}
            value={Password}
            onBlur={e => setPassword(e)}
            label="Mật khẩu"
            isPassword
            wrapStyle={{marginTop: 16}}
          />

          <CustomInput
            inputStyle={{height: 40}}
            value={ConfirmPassword}
            onBlur={e => setConfirmPassword(e)}
            label="Nhập lại mật khẩu"
            isPassword
            wrapStyle={{marginTop: 16}}
          />

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CustomInput
              inputStyle={{height: 40}}
              value={FirstName}
              onBlur={e => setFirstName(e)}
              label="Họ"
              wrapStyle={{marginTop: 16, flex: 1, marginRight: 4}}
            />

            <CustomInput
              inputStyle={{height: 40}}
              value={LastName}
              onBlur={e => setLastName(e)}
              label="Tên"
              wrapStyle={{marginTop: 16, flex: 1, marginLeft: 4}}
            />
          </View>

          {isProd && (
            <>
              <CustomInput
                inputStyle={{height: 40}}
                value={Email}
                onBlur={e => setEmail(e)}
                label="Email"
                wrapStyle={{marginTop: 16}}
              />

              <CustomInput
                inputStyle={{height: 40}}
                value={Email}
                onBlur={e => setPhone(e)}
                label="Điện thoại"
                wrapStyle={{marginTop: 16}}
              />

              <CustomInput
                inputStyle={{height: 40}}
                value={Address}
                onBlur={e => setAddress(e)}
                label="Địa chỉ"
                wrapStyle={{marginTop: 16}}
              />
            </>
          )}
        </>

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
                <Text style={{color: '#000', flex: 1}}>{!selectedFrom?.Name ? 'Chọn kho TQ' : selectedFrom?.Name}</Text>
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
          </>
        )}

        {!!textError && (
          <Text
            style={{
              color: 'red',
              marginTop: 24,
              fontSize: 14,
              fontFamily: fonts.Regular,
              textAlign: 'left',
              width: '100%',
            }}>
            {textError}
          </Text>
        )}

        {/* @ts-ignore */}
        <Button loading={loading} text="Đăng ký" onPress={handleSubmit} style={{marginTop: 24}} />
        <ButtonRegister text="Quay lại đăng nhập" onPress={() => navigation.goBack()} style={{marginTop: 16}} />
      </View>

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
    </>
  )
}

export default RegisterForm

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  textTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: appConfigs.fonts.Bold,
  },
  contentContainer: {
    // backgroundColor: 'green',
    padding: 16,
  },
  logo: {
    width: sizes.dW / 4,
    height: undefined,
    aspectRatio: 1,
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
  lable: {
    color: '#000',
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: appConfigs.fonts.Bold,
  },
})
