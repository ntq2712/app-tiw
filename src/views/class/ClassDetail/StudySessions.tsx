import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {fonts} from '~/configs'
import moment from 'moment'

const StudySessions = ({detail, router, schedule}) => {
  return (
    <>
      {schedule &&
        schedule.map((item, index) => {
          return (
            <View style={[styles.container, {marginTop: index == 0 ? 0 : 16, flexDirection: 'column'}]}>
              <View
                style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text
                  style={[
                    styles.name,
                    {
                      fontSize: 15,
                      color: new Date(item?.StartTime).getTime() < new Date().getTime() ? 'red' : '#2196F3',
                    },
                  ]}>
                  Buổi {index + 1}
                </Text>

                <Text style={{fontFamily: fonts.Semibold, color: '#000', fontSize: 15}}>
                  {moment(item?.StartTime).format('DD/MM/YYYY')}
                </Text>
              </View>

              <View style={{width: '100%', backgroundColor: '#A4A4A433', height: 1, marginVertical: 8}} />

              <Text style={{fontFamily: fonts.Semibold, color: '#000', fontSize: 15}}>
                {moment(item?.StartTime).format('HH:mm')} - {moment(item?.EndTime).format('HH:mm')}
              </Text>
            </View>
          )
        })}
    </>
  )
}

export default StudySessions

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
  },
  name: {
    fontFamily: fonts.Bold,
    fontSize: 15,
    color: '#0B1B19',
    flex: 1,
  },
  thumbnail: {
    backgroundColor: '#E9E9E9',
    borderRadius: 10,
    width: 90,
    height: 90,
  },
  textInfo: {
    fontFamily: fonts.Medium,
    color: '#000',
    fontSize: 14,
    marginLeft: 8,
    marginTop: -2,
  },
  main: {flex: 1, marginLeft: 16, alignItems: 'flex-start'},
})
