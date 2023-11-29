import {View} from 'react-native'
import React from 'react'
import {Colors} from 'green-native-ts'

const ProcessBar = (props: any) => {
  return (
    <View
      style={{
        height: 3,
        width: '100%',
        backgroundColor: Colors.trans05,
      }}>
      <View
        style={{
          backgroundColor: '#ff7b00',
          height: '100%',
          width: `${props.percent}%`,
        }}
      />
    </View>
  )
}

export default ProcessBar
