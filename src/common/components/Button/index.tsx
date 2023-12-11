import {Text, TouchableOpacity, StyleSheet, ActivityIndicator, ViewStyle} from 'react-native'
import React, {FC} from 'react'
import {colors, fonts} from '~/configs'

import LinearGradient from 'react-native-linear-gradient'

type TLogginButton = {
  disabled?: boolean
  activeOpacity?: number
  text?: string
  style?: ViewStyle
  loading?: boolean
  is3D?: boolean
  children?: React.ReactNode

  onPress: Function
}

const Button: FC<TLogginButton> = props => {
  const {activeOpacity, text, disabled, onPress, style, loading, children} = props

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onPress={event => !disabled && !loading && onPress(event)}
      activeOpacity={loading || disabled ? 1 : activeOpacity || 0.5}
      style={{...styles.wrap, opacity: disabled ? 0.5 : 1, ...style}}>
      {!loading && <Text style={{color: '#fff', fontFamily: fonts.Medium, fontSize: 16}}>{text || children}</Text>}
      {loading && <ActivityIndicator size="small" color="#fff" />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.primary,
    width: '100%',
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
})

export default Button
