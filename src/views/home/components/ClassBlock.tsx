import {Image, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {Colors, Icon, windowWidth} from 'green-native-ts'
import {fonts} from '~/configs'
import {ScheduleItem} from '~/views/Schedule'
import {useGlobalContext} from '~/provider'
import ClassItem from '~/views/class/ClassItem'

const ClassBlock = () => {
  const {homeClasses} = useGlobalContext()

  return (
    <View>
      <View style={styles.title}>
        <Icon type="materialcommunityicons" name="format-list-text" color="#000" size={20} />
        <Text style={styles.textTitle}>Khoá đang học</Text>
      </View>

      {homeClasses.length == 0 && (
        <View style={styles.containerEmpty}>
          <Image resizeMode="contain" source={require('~/assets/empty-class.png')} style={styles.imgEmpty} />
          <Text style={styles.textEmpty}>Không có khoá học</Text>
        </View>
      )}

      {homeClasses.map((item, index) => {
        if (index > 2) {
          // Hiện 3 cái thôi, nhiều quá nó dài như loz v
          return <></>
        }

        return <ClassItem key={`i-cl-${index}`} item={item} />
      })}
    </View>
  )
}

export default ClassBlock

const styles = StyleSheet.create({
  textTitle: {
    color: '#000',
    fontFamily: fonts.Bold,
    fontSize: 16,
    marginLeft: 8,
  },
  title: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  textEmpty: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    marginTop: -16,
    color: Colors.trans30,
  },
  imgEmpty: {
    width: windowWidth / 1.4,
    height: windowWidth / 1.4,
  },
  containerEmpty: {
    width: windowWidth - 32,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    borderRadius: 12,
    paddingBottom: 24,
  },
})
