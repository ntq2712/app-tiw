import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {fonts} from '~/configs'
import {Colors, Icon} from 'green-native-ts'
import moment from 'moment'
import {useNavigation} from '@react-navigation/native'

const NotiItem = ({item}) => {
  const navigation = useNavigation<any>()

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        // if (item?.NotifType == 1) {
        //   navigation.navigate('DetailOrder', {item: {Id: item.MainOrderId, Source: 'Noti'}})
        // }
      }}
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 16,
        padding: 16,
        borderRadius: 12,
        paddingRight: 8,
      }}>
      <View style={{flex: 1}}>
        <Text style={{color: Colors.trans50, marginBottom: 4, fontFamily: fonts.Regular}}>
          {moment(new Date(item?.CreatedOn)).format('HH:mm DD/MM/YYYY')}
        </Text>
        <Text style={{color: '#000', marginBottom: 4, fontFamily: fonts.Semibold, fontSize: 16}}>{item?.Title}</Text>
        <Text style={{color: '#000', fontFamily: fonts.Regular, fontSize: 14}}>{item?.Content}</Text>
      </View>

      {item?.NotifType == 1 && <Icon type="MaterialIcons" name="chevron-right" size={22} color={Colors.trans50} />}
    </TouchableOpacity>
  )
}

export default NotiItem

const styles = StyleSheet.create({})
