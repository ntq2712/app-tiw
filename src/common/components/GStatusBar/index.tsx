import {useIsFocused} from '@react-navigation/native'
import React from 'react'
import {StatusBar} from 'react-native'

const GStatusBar = {
  Dark: () => {
    const focused = useIsFocused()
    return focused ? <StatusBar barStyle="dark-content" /> : <></>
  },
  Light: () => {
    const focused = useIsFocused()
    return focused ? <StatusBar barStyle="light-content" /> : <></>
  },
}

export default GStatusBar
