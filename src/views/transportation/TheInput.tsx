import {StyleSheet, Text, TextInput, View} from 'react-native'
import React, {useState} from 'react'

const TheInput = ({
  defaultValue,
  placeholder,
  onBlur,
  keyboardType,
}: {
  defaultValue?: string
  placeholder?: string
  onBlur?: Function
  keyboardType?: any
}) => {
  const [value, setValue] = useState<string>('')

  function handleBlur() {
    onBlur(value)
  }

  return (
    <TextInput
      keyboardType={keyboardType || 'default'}
      defaultValue={defaultValue}
      onChangeText={text => setValue(text)}
      placeholder={placeholder}
      onBlur={handleBlur}
      style={styles.input}
    />
  )
}

export default TheInput

const styles = StyleSheet.create({
  input: {
    height: '100%',
    flex: 1,
    padding: 0,
    paddingHorizontal: 12,
    borderRadius: 9,
    color: '#000',
  },
})
