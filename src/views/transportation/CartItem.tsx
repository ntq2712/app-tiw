import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useState, useEffect} from 'react'
import {Colors, isIOS, parseMoney, windowWidth} from 'green-native-ts'
import {colors, fonts} from '~/configs'
import moment from 'moment'
import {useNavigation} from '@react-navigation/native'

export function getTransColor(params) {
  switch (params) {
    case 0:
      return '#E53935' // red

    case 1:
      return '#795548' // orange

    case 2:
      return '#0097A7' //

    case 3:
      return '#1E88E5' // blue

    case 4:
      return '#5E35B1'

    case 5:
      return '#00897B' //

    case 6:
      return '#9C27B0' // purple

    case 7:
      return '#43A047' // green

    default:
      break
  }
}

const TransCartItem = props => {
  const {item, index} = props

  const navigation = useNavigation<any>()

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('DetailTrans', {item: item})}
        style={styles.container}>
        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
          <View
            style={{
              paddingHorizontal: 6,
              paddingVertical: 2,
              paddingBottom: 3,
              borderRadius: 6,
              backgroundColor: colors.primary,
            }}>
            <Text style={{fontFamily: fonts.Semibold, color: '#fff'}}>Mã: {item?.Id}</Text>
          </View>
          <Text style={{fontFamily: fonts.Semibold, color: getTransColor(item?.Status)}}>{item?.StatusName}</Text>
        </View>

        <View
          style={{
            borderTopWidth: 1,
            width: '100%',
            borderColor: Colors.trans10,
            borderStyle: isIOS() ? 'solid' : 'dashed',
            marginVertical: 16,
          }}
        />

        <View style={[styles.itemNum, {marginTop: 0}]}>
          <Text style={{fontFamily: fonts.Semibold, color: '#000'}}>Ngày</Text>
          <Text style={{fontFamily: fonts.Semibold, color: '#000'}}>
            {moment(item?.CreatedDate).format('HH:mm DD/MM/YYYY')}
          </Text>
        </View>

        <View
          style={{
            borderTopWidth: 1,
            width: '100%',
            borderColor: Colors.trans10,
            borderStyle: isIOS() ? 'solid' : 'dashed',
            marginVertical: 16,
          }}
        />

        <View style={[styles.itemNum, {marginTop: 0}]}>
          <Text style={{fontFamily: fonts.Semibold, color: '#000'}}>Số kiện</Text>
          <Text style={{fontFamily: fonts.Semibold, color: '#000'}}>{item?.TotalPackage}</Text>
        </View>

        <View style={styles.itemNum}>
          <Text style={{fontFamily: fonts.Semibold, color: '#000'}}>Tổng trọng lượng</Text>
          <Text style={{fontFamily: fonts.Semibold, color: '#000'}}>{item?.TotalWeight} Kg</Text>
        </View>

        <View style={styles.itemNum}>
          <Text style={{fontFamily: fonts.Semibold, color: '#000'}}>Tổng tiền:</Text>
          <Text style={{fontFamily: fonts.Semibold, color: '#000'}}>{parseMoney(item?.TotalPriceVND)}</Text>
        </View>
      </TouchableOpacity>
    </>
  )
}

export default TransCartItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: windowWidth - 32,
    marginLeft: 16,
    marginTop: 16,
    borderRadius: 8,
    padding: 16,
    alignItems: 'flex-start',
  },
  itemNum: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
    justifyContent: 'space-between',
  },
})
