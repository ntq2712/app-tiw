import {StyleSheet, TouchableOpacity} from 'react-native'
import React, {FC} from 'react'

const GreenTag: FC<TGreenTag> = props => {
  const {background, customBackground, children, onPress, rounded} = props

  function handlePress() {
    onPress && onPress()
  }

  function getBackground(color: 'green' | 'yellow' | 'blue' | 'red' | 'pink' | 'black' | 'white' | 'dark') {
    switch (color) {
      case 'green':
        return '#4CAF50'

      case 'yellow':
        return '#FFEB3B'

      case 'blue':
        return '#2196F3'

      case 'red':
        return '#F44336'

      case 'pink':
        return '#E91E63'

      case 'black':
        return '#000'

      case 'white':
        return '#fff'

      case 'dark':
        return '#0000001a'

      default:
        return '#2196F3'
    }
  }

  const backgroundColor = customBackground ? customBackground : getBackground(background)

  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.7 : 1}
      onPress={handlePress}
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
          borderRadius: rounded || 4,
        },
      ]}>
      {children}
    </TouchableOpacity>
  )
}

export default GreenTag

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingTop: 2,
    paddingBottom: 3,
  },
})
