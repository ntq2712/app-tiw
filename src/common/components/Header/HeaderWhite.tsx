import {StatusBar, Text, TouchableOpacity, View} from 'react-native'
import React, {FC} from 'react'
import {Icon, isIOS} from 'green-native-ts'
import {useNavigation} from '@react-navigation/native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {headerStyles, whiteStyles} from './header.styles'

const HeaderWhite: FC<TGreenHeader> = props => {
  const {children, insetPadding = true, canBack = true} = props

  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  function goBack() {
    if (canBack) {
      navigation.goBack()
    }
  }

  const paddingTop = insetPadding ? (isIOS() ? insets.top + 4 : insets.top + 12) : 0

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <View style={[{paddingTop: paddingTop}, whiteStyles.headerContainer]}>
        <TouchableOpacity
          activeOpacity={canBack ? 0.7 : 0}
          onPress={goBack}
          style={[headerStyles.btnBack, {opacity: canBack ? 1 : 0}]}>
          <Icon type="materialicons" name="arrow-back-ios" color="#000" size={20} />
        </TouchableOpacity>

        <View style={headerStyles.title}>
          <Text numberOfLines={1} style={headerStyles.headerTitle}>
            {children}
          </Text>
        </View>

        <TouchableOpacity style={headerStyles.right}>
          <Icon type="materialicons" name="arrow-back-ios" color="#fff" size={20} />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default HeaderWhite
