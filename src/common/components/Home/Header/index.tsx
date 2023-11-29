import React, {FC} from 'react'
import {View, Text, Animated, StatusBar, StyleSheet, Platform, Image} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {colors, sizes} from '~/configs'

const mainColor = colors.second
const mainColorSecond = colors.second

const HomeHeader: FC<{
  animatedValue: any
  maxHeight: any
  scrollDistance: any
}> = ({animatedValue, maxHeight, scrollDistance}) => {
  const insets = useSafeAreaInsets()

  // Animation
  const scrollY = Animated.add(animatedValue, 0)

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, scrollDistance],
    outputRange: [0, -scrollDistance],
    extrapolate: 'clamp',
  })

  const ANIM_FADE = scrollY.interpolate({
    inputRange: [0, scrollDistance / 2, scrollDistance],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  })
  const imageTranslate = scrollY.interpolate({
    inputRange: [0, scrollDistance],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  })

  const titleScale = scrollY.interpolate({
    inputRange: [0, scrollDistance / 2, scrollDistance],
    outputRange: [1, 1, 0.8],
    extrapolate: 'clamp',
  })
  const titleTranslate = scrollY.interpolate({
    inputRange: [0, scrollDistance / 2, scrollDistance],
    outputRange: [0, 0, -8],
    extrapolate: 'clamp',
  })

  return (
    <View>
      <Animated.View
        style={[
          {
            backgroundColor: mainColor,
            height: maxHeight + insets.top,
            transform: [{translateY: headerTranslate}],
            zIndex: 999,
            // borderBottomStartRadius: 30,
            // borderBottomEndRadius: 30,
          },
          styles.absolute,
        ]}>
        <Animated.View
          style={[
            // @ts-ignore
            {
              width: null,
              height: maxHeight + insets.top,
              backgroundColor: mainColorSecond,
              opacity: ANIM_FADE,
              transform: [{translateY: imageTranslate}],
              position: 'relative',
              borderBottomStartRadius: 30,
              borderBottomEndRadius: 30,
            },
            styles.absolute,
            styles.center,
          ]}>
          <Text
            style={{
              marginTop: 50,
              color: 'white',
              fontSize: 26,
              fontWeight: 'bold',
            }}>
            Image or some component
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
            }}>
            Will hide went scroll
          </Text>
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={[
          {
            backgroundColor: 'transparent',
            marginTop: Platform.OS === 'ios' ? 28 : 38,
            height: 32,
            transform: [{scale: titleScale}, {translateY: titleTranslate}],
            zIndex: 999,
          },
          styles.absolute,
          styles.center,
        ]}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
          }}>
          {/* THIS IS ANIMATION HEADER */}
        </Text>
      </Animated.View>
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
