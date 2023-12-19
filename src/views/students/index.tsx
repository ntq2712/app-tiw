import {FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {useGlobalContext} from '~/provider'
import {Empty, GStatusBar, HeaderWhite, SuperLoading} from '~/common/components'
import {Colors, Icon, windowWidth} from 'green-native-ts'
import {fonts} from '~/configs'
import GreenAvatar from '~/common/components/Avatar'

const Students = () => {
  const {user, childrens, is, getMyChildrens} = useGlobalContext()

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

  return (
    <>
      <GStatusBar.Dark />
      <HeaderWhite>Danh sách học viên</HeaderWhite>

      <FlatList
        key="students"
        data={childrens || []}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({item}: {item: IUser}) => (
          <TouchableOpacity key={`st-${item?.UserInformationId}`} activeOpacity={1} style={styles.folderItem}>
            <GreenAvatar source={item?.Avatar} />

            <View style={{flex: 1, marginLeft: 8, alignItems: 'flex-start'}}>
              <Text numberOfLines={1} style={{fontSize: 14, fontFamily: fonts.Bold, color: '#000'}}>
                {item?.FullName}
              </Text>
              <View
                style={{
                  backgroundColor: '#1E88E5',
                  paddingHorizontal: 6,
                  paddingVertical: 1,
                  borderRadius: 99,
                  paddingBottom: 1.5,
                  marginTop: 4,
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 12,
                    fontFamily: fonts.Bold,
                    color: '#fff',
                  }}>
                  {item?.UserCode}
                </Text>
              </View>
            </View>

            {/* <Icon name="arrow-forward-ios" type="materialicons" size={16} color={Colors.trans40} /> */}
          </TouchableOpacity>
        )}
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

export default Students

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
