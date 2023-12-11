import {View, Text, TextInput, StyleSheet, ViewStyle, ColorValue} from 'react-native'
import React, {FC} from 'react'
import appConfigs from '~/configs'

type TGInput = {
  value?: string
  label?: string
  disabled?: boolean
  placeholder?: string
  placeholderTextColor?: ColorValue
  errors?: any

  wrapStyle?: ViewStyle
  inputWrapperStyle?: ViewStyle
  inputStyle?: ViewStyle

  onBlur?: Function
  onChange?: Function
  onEnter?: Function
}

const GTextArea: FC<TGInput> = props => {
  const {value, label, disabled, placeholder, placeholderTextColor, onBlur, onChange, onEnter} = props
  const {wrapStyle, inputWrapperStyle, inputStyle} = props

  return (
    <View style={!!wrapStyle ? {...wrapStyle} : {}}>
      {label ? <Text style={styles.lable}>{label} </Text> : <></>}

      <View style={{...styles.wrapInput, ...inputWrapperStyle}}>
        <TextInput
          numberOfLines={5}
          multiline
          textAlignVertical="top"
          // -----
          value={value || ''}
          secureTextEntry={false}
          editable={!disabled}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || '#dadada'}
          style={{...styles.input, ...inputStyle}}
          onBlur={e => onBlur && onBlur(e)}
          onChangeText={e => onChange && onChange(e)}
          onEndEditing={e => onEnter && onEnter(e)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 6,
    paddingHorizontal: 16,
    flex: 1,
    fontFamily: appConfigs.fonts.Medium,
    color: '#000',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  wrapInput: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    flexDirection: 'row',
  },
  lable: {
    color: '#000',
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: appConfigs.fonts.Bold,
  },
})

export default GTextArea
