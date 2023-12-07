import {ScrollView, StatusBar, View} from 'react-native'
import React, {FC, useEffect, useState} from 'react'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useGlobalContext} from '~/provider/AppProvider'
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native'
import RestApi from '~/api/RestApi'
import HeaderBackground from '~/common/components/Header/HeaderBackground'
import ClassMenu from './ClassMenu'
import Info from './Info'
import StudySessions from './StudySessions'
import Attackdance from './Attackdance'
import Document from './Document'
import SuperLoading from '~/common/components/SuperLoading'
import {HeaderWhite} from '~/common/components'
import ClassNotifications from './ClassNotifications'
import {useClassContext} from '~/provider'
import Examinations from './Transcript/Examinations'

const ClassDetailScreen = () => {
  const {loading, detail, schedule, curStudent} = useClassContext()
  const {user} = useGlobalContext()

  const insets = useSafeAreaInsets()
  const navigation = useNavigation<any>()

  const router: any = useRoute()
  const focused = useIsFocused()

  const [curTab, setCurTab] = useState(1)

  return (
    <View style={{backgroundColor: '#f1f1f1', flex: 1}}>
      <StatusBar barStyle="light-content" />

      <HeaderWhite>{detail?.Name}</HeaderWhite>

      <ClassMenu curTab={curTab} setCurTab={setCurTab} />

      <ScrollView>
        {curTab == 1 && <Info router={router} detail={detail} />}
        {curTab == 2 && <StudySessions router={router} detail={detail} schedule={schedule} />}
        {curTab == 3 && <Attackdance router={router} detail={detail} schedule={schedule} curStudent={curStudent} />}
        {curTab == 4 && <Document router={router} detail={detail} schedule={schedule} curStudent={curStudent} />}
        {curTab == 5 && <ClassNotifications />}
        {curTab == 6 && <Examinations />}

        <View style={{flex: 1}} />
        <View style={{height: 24}} />
      </ScrollView>

      <SuperLoading loading={loading} />
    </View>
  )
}

export default ClassDetailScreen
