import {Colors, Icon, windowWidth} from 'green-native-ts'
import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import {fonts} from '~/configs'
import {useGlobalContext} from '~/provider'
import {ScheduleItem} from '~/views/Schedule'

const ScheduleBlock = () => {
  const {schedule, published} = useGlobalContext()

  return (
    <View>
      <View style={styles.title}>
        <Icon type="materialcommunityicons" name="calendar-month" color="#000" size={20} />
        <Text style={styles.textTitle}>{published ? 'Lịch hôm nay' : 'Hôm nay'}</Text>
      </View>

      {schedule.length == 0 && (
        <View style={styles.containerEmpty}>
          <Image resizeMode="contain" source={require('~/assets/empty-schedule.png')} style={styles.imgEmpty} />
          {published && <Text style={styles.textEmpty}>Hôm nay không có buổi học</Text>}
        </View>
      )}

      {schedule.map((schedule, index) => {
        if (index > 2) {
          // Hiện 3 cái thôi, nhiều quá nó dài như loz v
          return <></>
        }

        return <ScheduleItem key={`i-sch-${index}`} index={index} item={schedule} />
      })}
    </View>
  )
}

export default ScheduleBlock

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
    width: windowWidth / 1.5,
    height: windowWidth / 1.5,
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
