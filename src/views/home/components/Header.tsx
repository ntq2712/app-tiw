import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {colors, fonts} from '~/configs'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useGlobalContext} from '~/provider'
import GreenAvatar from '~/common/components/Avatar'
import RoleBlock from './RoleBlock'
import NotiBlock from './NotiBlock'
import {useNavigation} from '@react-navigation/native'

const HomeHeader = () => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<any>()

  const {user} = useGlobalContext()

  return (
    <LinearGradient
      start={{x: 0, y: 0}} // Gốc trên bên trái
      end={{x: 1, y: 1}} // Gốc dưới bên phải
      colors={['#f2485c', colors.primary]}
      style={[styles.container, {paddingTop: 16 + insets.top}]}>
      <TouchableOpacity onPress={() => navigation.navigate('User')} activeOpacity={0.8} style={styles.infoBlock}>
        <GreenAvatar source={user?.Avatar} imageProps={{style: {width: 44, height: 44}}} />
        <View style={{marginLeft: 8, alignItems: 'flex-start'}}>
          <Text numberOfLines={1} style={styles.userName}>
            {user?.FullName}
          </Text>
          <RoleBlock />
        </View>
      </TouchableOpacity>

      <NotiBlock />
    </LinearGradient>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  infoBlock: {flexDirection: 'row', alignItems: 'center', flex: 1},
  container: {
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  userName: {
    color: '#fff',
    fontFamily: fonts.Bold,
    fontSize: 14,
    marginBottom: 4,
  },
})
