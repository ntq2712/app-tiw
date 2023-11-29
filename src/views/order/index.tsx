import {StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {colors, fonts} from '~/configs'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Colors, Icon, isIOS} from 'green-native-ts'
import {useGlobalContext} from '~/provider/AppProvider'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import AllOrders from './All'
import Spinner from 'react-native-loading-spinner-overlay'
import SearchOrders from './SearchOrder'

const Tab = createMaterialTopTabNavigator()

const Orders = () => {
  const insets = useSafeAreaInsets()

  const {orderStatus, getOrders, getCarts, getConfigs} = useGlobalContext()

  const [isShowSearch, setIsShowSearch] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const focused = useIsFocused()

  useEffect(() => {
    if (focused) {
      getOrders()
      getConfigs()
      getCarts()
    }
  }, [focused])

  const navigation = useNavigation<any>()

  async function handleSearch() {
    setLoading(true)
    await getOrders(searchText)
    setLoading(false)
  }

  async function closeSearch() {
    setLoading(true)
    getOrders()
    setIsShowSearch(false)
    setLoading(false)
  }

  function handleClickLeft() {
    isShowSearch ? closeSearch() : navigation.goBack()
  }

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" />

      <View style={[{paddingTop: isIOS() ? insets.top + 2 : insets.top + 12}, styles.headerContainer]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleClickLeft}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
            width: 48,
            height: 30,
          }}>
          {isShowSearch && <Icon type="Ionicons" name="close" color="#fff" size={20} />}
          {!isShowSearch && <Icon type="MaterialIcons" name="arrow-back-ios" color="#fff" size={20} />}
        </TouchableOpacity>

        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {!isShowSearch && <Text style={styles.headerTitle}>Danh sách đơn</Text>}
          {isShowSearch && (
            <View style={{height: 32, backgroundColor: '#fff', width: '100%', borderRadius: 6}}>
              <TextInput
                placeholder="Tìm theo mã"
                placeholderTextColor={Colors.trans30}
                defaultValue={searchText}
                onChangeText={e => setSearchText(e)}
                style={{
                  padding: 0,
                  height: 34,
                  marginTop: -1,
                  width: '100%',
                  borderRadius: 6,
                  fontSize: 14,
                  paddingHorizontal: 8,
                  color: '#000',
                }}
                onEndEditing={handleSearch}
              />
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => (isShowSearch ? handleSearch() : setIsShowSearch(!isShowSearch))}
          activeOpacity={0.7}
          style={{alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, width: 48, height: 30}}>
          <Icon type="Ionicons" name="search" color="#fff" size={19} />
        </TouchableOpacity>
      </View>

      {!isShowSearch && (
        <>
          {orderStatus.length > 0 && (
            <Tab.Navigator
              screenOptions={{
                tabBarPressColor: Colors.transparent,
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#fff',
                tabBarLabelStyle: {borderRadius: 9999},
                tabBarIndicatorStyle: {backgroundColor: Colors.transparent},
                tabBarStyle: {height: 52},
                tabBarScrollEnabled: true,
                tabBarPressOpacity: 1,
              }}>
              {orderStatus.map((oStatus, indexOS, x) => {
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
                                marginTop: 3,
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
                    component={() => <AllOrders status={oStatus?.Status} />}
                  />
                )
              })}
            </Tab.Navigator>
          )}
        </>
      )}

      {isShowSearch && <SearchOrders />}

      <Spinner visible={loading} textContent="Đang tải.." textStyle={{color: '#fff'}} />
    </View>
  )
}

export default Orders

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
