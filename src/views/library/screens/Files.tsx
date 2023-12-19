import {FlatList, RefreshControl, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Empty, GStatusBar, HeaderWhite, SuperLoading} from '~/common/components'
import RestApi from '~/api/RestApi'
import {useRoute} from '@react-navigation/native'

import RenderFile from './RenderFile'

const LibraryFiles = () => {
  const route = useRoute<any>()

  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<Array<TLibFile>>([])

  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    getData(route?.params?.Id)
  }, [])

  useEffect(() => {
    if (route?.params) {
      getData(route?.params?.Id)
    }
  }, [route])

  async function getData(folder) {
    setLoading(true)
    try {
      const res = await RestApi.get<TLibFile>('DocumentLibrary', {directoryId: folder}, true)
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
      <HeaderWhite>{route?.params?.Name}</HeaderWhite>

      <FlatList
        key="folders"
        data={data}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({item, index}: {item: TLibFile; index: number}) => (
          <RenderFile key={`folder-${item?.Id}`} file={item} index={index} />
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

export default LibraryFiles
