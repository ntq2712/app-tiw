import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {fonts} from '~/configs'
import {useGlobalContext} from '~/provider'
import {Icon} from 'green-native-ts'

const RoleBlock = () => {
  const {user} = useGlobalContext()

  if (user?.RoleId == 3) {
    return (
      <View style={styles.container}>
        <Icon type="fontawesome5" name="user-graduate" color="#1E88E5" size={10} />
        <Text style={styles.textStudent}>{user?.RoleName}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Icon type="fontawesome5" name="user-alt" color="#00897B" size={10} />
      <Text style={[styles.textStudent, {color: '#00897B'}]}>{user?.RoleName}</Text>
    </View>
  )
}

export default RoleBlock

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 88,
  },
  textStudent: {
    color: '#1E88E5',
    fontFamily: fonts.Bold,
    fontSize: 11,
    marginLeft: 4,
  },
})
