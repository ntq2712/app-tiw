import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import React, {FC, useState} from 'react'
import {Controller} from 'react-hook-form'
import {TInputController} from '../controller'
import Ionicons from 'react-native-vector-icons/Ionicons'
import appConfigs from '~/configs'

const CustomInput: FC<TInputController & {onBlur?: Function; value: string}> = props => {
  const {label, onBlur, placeholder, value, disabled, onEnter, hideError} = props
  const {style, errors, wrapStyle, isPassword, inputStyle} = props

  const [showPassword, setShowPassword] = useState(isPassword)

  const [thisValue, setThisValue] = useState<string>(value || '')

  return (
    <View style={!!wrapStyle ? {...wrapStyle} : {}}>
      <Text style={styles.lable}>{label} </Text>
      <View style={{...styles.wrapInput, ...style}}>
        <TextInput
          secureTextEntry={showPassword ? true : false}
          editable={!disabled}
          placeholder={placeholder}
          style={{...styles.input, ...inputStyle}}
          onBlur={() => !!onBlur && onBlur(thisValue)}
          onChangeText={e => setThisValue(e)}
          value={thisValue}
          onEndEditing={onEnter}
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

      {!hideError && errors && <Text style={{color: 'red', marginTop: 5}}>Không được bỏ trống</Text>}
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

export default CustomInput
