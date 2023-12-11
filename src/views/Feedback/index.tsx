import {FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Empty, GStatusBar, HeaderWhite, SuperLoading} from '~/common/components'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import RestApi from '~/api/RestApi'
import {useGlobalContext} from '~/provider'
import Timeline from 'react-native-timeline-flatlist'
import moment from 'moment'
import {fonts} from '~/configs'
import FeedbackItem from './Feedback.Item'
import {Icon} from 'green-native-ts'

const Feedback = () => {
  const {user} = useGlobalContext()

  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<Array<TFeedback>>([])

  const focused = useIsFocused()
  const navigation = useNavigation<any>()

  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await getData()
    setRefreshing(false)
  }, [])

  useEffect(() => {
    if (focused && data.length == 0) {
      getData()
    }
  }, [focused])

  async function getData() {
    setLoading(false)
    try {
      const res = await RestApi.get<TFeedback>('Feedback', {
        userIds: user?.UserInformationId,
        pageIndex: 1,
        pageSize: 9999,
      })
      if (res.status == 200) {
        setData(res.data?.data)
      } else {
        setData([])
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <GStatusBar.Dark />

      <HeaderWhite
        customRight={
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('CreateFeedback')}
            style={{alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, marginLeft: -4}}>
            <Icon type="materialcommunityicons" name="plus" color="#4CAF50" size={26} />
          </TouchableOpacity>
        }>
        Phản hồi đã gửi
      </HeaderWhite>

      {!loading && data.length == 0 && <Empty />}

      <FlatList
        key="feedbacks"
        data={data}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({item, index}: {item: TFeedback; index: number}) => (
          <FeedbackItem key={`fb-${index}`} item={item} index={index} />
        )}
        keyExtractor={(item: any) => {
          return item.Id
        }}
        ListEmptyComponent={<Empty />}
        ListFooterComponent={<View style={{height: 16}} />}
      />

      <SuperLoading loading={loading} />
    </>
  )
}

export default Feedback

const styles = StyleSheet.create({})
