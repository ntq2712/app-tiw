import {Text, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native'
import React, {FC} from 'react'
import {colors, fonts} from '~/configs'

import LinearGradient from 'react-native-linear-gradient'

type TLogginButton = {
  activeOpacity?: number
  text?: string
  onPress: Function
  style?: any
  loading?: boolean
  is3D?: boolean
  children?: React.ReactNode
}

const Button: FC<TLogginButton> = props => {
  const {activeOpacity, text, onPress, style, loading, children} = props

  return (
    <TouchableOpacity
      disabled={loading}
      onPress={event => !loading && onPress(event)}
      activeOpacity={loading ? 1 : activeOpacity || 0.5}
      style={{...styles.wrap, ...style}}>
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
    borderRadius: 8,
  },
})

export default Button
