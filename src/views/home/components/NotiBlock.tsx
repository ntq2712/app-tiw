import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'
import {fonts} from '~/configs'
import {useGlobalContext} from '~/provider'
import {useNavigation} from '@react-navigation/native'

const NotiBlock = () => {
  const {notifications} = useGlobalContext()

  const navigation = useNavigation<any>()

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('NotiScreen')}
        activeOpacity={0.7}
        style={{
          position: 'relative',
          width: 38,
          height: 38,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 16,
          borderRadius: 9999,
        }}>
        <Image style={styles.iconNoti} source={require('~/assets/icons/bell.png')} resizeMode="contain" />
        {notifications?.length > 0 && (
          <View style={styles.notiBadge}>
            <Text style={styles.textNoti}>{notifications?.length > 98 ? 99 : notifications?.length || 0}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default NotiBlock

const styles = StyleSheet.create({
  iconNoti: {width: 24, height: 24},
  textNoti: {
    fontFamily: fonts.Bold,
    fontSize: 8,
    color: '#393D48',
  },
  notiBadge: {
    borderRadius: 999,
    width: 16,
    height: 16,
    backgroundColor: '#FCD34D',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 4,
    right: 4,
  },
})
