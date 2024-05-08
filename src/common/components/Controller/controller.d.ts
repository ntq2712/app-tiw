import {TextInputProps} from 'react-native'

type TInputController = {
  control?: any
  required?: boolean
  name?: string
  label?: string
  disabled?: boolean
  autoCapitalize?: TextInputProps['autoCapitalize']
  hideError?: boolean
  placeholder?: string
  onEnter?: () => void
  style?: any
  errors?: any
  wrapStyle?: any
  isPassword?: boolean
  inputStyle?: any
  isLogin?: boolean
}

type TSelectController = {
  control?: any
  required?: boolean
  name?: string
  label?: string
  hideError?: boolean
  style?: any
  errors?: any
  wrapStyle?: any
  inputStyle?: any
  data: Array<{value: string | number; title: string}>
  headerTitle: string
  closeOnPress?: boolean
  onChangeValue?: Function
}

type TDateController = {
  control?: any
  required?: boolean
  name?: string
  label?: string
  hideError?: boolean
  style?: any
  errors?: any
  wrapStyle?: any
  inputStyle?: any
  placeholder: string
}

export {TDateController, TInputController, TSelectController}
