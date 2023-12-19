import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import React, {FC, useState} from 'react'
import {Controller} from 'react-hook-form'
import {TInputController} from '../controller'
import Ionicons from 'react-native-vector-icons/Ionicons'
import appConfigs, {fonts} from '~/configs'
import {Colors, Icon} from 'green-native-ts'

const Select: FC<
  TInputController & {
    data: Array<{value: string | number; title: string}>
  }
> = props => {
  const {label, name, placeholder, control, disabled, required = true, hideError = false, onEnter} = props
  const {style, errors, wrapStyle, isPassword, data, inputStyle} = props

  const [showPassword, setShowPassword] = useState(isPassword)

  // <TextInput
  //             secureTextEntry={showPassword ? true : false}
  //             editable={!disabled}
  //             placeholder={placeholder}
  //             style={{...styles.input, ...inputStyle}}
  //             onBlur={onBlur}
  //             onChangeText={onChange}
  //             value={value}
  //             onEndEditing={onEnter}
  //           />

  function getSelectedItem(value) {
    if (data.length == 0) {
      return 'Nhấn để chọn'
    }
    if (data.length > 0) {
      const thisIndex = data.findIndex(item => item?.value == value)

      if (thisIndex != -1) {
        return data[thisIndex].title
      }
    }
    return 'Nhấn để chọn'
  }

  return (
    <View style={!!wrapStyle ? {...wrapStyle} : {}}>
      <Text style={styles.lable}>{label} </Text>
      <View style={{...styles.wrapInput, ...style}}>
        <Controller
          control={control}
          rules={{required: required}}
          render={({field: {onChange, onBlur, value}}) => (
            <TouchableOpacity style={{...styles.input, ...inputStyle}}>
              <Text style={{color: '#000', fontSize: 14, fontFamily: fonts.Medium}}>{getSelectedItem(value)}</Text>
            </TouchableOpacity>
          )}
          name={name}
        />

        <View style={{marginTop: 2}}>
          <Icon name="arrow-drop-up" type="materialicons" size={26} color={Colors.trans50} />
          <Icon name="arrow-drop-down" type="materialicons" size={26} style={{marginTop: -18}} color={Colors.trans50} />
        </View>
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
    justifyContent: 'center',
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

export default Select
