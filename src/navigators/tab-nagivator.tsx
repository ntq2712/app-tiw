import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {isIOS} from 'green-native-ts'
import * as React from 'react'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import Tabs from '~/common/components/TabNavigator'
import {useGlobalContext} from '~/provider/AppProvider'
import ScheduleTab from '~/views/Schedule'
import ClassTab from '~/views/class'
import HomeScreen from '~/views/home'
import UserTab from '~/views/user-tab'

const Tab = createBottomTabNavigator()

function TabNavigator() {
  const {published} = useGlobalContext()
  const insets = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          return <Tabs route={route} focused={focused} />
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingHorizontal: 16,
          height: !isIOS() ? 62 : insets.bottom + 62,
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="ScheduleTab" component={ScheduleTab} />
      {published && <Tab.Screen name="ClassTab" component={ClassTab} />}
      <Tab.Screen name="User" component={UserTab} />
    </Tab.Navigator>
  )
}

export default TabNavigator
