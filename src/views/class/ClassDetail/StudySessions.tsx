import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {fonts} from '~/configs'
import moment from 'moment'
import Empty from '~/common/components/Empty'
import {Divider} from '~/common/components'

const StudySessions = ({detail, router, schedule}) => {
  return (
    <>
      {schedule?.length == 0 && <Empty />}

      {schedule &&
        schedule.map((item, index) => {
          const marginTop = index == 0 ? 0 : 16

          return (
            <View style={[styles.container, {marginTop: marginTop}]}>
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

              <Divider />

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
    flexDirection: 'column',
  },
  name: {
    fontFamily: fonts.Bold,
    fontSize: 15,
    color: '#0B1B19',
    flex: 1,
  },
})
