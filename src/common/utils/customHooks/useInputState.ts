import {useState} from 'react'

export const useInputState = (initialValue = '') => {
  const [value, setValue] = useState(initialValue)
  return {value, setValue, onChangeText: setValue}
}
