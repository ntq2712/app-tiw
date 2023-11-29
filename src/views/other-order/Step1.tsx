import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {FC, useEffect, useRef, useState} from 'react'
import {CheckBox, Colors, Icon, isIOS} from 'green-native-ts'
import appConfigs, {fonts} from '~/configs'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import RestApi from '~/api/RestApi'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useGlobalContext} from '~/provider/AppProvider'
import {Picker} from '@react-native-picker/picker'
import RNPickerSelect from 'react-native-picker-select'

type TCreateOtherOrder = {
  step: number
  isPacked: boolean
  setIsPacked: Function
  isCheckProduct: boolean
  setIsCheckProduct: Function
  setSelectedFrom: Function
  setSelectedTo: Function
  selectedFrom?: any
  selectedTo?: any
}

const OtherOrderStep1: FC<TCreateOtherOrder> = props => {
  const {step, isPacked, setIsPacked, isCheckProduct} = props

  const {setIsCheckProduct, setSelectedFrom, setSelectedTo, selectedFrom, selectedTo} = props

  const whfRef = useRef(null)
  const whtRef = useRef(null)

  const insets = useSafeAreaInsets()

  const {user, isProd} = useGlobalContext()

  const focused = useIsFocused()
  const navigation = useNavigation<any>()

  const [wareHouseFrom, setWareHouseFrom] = useState([])
  const [wareHouseTo, setWareHouseTo] = useState([])

  useEffect(() => {
    getWareHouseFrom()
    getWareHouseTo()
  }, [])

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

  return (
    <>
      {step == 1 && (
        <>
          <TouchableOpacity
            onPress={() => navigation.navigate('UserInformation')}
            activeOpacity={0.7}
            style={styles.infoWrapper}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Text style={[styles.semi16, {color: '#000', marginBottom: 4}]}>
                {`${user?.FirstName} ${user?.LastName}`}
              </Text>
              <View style={styles.tagPhone}>
                <Text style={{color: '#000', fontSize: 14, fontFamily: fonts.Semibold}}>{`${user?.Phone}`}</Text>
              </View>
              <Text numberOfLines={2} style={{color: '#000', fontSize: 14, fontFamily: fonts.Regular}}>
                {`${user?.Address}`}
              </Text>
            </View>

            <Icon type="MaterialIcons" name="arrow-forward-ios" color="#000" size={20} />
          </TouchableOpacity>

          <View style={{width: '100%', backgroundColor: '#fff', marginTop: 8, padding: 16}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1, padding: 8, backgroundColor: Colors.trans05, borderRadius: 8, marginRight: 8}}>
                {/* @ts-ignore */}
                <CheckBox
                  onPress={() => setIsPacked(!isPacked)}
                  checked={isPacked}
                  text="Đóng gỗ"
                  iconSize={20}
                  textColor="#000"
                  textSize={14}
                />
              </View>
              <View style={{flex: 1, padding: 8, backgroundColor: Colors.trans05, borderRadius: 8, marginRight: 8}}>
                {/* @ts-ignore */}
                <CheckBox
                  onPress={() => setIsCheckProduct(!isCheckProduct)}
                  checked={isCheckProduct}
                  text="Kiểm hàng"
                  iconSize={20}
                  textColor="#000"
                  textSize={14}
                />
              </View>
            </View>
          </View>

          {isProd && (
            <View style={{width: '100%', backgroundColor: '#fff', marginTop: 8, padding: 16}}>
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
                  style={[styles.wrapInput, {flexDirection: 'row', alignItems: 'center'}]}>
                  <Text style={{color: '#000', flex: 1}}>{!selectedTo?.Name ? 'Chọn kho TQ' : selectedTo?.Name}</Text>
                  <Icon name="caretdown" type="AntDesign" color="#000" size={14} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}

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

export default OtherOrderStep1

const styles = StyleSheet.create({
  tagPhone: {
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingTop: 1,
    paddingBottom: 3,
    backgroundColor: Colors.trans10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  infoWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 8,
    padding: 16,
  },
  semi16: {fontFamily: fonts.Semibold, fontSize: 16},
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
})
