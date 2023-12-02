import {Alert, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {FC, useEffect, useState} from 'react'
import {colors, fonts} from '~/configs'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {CheckBox, Colors, Icon, isIOS, parseMoney} from 'green-native-ts'
import {useGlobalContext} from '~/provider/AppProvider'
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import RestApi from '~/api/RestApi'
import CartItem from '../ClassItem'
import HeaderDetail from '~/common/components/Header/HeaderDetail'
import ClassMenu from './ClassMenu'
import Info from './Info'
import StudySessions from './StudySessions'

const ClassDetail = () => {
  const insets = useSafeAreaInsets()

  const {user, carts, getCarts, cartChecked, setCartChecked} = useGlobalContext()

  const [loading, setLoading] = useState<boolean>(false)
  const [shipTypes, setShipTypes] = useState([])

  const router: any = useRoute()
  const focused = useIsFocused()

  const [data, setData] = useState([])

  useEffect(() => {
    if (focused && router?.params) {
      getDetail()
      getSchedule()
    }
  }, [focused, router])

  const [detail, setDetail] = useState<any>({})

  const [schedule, setSchedule] = useState([])

  async function getDetail() {
    try {
      const res = await RestApi.getBy<any>('Class', router?.params?.Id)
      if (res.status == 200) {
        setDetail(res.data.data)
      }
    } catch (error) {}
  }

  async function getSchedule() {
    try {
      const res = await RestApi.get<any>('Schedule', {classId: router?.params?.Id})
      if (res.status == 200) {
        setSchedule(res.data.data)
      }
    } catch (error) {}
  }

  useEffect(() => {
    if (focused) {
    }
  }, [focused])

  const navigation = useNavigation<any>()

  const [curTab, setCurTab] = useState(1)

  return (
    <View style={{backgroundColor: '#f1f1f1', flex: 1}}>
      <StatusBar barStyle="light-content" />

      <HeaderDetail>{detail?.Name}</HeaderDetail>
      <ClassMenu curTab={curTab} setCurTab={setCurTab} />

      <ScrollView>
        {curTab == 1 && <Info router={router} detail={detail} />}
        {curTab == 2 && <StudySessions router={router} detail={detail} schedule={schedule} />}

        <View style={{flex: 1}}></View>

        <View style={{height: 24}} />
      </ScrollView>

      <Spinner visible={loading} textContent={'Chờ xíu, tôi đang xử lý...'} />
    </View>
  )
}

export default ClassDetail

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
  },
  name: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    color: '#0B1B19',
    flex: 1,
  },
  thumbnail: {
    backgroundColor: '#E9E9E9',
    borderRadius: 10,
    width: 90,
    height: 90,
  },
  textInfo: {
    fontFamily: fonts.Medium,
    color: '#000',
    fontSize: 14,
    marginLeft: 8,
    marginTop: -2,
  },
})
