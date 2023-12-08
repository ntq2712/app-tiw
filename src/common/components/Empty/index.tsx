import {Image, View} from 'react-native'
import React, {FC} from 'react'
import {windowHeight} from 'green-native-ts'

type TEmpty = {
  fitHeight?: boolean
}

const Empty: FC<TEmpty> = props => {
  const {fitHeight} = props

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        height: fitHeight ? null : windowHeight - 200,
        paddingVertical: fitHeight ? 24 : 0,
        justifyContent: 'center',
      }}>
      <Image source={require('./assets/empty.png')} style={{width: 130, height: 130, opacity: 0.4}} />
    </View>
  )
}

export default Empty
