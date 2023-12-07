import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {FC} from 'react'
import {Icon, isIOS} from 'green-native-ts'
import {useNavigation} from '@react-navigation/native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {colors, fonts} from '~/configs'
import {headerStyles} from './header.styles'

const HeaderBackground: FC<TGreenHeader> = props => {
  const {children, insetPadding = true, canBack = true, backgroundColor, color} = props

  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  function goBack() {
    if (canBack) {
      navigation.goBack()
    }
  }

  const paddingTop = insetPadding ? (isIOS() ? insets.top + 4 : insets.top + 12) : 0

  return (
    <View style={[{paddingTop: paddingTop, backgroundColor: backgroundColor || 'black'}, styles.headerContainer]}>
      <TouchableOpacity
        activeOpacity={canBack ? 0.7 : 0}
        onPress={goBack}
        style={[headerStyles.btnBack, {opacity: canBack ? 1 : 0}]}>
        <Icon type="materialicons" name="arrow-back-ios" color={color || '#fff'} size={20} />
      </TouchableOpacity>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text numberOfLines={1} style={[headerStyles.headerTitle, {color: color || '#fff'}]}>
          {children}
        </Text>
      </View>

      <TouchableOpacity style={headerStyles.right}>
        <Icon type="materialicons" name="arrow-back-ios" color={color || '#fff'} size={20} />
      </TouchableOpacity>
    </View>
  )
}

export default HeaderBackground

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
  },
})
