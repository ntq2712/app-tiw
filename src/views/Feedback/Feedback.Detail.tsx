import {Alert, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {FC, useEffect, useState} from 'react'
import moment from 'moment'
import {fonts} from '~/configs'
import {Colors} from 'green-native-ts'
import {Divider, Empty, GStatusBar, HeaderWhite} from '~/common/components'
import {useRoute} from '@react-navigation/native'
import RestApi from '~/api/RestApi'
import MyTextArea from '~/common/components/GTextArea/MyTextArea'
import Button from '~/common/components/Button'
import GreenAvatar from '~/common/components/Avatar'
import {RefreshControl} from 'react-native'
import FeedbackDetailItem from './Feedback.Detail.Item'
import ModalCentered from '~/common/components/ModalCentered'
import {Rating} from 'react-native-ratings'

type TFeedbackItem = {
  item?: TFeedback
  index?: number
}

const FeedbackDetail = props => {
  // const {item, index} = props

  const router = useRoute<any>()

  const [thisItem, setThisItem] = useState<TFeedback>(null)

  const [detail, setDetail] = useState<TFeedback>(null)

  console.log('--- thisItem: ', thisItem)

  useEffect(() => {
    if (router?.params) {
      setThisItem(router?.params)
      getDetails(router?.params?.Id)
      getMessage(router?.params?.Id)
    }
  }, [router])

  async function getDetails(id) {
    try {
      const res = await RestApi.getBy<TFeedback>('Feedback', id)
      if (res.status == 200) {
        setDetail(res?.data?.data)
      }
    } catch (error) {}
  }

  const [replyData, setReplyData] = useState([])

  async function getMessage(id) {
    try {
      const res = await RestApi.get<any>('FeedbackReply', {
        pageIndex: 1,
        pageSize: 9999,
        FeedbackId: id,
      })
      if (res.status == 200) {
        setReplyData(res?.data?.data)
      }
    } catch (error) {}
  }

  const [submiting, setSubmiting] = useState<boolean>(false)
  const [contentChat, setContentChat] = useState<string>('')

  async function submitChat() {
    setSubmiting(true)
    try {
      const res = await RestApi.post('FeedbackReply', {
        Content: contentChat,
        FeedbackId: detail?.Id,
      })
      if (res.status == 200) {
        getMessage(detail?.Id)
        setContentChat('')
      }
    } catch (error) {
      Alert.alert('Lỗi', error?.data?.message)
    } finally {
      setSubmiting(false)
    }
  }

  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await getMessage(detail?.Id)
    setRefreshing(false)
  }, [])

  const [star, setStar] = useState<number>(5)
  const [visible, setVisible] = useState<boolean>(false)

  const [rating, setRating] = useState<boolean>(false)

  async function rateThisFB() {
    setRating(true)
    try {
      const res = await RestApi.put(`Feedback/rating-feedback/${detail?.Id}?rating=${star}`, {})
      if (res.status == 200) {
        getDetails(detail?.Id)
        setVisible(false)
      }
    } catch (error) {
      Alert.alert('Lỗi', error?.data?.message)
    } finally {
      setRating(false)
    }
  }

  return (
    <>
      <GStatusBar.Dark />
      <HeaderWhite>Chi tiết</HeaderWhite>

      <FlatList
        key={`fb-detail`}
        data={replyData}
        ListHeaderComponent={
          <>
            <View style={[styles.container, {}]}>
              <View style={styles.itemHeader}>
                <Text style={styles.textDate}>{moment(thisItem?.CreatedOn).format('HH:mm DD/MM/YYYY')}</Text>
                <View
                  style={[
                    styles.statusTag,
                    {
                      backgroundColor: detail?.Status == 1 ? '#0A89FF' : detail?.Status == 2 ? '#FFBA0A' : '#4CAF50',
                    },
                  ]}>
                  <Text style={{fontSize: 12, fontFamily: fonts.Regular, color: detail?.Status == 2 ? '#000' : '#FFF'}}>
                    {detail?.StatusName}
                  </Text>
                </View>
              </View>

              <Divider marginVertical={16} />

              <Text style={{fontFamily: fonts.Bold, color: '#000', fontSize: 16}}>{thisItem?.Title}</Text>
              <Text style={{fontFamily: fonts.Regular, color: '#000', marginTop: 8}}>{thisItem?.Content}</Text>

              <Divider marginVertical={16} />

              <Rating
                jumpValue={1}
                ratingCount={5}
                imageSize={36}
                startingValue={detail?.StarRating || star}
                onFinishRating={e => setStar(e)}
              />

              <Button
                loading={rating}
                onPress={rateThisFB}
                style={{height: 40, backgroundColor: '#2196F3', marginTop: 16}}>
                Đánh giá
              </Button>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginBottom: 8,
                marginTop: -4,
                alignItems: 'center',
                paddingHorizontal: 16,
              }}>
              <Divider />
            </View>

            {detail?.Status !== 3 && (
              <View style={[styles.container, {marginTop: 0}]}>
                <MyTextArea disabled={submiting} value={contentChat} onChangeText={e => setContentChat(e)} />

                <Button
                  loading={submiting}
                  onPress={submitChat}
                  disabled={!contentChat}
                  style={{height: 40, backgroundColor: '#2196F3', marginTop: 16}}>
                  Gửi đoạn chat
                </Button>
              </View>
            )}
          </>
        }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({item, index}: {item: TFeedback & {CreatedIdBy: number}; index: number}) => (
          <FeedbackDetailItem
            key={`fb-de-rep-${index}`}
            onRefresh={() => getMessage(detail?.Id)}
            item={item}
            index={index}
            hideDelete={detail?.Status == 3}
          />
        )}
        keyExtractor={(item: any) => {
          return item.Id
        }}
        ListEmptyComponent={<View style={{paddingLeft: 16}}></View>}
        ListFooterComponent={<View style={{height: 16}} />}
      />
    </>
  )
}

export default FeedbackDetail

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 6,
  },
  itemHeader: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  textDate: {fontFamily: fonts.Regular, color: Colors.trans50},
  statusTag: {
    paddingHorizontal: 8,
    paddingTop: 1,
    paddingBottom: 2,
    borderRadius: 99,
  },
})
