import {FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {useGlobalContext} from '~/provider'
import {Empty, GStatusBar, HeaderWhite, SuperLoading} from '~/common/components'
import {Colors, Icon, windowWidth} from 'green-native-ts'
import {fonts} from '~/configs'
import GreenAvatar from '~/common/components/Avatar'
import {useNavigation} from '@react-navigation/native'

const SelectStudent = () => {
  const {curChildren, setCurChildren, childrens, is, getMyChildrens} = useGlobalContext()

  const [refreshing, setRefreshing] = React.useState(false)
  const [loading, setLoading] = useState<boolean>(false)

  if (!is.parent) {
    return <></>
  }

  async function onRefresh() {
    setRefreshing(true)
    await getMyChildrens()
    setRefreshing(false)
  }

  const navigation = useNavigation<any>()

  return (
    <>
      <GStatusBar.Dark />
      <HeaderWhite>Chọn học viên</HeaderWhite>

      <FlatList
        key="students"
        data={childrens || []}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({item}: {item: IUser}) => {
          const activated = curChildren?.UserInformationId == item?.UserInformationId

          return (
            <TouchableOpacity
              key={`st-${item?.UserInformationId}`}
              onPress={() => {
                setCurChildren(item)
                navigation.goBack()
              }}
              activeOpacity={1}
              style={[
                styles.folderItem,
                {
                  borderWidth: 1,
                  borderColor: activated ? '#1E88E5' : '#fff',
                },
              ]}>
              <GreenAvatar source={item?.Avatar} />

              <View style={{flex: 1, marginLeft: 8, alignItems: 'flex-start'}}>
                <Text numberOfLines={1} style={{fontSize: 14, fontFamily: fonts.Bold, color: '#000'}}>
                  {item?.FullName}
                </Text>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      backgroundColor: '#1E88E5',
                      paddingHorizontal: 6,
                      paddingVertical: 1,
                      borderRadius: 99,
                      marginTop: 4,
                      paddingBottom: 1.5,
                    }}>
                    <Text numberOfLines={1} style={{fontSize: 12, fontFamily: fonts.Bold, color: '#fff'}}>
                      {item?.UserCode}
                    </Text>
                  </View>

                  {activated ? (
                    <View
                      style={{
                        backgroundColor: '#E91E63',
                        paddingHorizontal: 6,
                        paddingVertical: 1,
                        borderRadius: 99,
                        marginTop: 4,
                        marginLeft: 8,
                        paddingBottom: 1.5,
                      }}>
                      <Text numberOfLines={1} style={{fontSize: 12, fontFamily: fonts.Bold, color: '#fff'}}>
                        Đã chọn
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                </View>
              </View>

              <Icon name="arrow-forward-ios" type="materialicons" size={16} color={Colors.trans40} />
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item: any) => {
          return item?.Id
        }}
        ListEmptyComponent={<Empty />}
        ListFooterComponent={<View style={{height: 16}} />}
      />

      <SuperLoading loading={loading} />
    </>
  )
}

export default SelectStudent

const styles = StyleSheet.create({
  folderItem: {
    width: windowWidth - 32,
    marginLeft: 16,
    backgroundColor: '#fff',
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textFileName: {
    color: '#000',
    fontFamily: fonts.Medium,
    fontSize: 16,
  },
  textNumFiles: {
    color: '#fff',
    fontFamily: fonts.Bold,
    fontSize: 14,
    marginTop: -1,
  },
  numfilesContainer: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 999,
  },
})
