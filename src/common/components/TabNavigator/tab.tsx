import {Image, StyleSheet, Text, View} from 'react-native'
import React, {FC} from 'react'
import {colors, fonts} from '~/configs'

const Tab: FC<{
  actived: boolean
  title: string
  icon: any
}> = ({actived, title, icon}) => {
  return (
    <View style={styles.container}>
      <Image source={icon} resizeMode="contain" style={styles.icon} />
      {!actived && <Text style={styles.title}>{title}</Text>}
      {actived && <Text style={{...styles.title, color: colors.primary}}>{title}</Text>}
    </View>
  )
}

export default Tab

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerActivated: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  icon: {
    width: 22,
    height: undefined,
    aspectRatio: 1,
  },
  title: {
    fontSize: 10,
    fontFamily: fonts.Regular,
    marginTop: 4,
    color: '#999999',
  },
})
