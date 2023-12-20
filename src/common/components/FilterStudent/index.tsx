import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {Colors, Icon, windowWidth} from 'green-native-ts'
import {useGlobalContext} from '~/provider'
import GreenAvatar from '../Avatar'
import {fonts} from '~/configs'
import {useNavigation} from '@react-navigation/native'

const FilterStudent = () => {
  const {curChildren, childrens, is} = useGlobalContext()

  const navigation = useNavigation<any>()

  if (!is.parent || !childrens) {
    return <></>
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if (childrens.length > 0) {
            navigation.navigate('SelectStudent')
          }
        }}
        activeOpacity={childrens.length > 1 ? 0.7 : 1}
        style={{
          width: windowWidth - 32,
          marginLeft: 16,
          marginTop: 16,
          padding: 12,
          borderRadius: 8,
          backgroundColor: '#fff',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <GreenAvatar
          source={curChildren?.Avatar}
          imageProps={{
            style: {width: 36, height: 36},
          }}
        />

        <View style={{flex: 1, marginLeft: 8, alignItems: 'flex-start'}}>
          <Text numberOfLines={1} style={{fontSize: 14, fontFamily: fonts.Bold, color: '#000'}}>
            {curChildren?.FullName}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: '#1E88E5',
                paddingHorizontal: 6,
                paddingVertical: 1,
                borderRadius: 99,
                marginTop: 4,
                paddingBottom: 1.5,
              }}>
              <Text numberOfLines={1} style={{fontSize: 11, fontFamily: fonts.Bold, color: '#fff'}}>
                Đang chọn
              </Text>
            </View>
          </View>
        </View>

        <View>
          <Icon name="arrow-drop-up" type="materialicons" size={26} color={Colors.trans50} />
          <Icon name="arrow-drop-down" type="materialicons" size={26} style={{marginTop: -18}} color={Colors.trans50} />
        </View>
      </TouchableOpacity>
    </>
  )
}

export default FilterStudent

const styles = StyleSheet.create({})
