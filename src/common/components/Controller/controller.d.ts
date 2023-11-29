import {Control, Controller, FieldValues, Path, RegisterOptions} from 'react-hook-form'

type TInputController = {
  control?: any
  required?: boolean
  name?: string
  label?: string
  disabled?: boolean
  hideError?: boolean
  placeholder?: string
  onEnter?: () => void
  style?: any
  errors?: any
  wrapStyle?: any
  isPassword?: boolean
  inputStyle?: any
}

export {TInputController}
