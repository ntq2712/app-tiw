import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {colors, fonts} from '~/configs'
import {Colors} from 'green-native-ts'
import {useNavigation} from '@react-navigation/native'

const XOrderItem = ({item}) => {
  const navigation = useNavigation<any>()

  return (
    <TouchableOpacity
      activeOpacity={1}
      // onPress={() => navigation.navigate('DetailOrder', {item: item})}
      style={{
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 16,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.trans10,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontFamily: fonts.Semibold, flex: 1, fontSize: 14, color: colors.primary}}>
          {item?.ShopName || 'Không xác định'}
        </Text>

        <View
          style={{
            borderRadius: 4,
            paddingHorizontal: 6,
            paddingVertical: 2,
            paddingBottom: 3,
            backgroundColor: '#CFD8DC',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontFamily: fonts.Semibold, fontSize: 10, color: '#000'}}>{item?.StatusName}</Text>
        </View>
      </View>

      <View style={{height: 1, marginVertical: 10, backgroundColor: Colors.trans05, width: '100%'}} />

      <View>
        <Text style={{fontFamily: fonts.Semibold, fontSize: 14, color: '#000'}}>Nhân viên tiếp nhận: Minh Thảo</Text>
        <Text style={{marginTop: 8, fontFamily: fonts.Semibold, fontSize: 14, color: '#000'}}>
          Loại hàng: {item?.type}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: Colors.trans05,
          borderRadius: 8,
          padding: 8,
          paddingHorizontal: 10,
          marginTop: 12,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontFamily: fonts.Semibold, fontSize: 14, color: '#000', flex: 1, marginTop: -2}}>
            Ngày gửi:
          </Text>
          <Text style={{fontFamily: fonts.Semibold, fontSize: 14, color: colors.primary}}>{item?.dateX}</Text>
        </View>
        <View style={{height: 1, backgroundColor: Colors.trans10, marginVertical: 8}}></View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontFamily: fonts.Semibold, fontSize: 14, color: '#000', flex: 1, marginTop: -2}}>
            Ngày nhận:
          </Text>
          <Text style={{fontFamily: fonts.Semibold, fontSize: 14, color: '#1E88E5'}}>{item?.dateY}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default XOrderItem

const styles = StyleSheet.create({})
