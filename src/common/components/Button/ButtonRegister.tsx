import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import React, {FC} from 'react'
import {colors} from '~/configs'

const ButtonRegister: FC<{activeOpacity?: number; text: string; onPress: Function; style?: any}> = props => {
  const {activeOpacity, text, onPress, style} = props

  return (
    <TouchableOpacity onPress={event => onPress(event)} activeOpacity={activeOpacity || 0.5} style={{...styles.wrap, ...style}}>
      <Text style={{color: colors.primary, fontSize: 16}}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrap: {
    borderColor: colors.primary,
    borderWidth: 1,
    width: '100%',
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
})

export default ButtonRegister
