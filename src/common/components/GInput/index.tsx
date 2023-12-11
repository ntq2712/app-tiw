import {View, Text, TextInput, StyleSheet, TouchableOpacity, ViewStyle, ColorValue} from 'react-native'
import React, {FC, useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import appConfigs from '~/configs'

type TGInput = {
  value?: string
  label?: string
  isPassword?: boolean
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

const GInput: FC<TGInput> = props => {
  const {value, isPassword, label, disabled, placeholder, placeholderTextColor, onBlur, onChange, onEnter} = props

  const {wrapStyle, inputWrapperStyle, inputStyle} = props

  const [showPassword, setShowPassword] = useState(isPassword)

  return (
    <View style={!!wrapStyle ? {...wrapStyle} : {}}>
      {label ? <Text style={styles.lable}>{label} </Text> : <></>}

      <View style={{...styles.wrapInput, ...inputWrapperStyle}}>
        <TextInput
          value={value || ''}
          secureTextEntry={showPassword ? true : false}
          editable={!disabled}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || '#dadada'}
          style={{...styles.input, ...inputStyle}}
          onBlur={e => onBlur && onBlur(e)}
          onChangeText={e => onChange && onChange(e)}
          onEndEditing={e => onEnter && onEnter(e)}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            activeOpacity={0.5}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              paddingRight: 16,
            }}>
            {showPassword ? <Ionicons name="eye-off-outline" size={20} /> : <Ionicons name="eye-outline" size={20} />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 6,
    paddingHorizontal: 16,
    height: 50,
    flex: 1,
    fontFamily: appConfigs.fonts.Medium,
    color: '#000',
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

export default GInput
