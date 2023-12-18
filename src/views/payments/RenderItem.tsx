import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {fonts} from '~/configs'
import {useNavigation} from '@react-navigation/native'
import SuperLoading from '~/common/components/SuperLoading'
import {Colors, parseMoney} from 'green-native-ts'
import moment from 'moment'
import {Divider} from '~/common/components'

const RenderItem = ({item}: {item: TPayment}) => {
  const [loading, setLoading] = useState<boolean>(false)

  const navigation = useNavigation<any>()

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('PayDetail', item)}
        activeOpacity={0.7}
        style={styles.container}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <View style={{flexDirection: 'row'}}>
            <Text numberOfLines={1} style={styles.name}>
              {item?.Code}
            </Text>
            <Image
              resizeMode="contain"
              source={require('~/assets/icons/arrow-black.png')}
              style={{width: 20, height: 20}}
            />
          </View>

          <Divider marginBottom={10} />

          <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
            <View
              style={{
                paddingHorizontal: 8,
                paddingTop: 2,
                paddingBottom: 4,
                borderRadius: 999,
                backgroundColor: item?.Type == 1 ? '#E91E63' : '#009688',
              }}>
              <Text style={{fontFamily: fonts.Semibold, color: '#fff'}}>{item?.TypeName}</Text>
            </View>
            <View
              style={{
                paddingHorizontal: 8,
                paddingTop: 2,
                paddingBottom: 4,
                borderRadius: 999,
                marginLeft: 8,
                backgroundColor: Colors.trans06,
              }}>
              <Text
                style={{
                  fontFamily: fonts.Semibold,
                  color: '#000',
                }}>
                {moment(item?.CreatedOn).format('HH:mm DD/MM/YYYY')}
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 8}}>
            <Text style={{fontFamily: fonts.Semibold, color: '#000', flex: 1}}>Đã thanh toán</Text>
            <Text style={{fontFamily: fonts.Bold, color: '#4CAF50'}}>{parseMoney(item?.Paid + '')}</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 4}}>
            <Text style={{fontFamily: fonts.Semibold, color: '#000', flex: 1}}>Chưa thanh toán</Text>
            <Text style={{fontFamily: fonts.Bold, color: '#E53935'}}>{parseMoney(item?.Debt + '')}</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 4}}>
            <Text style={{fontFamily: fonts.Semibold, color: '#000', flex: 1}}>Giảm giá</Text>
            <Text style={{fontFamily: fonts.Bold, color: '#000'}}>
              {item?.Reduced > 0 ? '-' : ''}
              {parseMoney(item?.Reduced + '')}
            </Text>
          </View>

          <Divider marginBottom={8} />

          <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 4}}>
            <Text style={{fontFamily: fonts.Semibold, color: '#000', flex: 1}}>Tổng</Text>
            <Text style={{fontFamily: fonts.Bold, color: '#2196F3', fontSize: 16}}>
              {parseMoney(item?.TotalPrice + '')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <SuperLoading loading={loading} />
    </>
  )
}

export default RenderItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
  },
  name: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    color: '#0B1B19',
    flex: 1,
  },
  thumbnail: {
    backgroundColor: '#E9E9E9',
    borderRadius: 10,
    width: 90,
    height: 90,
  },
  textInfo: {
    fontFamily: fonts.Medium,
    color: '#000',
    fontSize: 14,
    marginLeft: 8,
    marginTop: -2,
  },
})
