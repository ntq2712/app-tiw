import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {Icon, isIOS} from 'green-native-ts'
import {useNavigation} from '@react-navigation/native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {colors, fonts} from '~/configs'

const HeaderDetail = ({children}) => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  return (
    <View style={[{paddingTop: isIOS() ? insets.top + 4 : insets.top + 12}, styles.headerContainer]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.goBack()}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 16,
        }}>
        <Icon type="materialicons" name="arrow-back-ios" color="#fff" size={20} />
      </TouchableOpacity>
      <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text numberOfLines={1} style={styles.headerTitle}>
          {children}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 16,
          opacity: 0,
        }}>
        <Icon type="materialicons" name="arrow-back-ios" color="#fff" size={20} />
      </TouchableOpacity>
    </View>
  )
}

export default HeaderDetail

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingBottom: 12,
  },
  headerTitle: {fontFamily: fonts.Bold, fontSize: 18, color: '#fff'},
})
