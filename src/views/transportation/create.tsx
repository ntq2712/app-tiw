import {Alert, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Colors, Icon, isIOS} from 'green-native-ts'
import {colors, fonts, sizes} from '~/configs'
import Spinner from 'react-native-loading-spinner-overlay'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import RestApi from '~/api/RestApi'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useGlobalContext} from '~/provider/AppProvider'
import CreateTransStep1 from './Step1'
import CreateTransStep2 from './Step2'

const CreateTrans = () => {
  const insets = useSafeAreaInsets()

  const {user, getOrders, isProd, getNotifications} = useGlobalContext()

  useEffect(() => {
    getNotifications()
    getOrders()
  }, [])

  const [loading, setLoading] = useState<boolean>(false)

  const focused = useIsFocused()

  const scrollHeight = sizes.dH - insets.top

  const navigation = useNavigation<any>()

  const [textError, setTextError] = useState<string>('')

  async function handleSubmit(params) {
    try {
      const res = await RestApi.post('TransportationOrder', params)
      if (res.status == 200) {
        Alert.alert('Thành công', 'Đã tạo đơn thành công', [
          {
            text: 'OK',
            onPress: () => {
              setDescription('')
              setItems([{OrderCode: '', Weight: 0, ProductName: '', Quantity: 0, Price: 0}])
              navigation.goBack()
            },
          },
        ])
      }
    } catch (error) {
      Alert.alert('Có lỗi xảy ra', error?.message || error?.data?.message || 'Lỗi không xác định')
    } finally {
      setLoading(false)
    }
  }

  const [description, setDescription] = useState<string>('')

  const onSubmit = () => {
    setTextError('')

    setLoading(true)

    const SUBMIT_DATA = {
      WarehouseFromId: selectedFrom?.Id || user?.WarehouseFrom,
      WarehouseToId: selectedTo?.Id || user?.WarehouseTo,
      ShippingTypeId: 1,
      Description: description,
      Details: [...items],
    }

    console.log('--- SUBMIT_DATA: ', SUBMIT_DATA)

    handleSubmit(SUBMIT_DATA)
  }

  const [selectedFrom, setSelectedFrom] = useState<any>(null)
  const [selectedTo, setSelectedTo] = useState<any>(null)

  const [step, setStep] = useState<number>(1)

  const [items, setItems] = useState([
    {
      OrderCode: '',
      Weight: 0,
      ProductName: '',
      Quantity: 0,
      Price: 0,
    },
  ])

  function addNewItem() {
    let temp = [...items]
    temp.push({OrderCode: '', Weight: 0, ProductName: '', Quantity: 0, Price: 0})
    setItems([...temp])
  }

  return (
    <>
      <View style={[{paddingTop: isIOS() ? insets.top + 4 : insets.top + 12}, styles.headerContainer]}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()} style={styles.btnHeader}>
          <Icon type="MaterialIcons" name="arrow-back-ios" color="#fff" size={20} />
        </TouchableOpacity>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.headerTitle}>Tạo đơn ký gửi</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            if (isProd) {
              step == 2 && addNewItem()
            }
          }}
          activeOpacity={step == 2 ? 0.7 : 1}
          style={[styles.btnHeader, {opacity: step == 2 ? 1 : 0}]}>
          <Icon type="MaterialCommunityIcons" name="plus" color="#fff" size={26} />
        </TouchableOpacity>
      </View>

      <ScrollView
        endFillColor={Colors.transparent}
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={[{minHeight: scrollHeight}]}>
        <View style={{flex: 1}}>
          <StatusBar barStyle="light-content" />

          <CreateTransStep1
            key="step-1"
            step={step}
            setSelectedFrom={setSelectedFrom}
            setSelectedTo={setSelectedTo}
            selectedFrom={selectedFrom}
            selectedTo={selectedTo}
            des={description}
            setDes={setDescription}
          />

          <CreateTransStep2 key="step-2" step={step} items={items} setItems={setItems} />
        </View>
        <View style={{height: 8}} />
      </ScrollView>

      {step == 1 && (
        <View style={[styles.controller, {marginTop: 8}]}>
          <TouchableOpacity onPress={() => setStep(2)} activeOpacity={0.7} style={styles.btnPrimary}>
            <Text style={[styles.semi16, {color: '#fff'}]}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      )}

      {step == 2 && (
        <>
          <View style={styles.totalItems}>
            <Text style={[styles.semi16, {flex: 1, color: '#000'}]}>Tổng: </Text>
            <Text style={[styles.semi16, {color: colors.primary}]}>{items.length} sản phẩm</Text>
          </View>

          <View style={styles.controller}>
            <TouchableOpacity
              onPress={() => setStep(1)}
              activeOpacity={0.7}
              style={[styles.btnSecondary, {marginRight: 8}]}>
              <Text style={{fontFamily: fonts.Bold, fontSize: 16, color: '#000'}}>Quay lại</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onSubmit} activeOpacity={0.7} style={[styles.btnPrimary, {marginLeft: 8}]}>
              <Text style={{fontFamily: fonts.Bold, fontSize: 16, color: '#fff'}}>Hoàn tất</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {isIOS() && <View style={{height: insets.bottom, backgroundColor: '#fff'}} />}

      <Spinner visible={loading} textStyle={{color: '#fff'}} textContent={'Chờ xíu, tôi đang xử lý...'} />
    </>
  )
}

export default CreateTrans

const styles = StyleSheet.create({
  semi16: {fontFamily: fonts.Semibold, fontSize: 16},
  totalItems: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    paddingBottom: 0,
    borderTopWidth: 1,
    borderColor: Colors.trans05,
  },
  controller: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  btnSecondary: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.trans20,
    borderRadius: 12,
    height: 40,
  },
  btnPrimary: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    height: 40,
  },
  btnHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
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
})
