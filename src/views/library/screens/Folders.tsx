import {FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Empty, GStatusBar, HeaderWhite, SuperLoading} from '~/common/components'
import RestApi from '~/api/RestApi'
import {useNavigation} from '@react-navigation/native'
import {fonts} from '~/configs'
import {Colors, Icon, windowWidth} from 'green-native-ts'

const LibraryFolders = () => {
  const nav = useNavigation<any>()

  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<Array<TFolder>>([])

  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    getData()
  }, [])

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    setLoading(true)
    try {
      const res = await RestApi.get<TFolder>('DocumentLibraryDirectory', {}, true)
      if (res.status == 200) {
        setData(res?.data?.data)
      } else {
        setData([])
      }
    } catch (error) {
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  return (
    <>
      <GStatusBar.Dark />
      <HeaderWhite>Thư viện online</HeaderWhite>

      <FlatList
        key="folders"
        data={data}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({item}: {item: TFolder}) => (
          <TouchableOpacity
            key={`folder-${item?.Id}`}
            onPress={() => nav.navigate('LibraryFiles', item)}
            activeOpacity={!!item?.TotalDocument ? 0.7 : 1}
            style={styles.folderItem}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Text style={styles.textFileName}>{item.Name}</Text>
              <View
                style={[styles.numfilesContainer, {backgroundColor: !!item?.TotalDocument ? '#1E88E5' : '#E57373'}]}>
                <Text style={styles.textNumFiles}>{item?.TotalDocument || 0} Files</Text>
              </View>
            </View>

            {!!item?.TotalDocument && (
              <Icon name="arrow-forward-ios" type="materialicons" size={16} color={Colors.trans40} />
            )}
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

export default LibraryFolders

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
