import * as React from 'react'
import {Text, View} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Tabs from '~/common/components/TabNavigator'
import HomeScreen from '~/views/home'
import UserTab from '~/views/user-tab'
import SearchTab from '~/views/search-tab'
import CartTab from '~/views/cart'
import {isIOS} from 'green-native-ts'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useGlobalContext} from '~/provider/AppProvider'

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  )
}

const Tab = createBottomTabNavigator()

function TabNavigator() {
  const {isProd} = useGlobalContext()
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
      {isProd && <Tab.Screen name="Search" component={SearchTab} />}
      {isProd && <Tab.Screen name="Cart" component={CartTab} />}
      <Tab.Screen name="User" component={UserTab} />
    </Tab.Navigator>
  )
}

export default TabNavigator
