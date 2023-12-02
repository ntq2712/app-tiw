import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {colors, fonts} from '~/configs'
import {Colors, Icon} from 'green-native-ts'

function TabIcon({thisTab, curTab, setCurTab, children, title}) {
  return (
    <TouchableOpacity
      onPress={() => curTab !== thisTab && setCurTab(thisTab)}
      activeOpacity={curTab == thisTab ? 1 : 0.7}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        paddingVertical: 6,
        backgroundColor: curTab == thisTab ? colors.primary : Colors.transparent,
        borderRadius: 99,
        flex: curTab == thisTab ? null : 1,
      }}>
      {children}
      {curTab == thisTab && (
        <Text
          numberOfLines={1}
          style={{marginLeft: 6, color: '#fff', fontFamily: fonts.Semibold, fontSize: 16, marginTop: -1}}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}

const ClassMenu = ({curTab, setCurTab}) => {
  return (
    <View
      style={{
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 99,
        margin: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <TabIcon title="Thông tin" thisTab={1} curTab={curTab} setCurTab={setCurTab}>
        <Icon
          type="fontawesome5"
          name="info-circle"
          size={curTab == 1 ? 18 : 20}
          color={curTab == 1 ? '#fff' : '#000'}
        />
      </TabIcon>

      <TabIcon title="Buổi học" thisTab={2} curTab={curTab} setCurTab={setCurTab}>
        <Icon
          type="materialcommunityicons"
          name="clipboard-list"
          size={curTab == 2 ? 18 : 21}
          color={curTab == 2 ? '#fff' : '#000'}
        />
      </TabIcon>

      <TabIcon title="Điểm danh" thisTab={3} curTab={curTab} setCurTab={setCurTab}>
        <Icon
          type="fontawesome5"
          name="calendar-check"
          size={curTab == 3 ? 16 : 20}
          color={curTab == 3 ? '#fff' : '#000'}
        />
      </TabIcon>

      <TabIcon title="Tài liệu" thisTab={4} curTab={curTab} setCurTab={setCurTab}>
        <Icon type="fontawesome5" name="book-open" size={curTab == 4 ? 14 : 18} color={curTab == 4 ? '#fff' : '#000'} />
      </TabIcon>

      {/* <TabIcon title="Thông báo" thisTab={5} curTab={curTab} setCurTab={setCurTab}>
        <Icon type="ionicons" name="notifications" size={curTab == 5 ? 16 : 20} color={curTab == 5 ? '#fff' : '#000'} />
      </TabIcon> */}
    </View>
  )
}

export default ClassMenu

const styles = StyleSheet.create({})
