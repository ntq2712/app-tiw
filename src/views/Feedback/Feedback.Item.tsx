import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {FC} from 'react'
import moment from 'moment'
import {fonts} from '~/configs'
import {Colors, Icon} from 'green-native-ts'
import {Divider} from '~/common/components'
import {useNavigation} from '@react-navigation/native'
import {Rating} from 'react-native-ratings'

type TFeedbackItem = {
  item?: TFeedback
  index?: number
}

const FeedbackItem: FC<TFeedbackItem> = props => {
  const {item, index} = props

  const navigation = useNavigation<any>()

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate('FeedbackDetail', item)}
      style={[styles.container, {marginBottom: index == 0 ? 0 : 16}]}>
      <View style={styles.itemHeader}>
        <Text style={styles.textDate}>{moment(item?.CreatedOn).format('HH:mm DD/MM/YYYY')}</Text>
        <View
          style={[
            styles.statusTag,
            {
              backgroundColor: item?.Status == 1 ? '#0A89FF' : item?.Status == 2 ? '#FFBA0A' : '#4CAF50',
            },
          ]}>
          <Text style={{fontSize: 12, fontFamily: fonts.Regular, color: item?.Status == 2 ? '#000' : '#FFF'}}>
            {item?.StatusName}
          </Text>
        </View>
      </View>

      <Divider marginVertical={16} />

      {item?.IsIncognito ? (
        <View style={{alignItems: 'flex-start', marginBottom: 8}}>
          <View
            style={[
              styles.statusTag,
              {backgroundColor: Colors.trans10, paddingTop: 3, flexDirection: 'row', alignItems: 'center'},
            ]}>
            <Icon type="fontawesome" name="user-secret" color="#000" size={12} />
            <Text style={{fontSize: 12, fontFamily: fonts.Medium, color: '#000', marginLeft: 4}}>Ẩn danh</Text>
          </View>
        </View>
      ) : (
        <></>
      )}

      <Text style={{fontFamily: fonts.Bold, color: '#000', fontSize: 16}}>{item?.Title}</Text>
      <Text style={{fontFamily: fonts.Regular, color: '#000', marginTop: 8}}>{item?.Content}</Text>

      {item?.StarRating ? (
        <>
          <Divider marginVertical={16} />
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: fonts.Medium, color: '#000'}}>Đánh giá</Text>
            <Rating jumpValue={1} ratingCount={5} imageSize={20} startingValue={item?.StarRating} readonly />
          </View>
        </>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  )
}

export default FeedbackItem

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
