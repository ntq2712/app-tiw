import React, {useState} from 'react'
import {TextInput, View, StyleSheet} from 'react-native'

const MyTextArea = ({value, onChangeText, disabled = false}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textArea}
        multiline={disabled}
        textAlignVertical="top"
        numberOfLines={3} // Số dòng mặc định hiển thị
        placeholder="Nhập phản hồi"
        onChangeText={value => onChangeText(value)}
        value={value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  textArea: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    flexDirection: 'row',
    padding: 16,
  },
})

export default MyTextArea
