import {ScrollView, StatusBar, View} from 'react-native'
import React, {FC, useEffect, useState} from 'react'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useGlobalContext} from '~/provider/AppProvider'
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native'
import RestApi from '~/api/RestApi'
import HeaderDetail from '~/common/components/Header/HeaderDetail'
import ClassMenu from './ClassMenu'
import Info from './Info'
import StudySessions from './StudySessions'
import Attackdance from './Attackdance'
import Document from './Document'
import SuperLoading from '~/common/components/SuperLoading'

const ClassDetail = () => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<any>()

  const {user} = useGlobalContext()

  const [loading, setLoading] = useState<boolean>(true)

  const router: any = useRoute()
  const focused = useIsFocused()

  useEffect(() => {
    if (focused && router?.params) {
      getDetail()
      getSchedule()
    }
  }, [focused, router])

  const [detail, setDetail] = useState<any>({})
  const [schedule, setSchedule] = useState([])

  async function getDetail() {
    setLoading(true)
    try {
      const res = await RestApi.getBy<any>('Class', router?.params?.Id)
      if (res.status == 200) {
        setDetail(res.data.data)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  async function getSchedule() {
    try {
      const res = await RestApi.get<any>('Schedule', {classId: router?.params?.Id})
      if (res.status == 200) {
        setSchedule(res.data.data)
      }
    } catch (error) {}
  }

  const [curTab, setCurTab] = useState(1)
  const [curStudent, setCurStudent] = useState(null)

  useEffect(() => {
    if (user?.RoleId == 3) {
      setCurStudent(user?.UserInformationId)
    }
  }, [])

  return (
    <View style={{backgroundColor: '#f1f1f1', flex: 1}}>
      <StatusBar barStyle="light-content" />

      <HeaderDetail>{detail?.Name}</HeaderDetail>
      <ClassMenu curTab={curTab} setCurTab={setCurTab} />

      <ScrollView>
        {curTab == 1 && <Info router={router} detail={detail} />}
        {curTab == 2 && <StudySessions router={router} detail={detail} schedule={schedule} />}
        {curTab == 3 && <Attackdance router={router} detail={detail} schedule={schedule} curStudent={curStudent} />}

        {curTab == 4 && <Document router={router} detail={detail} schedule={schedule} curStudent={curStudent} />}
        <View style={{flex: 1}} />

        <View style={{height: 24}} />
      </ScrollView>

      <SuperLoading loading={loading} />
    </View>
  )
}

export default ClassDetail
