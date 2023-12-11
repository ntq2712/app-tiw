import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {FC, useState} from 'react'
import moment from 'moment'
import {fonts} from '~/configs'
import {Colors, Icon} from 'green-native-ts'
import {Divider, SuperLoading} from '~/common/components'
import GreenAvatar from '~/common/components/Avatar'
import RestApi from '~/api/RestApi'
import {useGlobalContext} from '~/provider'

type TFeedbackItem = {
  item?: TFeedback & {CreatedIdBy: number}
  index?: number
  hideDelete?: boolean

  onRefresh?: Function
}

const FeedbackDetailItem: FC<TFeedbackItem> = props => {
  const {item, onRefresh, hideDelete} = props

  const [loading, setLoading] = useState<boolean>(false)

  async function deleteThis() {
    setLoading(true)
    try {
      const res = await RestApi.delete('FeedbackReply', item?.Id)
      if (res.status == 200) {
        onRefresh && onRefresh()
      }
    } catch (error) {
      Alert.alert('Lỗi', error?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  function deleteReply() {
    Alert.alert('Xoá tin', `${item?.Content}`, [
      {
        text: 'Huỷ',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteThis()},
    ])
  }

  const {user} = useGlobalContext()

  return (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor: '#fff',
        margin: 16,
        padding: 16,
        borderRadius: 6,
        marginTop: 0,
      }}>
      {item?.CreatedIdBy == user?.UserInformationId && !hideDelete && (
        <View style={{height: 30, marginBottom: -30, zIndex: 999, alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={deleteReply} activeOpacity={0.7}>
            <Icon type="fontawesome" name="trash-o" color="#F44336" />
          </TouchableOpacity>
        </View>
      )}

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <GreenAvatar source={item?.Avatar} />
        <View style={{marginLeft: 16}}>
          <Text style={{fontSize: 14, fontFamily: fonts.Bold, color: '#000'}}>{item?.CreatedBy}</Text>
          <Text style={styles.textDate}>{moment(item?.CreatedOn).format('HH:mm DD/MM/YYYY')}</Text>
        </View>
      </View>

      <Divider marginVertical={16} marginBottom={8} />

      <Text style={{fontSize: 14, fontFamily: fonts.Regular, color: '#000'}}>{item?.Content}</Text>

      <SuperLoading loading={loading} />
    </View>
  )
}

export default FeedbackDetailItem

const styles = StyleSheet.create({
  textDate: {fontFamily: fonts.Regular, color: Colors.trans50},
})
