import {Image, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {windowHeight} from 'green-native-ts'

const Empty = () => {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        height: windowHeight - 200,
        justifyContent: 'center',
      }}>
      <Image source={require('~/assets/images/empty.png')} style={{width: 130, height: 130, opacity: 0.4}} />
    </View>
  )
}

export default Empty
