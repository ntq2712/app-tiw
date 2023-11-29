import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {colors, fonts} from '~/configs'
import {Colors, Icon, parseMoney} from 'green-native-ts'
import moment from 'moment'
import {useNavigation} from '@react-navigation/native'
import {useGlobalContext} from '~/provider/AppProvider'

const OrderItem = ({item}) => {
  function getStatusColor() {
    if (item?.Status == 0) {
      return {
        bg: '#FFE082',
        text: 'black',
      }
    }

    if (item?.Status == 1) {
      return {
        bg: '#EF9A9A',
        text: 'black',
      }
    }

    if (item?.Status == 2) {
      return {
        bg: '#DCE775',
        text: 'black',
      }
    }

    if (item?.Status == 3) {
      return {
        bg: '#DCE775',
        text: 'black',
      }
    }

    if (item?.Status == 4) {
      return {
        bg: '#FFAB91',
        text: 'black',
      }
    }

    if (item?.Status == 5) {
      return {
        bg: '#A5D6A7',
        text: 'black',
      }
    }

    if (item?.Status == 6) {
      return {
        bg: '#80CBC4',
        text: 'black',
      }
    }

    if (item?.Status == 7) {
      return {
        bg: '#4DD0E1',
        text: 'black',
      }
    }

    if (item?.Status == 8) {
      return {
        bg: '#B3E5FC',
        text: 'black',
      }
    }

    if (item?.Status == 9) {
      return {
        bg: '#D1C4E9',
        text: 'black',
      }
    }

    if (item?.Status == 10) {
      return {
        bg: '#F8BBD0',
        text: 'black',
      }
    }

    if (item?.Status == 11) {
      return {
        bg: '#D7CCC8',
        text: 'black',
      }
    }

    if (item?.Status == 12) {
      return {
        bg: '#D7CCC8',
        text: 'black',
      }
    }

    return {
      bg: Colors.trans10,
      text: '#000',
    }
  }

  const {isProd} = useGlobalContext()

  const navigation = useNavigation<any>()

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate('DetailOrder', {item: item})}
      style={{backgroundColor: '#fff', marginHorizontal: 16, marginTop: 16, padding: 16, borderRadius: 12}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon type="Entypo" name="shop" size={18} color="#000" />
        <Text style={{fontFamily: fonts.Semibold, flex: 1, marginLeft: 8, fontSize: 14, color: colors.primary}}>
          {item?.ShopName || 'Không xác định'}
        </Text>
        <View
          style={{
            borderRadius: 6,
            paddingHorizontal: 4,
            paddingVertical: 2,
            backgroundColor: '#ff5406',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontFamily: fonts.Semibold, fontSize: 10, color: '#fff'}}>Piget</Text>
        </View>
      </View>

      <View style={{height: 1, marginVertical: 10, backgroundColor: Colors.trans05, width: '100%'}} />

      <View style={{flexDirection: 'row', flex: 1, alignItems: 'flex-start'}}>
        <View style={{backgroundColor: Colors.trans05, width: 50, height: 50, borderRadius: 8}}>
          {item?.ImageModel && (
            <Image
              source={{uri: item?.ImageModel.includes('http') ? item?.ImageModel : ''}}
              resizeMode="contain"
              style={{width: 50, height: 50, borderRadius: 8}}
            />
          )}
        </View>

        <View style={{flex: 1, marginLeft: 8, alignItems: 'flex-start'}}>
          <Text
            style={{
              fontFamily: fonts.Semibold,
              fontSize: 14,
              color: '#000',
              flex: 1,
            }}>
            {item?.Id || 'không xác định'}
          </Text>

          <View
            style={{
              backgroundColor: getStatusColor().bg,
              paddingHorizontal: 6,
              borderRadius: 6,
              marginTop: 8,
              padding: 2,
            }}>
            <Text
              style={{
                fontFamily: fonts.Medium,
                fontSize: 12,
                color: getStatusColor().text,
                marginTop: -0,
                paddingBottom: 2,
              }}>
              {item?.StatusName || 'Không xác định'}
            </Text>
          </View>
        </View>
      </View>

      <View style={{marginTop: 8}}>
        <Text
          style={{
            fontFamily: fonts.Semibold,
            fontSize: 14,
            color: '#000',
          }}>
          Phải cọc: {parseMoney(item?.AmountDeposit) || ''}
        </Text>

        <Text
          style={{
            fontFamily: fonts.Semibold,
            fontSize: 14,
            color: '#000',
          }}>
          Đã cọc: {parseMoney(item?.Deposit) || ''}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          backgroundColor: Colors.trans05,
          borderRadius: 8,
          padding: 8,
          paddingHorizontal: 10,
          marginTop: 8,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: fonts.Semibold,
            fontSize: 14,
            color: '#000',
            flex: 1,
            marginTop: -2,
          }}>
          {moment(new Date(item?.CreatedDate)).format('HH:mm DD/MM/YYYY')}
        </Text>

        <Text
          style={{
            fontFamily: fonts.Semibold,
            fontSize: 14,
            color: colors.primary,
          }}>
          Tổng: {parseMoney(item?.TotalPriceVND || 0) || ''}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default OrderItem

const styles = StyleSheet.create({})
