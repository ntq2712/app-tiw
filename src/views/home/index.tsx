import {ScrollView, View} from 'react-native'
import React, {useEffect} from 'react'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import {useGlobalContext} from '~/provider/AppProvider'
import {GStatusBar} from '~/common/components'
import HomeHeader from './components/Header'
import HomeMenu from './components/Menu'
import ScheduleBlock from './components/ScheduleBlock'
import ClassBlock from './components/ClassBlock'
import FilterStudent from '~/common/components/FilterStudent'

const HomeScreen = () => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<any>()
  const focused = useIsFocused()

  const {user, isProd, getConfigs, getNotifications} = useGlobalContext()

  useEffect(() => {
    if (focused) {
      getNotifications()
      getConfigs()
    }
  }, [focused])

  return (
    <>
      <GStatusBar.Light />

      <HomeHeader />

      <ScrollView style={{flex: 1, backgroundColor: null}}>
        <FilterStudent />

        <View>
          <HomeMenu />

          <ScheduleBlock />

          <ClassBlock />
        </View>

        <View style={{height: 24}} />
      </ScrollView>
    </>
  )
}

export default HomeScreen
