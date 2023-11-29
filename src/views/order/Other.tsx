import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect} from 'react'
import {colors, fonts} from '~/configs'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Colors, Icon, isIOS} from 'green-native-ts'
import {useGlobalContext} from '~/provider/AppProvider'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import AllOrders from './All'

const Tab = createMaterialTopTabNavigator()

const OtherOrders = () => {
  const insets = useSafeAreaInsets()

  const {orderOtherStatus, getOrders, getCarts} = useGlobalContext()

  const focused = useIsFocused()

  useEffect(() => {
    if (focused) {
      getOrders()
    } else {
      getOrders()
    }
  }, [focused])

  const navigation = useNavigation<any>()

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" />

      <View style={[{paddingTop: isIOS() ? insets.top + 4 : insets.top + 12}, styles.headerContainer]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
          }}>
          <Icon type="MaterialIcons" name="arrow-back-ios" color="#fff" size={20} />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.headerTitle}>Đơn TMĐT Khác</Text>
        </View>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
            opacity: 0,
          }}>
          <Icon type="MaterialIcons" name="arrow-back-ios" color="#fff" size={20} />
        </TouchableOpacity>
      </View>

      {orderOtherStatus.length > 0 && (
        <Tab.Navigator
          screenOptions={{
            tabBarPressColor: Colors.transparent,
            tabBarShowLabel: true,
            tabBarActiveTintColor: '#fff',
            tabBarLabelStyle: {},
            tabBarIndicatorStyle: {backgroundColor: Colors.transparent},
            tabBarStyle: {height: 52},
            tabBarScrollEnabled: true,
          }}>
          {orderOtherStatus.map((oStatus, indexOS) => {
            return (
              <Tab.Screen
                name={oStatus?.StatusName}
                options={{
                  swipeEnabled: false,
                  tabBarLabel: e => {
                    return (
                      <View
                        style={{
                          backgroundColor: e?.color == 'blue' ? colors.primary : Colors.trans10,
                          borderRadius: 100,
                          marginTop: 4,
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: fonts.Semibold,
                            textTransform: 'none',
                            marginTop: 2,
                            color: e?.color == 'blue' ? '#fff' : '#000',
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            paddingTop: 6,
                            borderRadius: 100,
                          }}>
                          {oStatus?.StatusName} ({oStatus?.Amount})
                        </Text>
                      </View>
                    )
                  },
                  tabBarPressOpacity: 0.7,
                  tabBarItemStyle: {
                    marginLeft: 8,
                    width: 'auto',
                    padding: 0,
                    borderRadius: 100,
                  },
                  tabBarActiveTintColor: 'blue',
                }}
                component={() => <AllOrders isOther status={oStatus?.Status} />}
              />
            )
          })}
        </Tab.Navigator>
      )}
    </View>
  )
}

export default OtherOrders

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingBottom: 12,
  },
  headerTitle: {fontFamily: fonts.Bold, fontSize: 20, color: '#fff'},
})
