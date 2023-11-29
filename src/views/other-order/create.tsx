import {
  Alert,
  FlatList,
  Clipboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {useEffect, useRef, useState, version} from 'react'
import {CheckBox, Colors, Icon, isIOS} from 'green-native-ts'
import appConfigs, {colors, fonts, sizes} from '~/configs'
import Spinner from 'react-native-loading-spinner-overlay'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import RestApi from '~/api/RestApi'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useGlobalContext} from '~/provider/AppProvider'
import {useForm} from 'react-hook-form'
import Input from '~/common/components/Controller/Input'
import {LocalStorage} from '~/common'
import OtherOrderStep1 from './Step1'
import OtherOrderStep2 from './Step2'

const CreateOtherOrder = () => {
  const insets = useSafeAreaInsets()

  const {user, setUser} = useGlobalContext()

  const [loading, setLoading] = useState<boolean>(false)

  const focused = useIsFocused()

  const scrollHeight = sizes.dH - insets.top

  const navigation = useNavigation<any>()

  const [textError, setTextError] = useState<string>('')

  async function handleSubmit(params) {
    try {
      const res = await RestApi.post('MainOrder/order-orther', params)
      if (res.status == 200) {
        Alert.alert('Thành công', 'Đã tạo đơn thành công', [
          {
            text: 'OK',
            onPress: () => {
              setIsCheckProduct(false)
              setIsPacked(false)
              setItems([{ProductName: '', ProductLink: '', ProductVariable: '', Quantity: 1, Note: ''}])
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

  const onSubmit = () => {
    setTextError('')

    setLoading(true)

    const SUBMIT_DATA = {
      Address: user?.Address,
      FirstName: user?.FirstName,
      LastName: user?.LastName,
      Phone: user?.Phone,
      IsPacked: isPacked || false,
      IsCheckProduct: isCheckProduct || false,
      WarehouseFromId: selectedFrom?.Id || user?.WarehouseFrom,
      WarehouseToId: selectedTo?.Id || user?.WarehouseTo,
      Email: user?.Email,
      Items: [...items],
    }

    console.log('--- SUBMIT_DATA: ', SUBMIT_DATA)

    handleSubmit(SUBMIT_DATA)
  }

  const [selectedFrom, setSelectedFrom] = useState<any>(null)
  const [selectedTo, setSelectedTo] = useState<any>(null)

  const [isPacked, setIsPacked] = useState<boolean>(false)
  const [isCheckProduct, setIsCheckProduct] = useState<boolean>(false)

  const [step, setStep] = useState<number>(1)

  const [items, setItems] = useState([{ProductName: '', ProductLink: '', ProductVariable: '', Quantity: 1, Note: ''}])

  function addNewItem() {
    let temp = [...items]
    temp.push({ProductName: '', ProductLink: '', ProductVariable: '', Quantity: 1, Note: ''})
    setItems([...temp])
  }

  console.log('--- items: ', items)

  return (
    <>
      <View style={[{paddingTop: isIOS() ? insets.top + 4 : insets.top + 12}, styles.headerContainer]}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()} style={styles.btnHeader}>
          <Icon type="MaterialIcons" name="arrow-back-ios" color="#fff" size={20} />
        </TouchableOpacity>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.headerTitle}>Tạo đơn TMĐT khác</Text>
        </View>

        <TouchableOpacity
          onPress={() => step == 2 && addNewItem()}
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

          <OtherOrderStep1
            key="step-1"
            step={step}
            setIsPacked={setIsPacked}
            setSelectedFrom={setSelectedFrom}
            setSelectedTo={setSelectedTo}
            selectedFrom={selectedFrom}
            selectedTo={selectedTo}
            isPacked={isPacked}
            setIsCheckProduct={setIsCheckProduct}
            isCheckProduct={isCheckProduct}
          />

          <OtherOrderStep2 key="step-2" step={step} items={items} setItems={setItems} />
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

      <View style={{height: isIOS() ? insets.bottom : 16, backgroundColor: '#fff'}} />

      <Spinner visible={loading} textStyle={{color: '#fff'}} textContent={'Chờ xíu, tôi đang xử lý...'} />
    </>
  )
}

export default CreateOtherOrder

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
