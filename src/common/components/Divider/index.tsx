import {View} from 'react-native'
import React, {FC} from 'react'

type TDivider = {
  height?: number
  marginVertical?: number
  width?: number | string
  color?: string
}

const Divider: FC<TDivider> = props => {
  const {height = 1, marginVertical = 8, width = '100%', color = '#A4A4A433'} = props

  return (
    <View
      style={{
        width: width,
        backgroundColor: color,
        height: height,
        marginVertical: marginVertical,
      }}
    />
  )
}

export default Divider