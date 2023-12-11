import {StyleSheet, Text, TextStyle} from 'react-native'
import React, {FC} from 'react'
import {fonts} from '~/configs'

type TTextError = {
  children: string
  style?: TextStyle
}

const TextError: FC<TTextError> = props => {
  const {children, style} = props

  if (!children) {
    return <></>
  }

  return <Text style={[styles.errorText, style]}>{children}</Text>
}

export default TextError

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginTop: 16,
    fontSize: 14,
    fontFamily: fonts.Regular || '',
    textAlign: 'left',
    width: '100%',
  },
})
