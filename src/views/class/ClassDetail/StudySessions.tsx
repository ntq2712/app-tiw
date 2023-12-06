import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {fonts} from '~/configs'
import moment from 'moment'
import Empty from '~/common/components/Empty'

const StudySessions = ({detail, router, schedule}) => {
  return (
    <>
      {schedule?.length == 0 && <Empty />}

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
})
