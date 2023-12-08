import {FlatList, StyleSheet, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Calendar, LocaleConfig} from 'react-native-calendars'
import moment from 'moment'
import {useClassContext} from '~/provider'
import {fonts} from '~/configs'
import {Divider, Empty} from '~/common/components'
import {calendarConfigs} from '~/common/calendars.configs'

LocaleConfig.locales['vi'] = calendarConfigs
LocaleConfig.defaultLocale = 'vi'

function InfoItem({title, value}) {
  return (
    <View style={styles.scheduleItemInfo}>
      <Text style={styles.scheduleText}>{title}</Text>
      <Text style={styles.scheduleText}>{value}</Text>
    </View>
  )
}

const Schedule = () => {
  const {schedule} = useClassContext()

  const [selected, setSelected] = useState('')
  const selectedDate = selected ? {[selected]: {selected: true}} : null

  const [markedDates, setMarkedDates] = useState({...selectedDate})
  const [data, setData] = useState([])

  useEffect(() => {
    setSelected(moment(new Date()).format('YYYY-MM-DD'))
  }, [])

  useEffect(() => {
    handleSchedule()
  }, [schedule])

  useEffect(() => {
    searchData()
  }, [selected])

  // MAP CỤC DATA BACK-END TRẢ RA THÀNH CỤC MÀ CALENDAR NHẬN
  function handleSchedule() {
    let temp = {}
    schedule.forEach(element => {
      temp = {
        ...temp,
        [moment(element.StartTime).format('YYYY-MM-DD')]: {
          marked: true,
          dotColor: element?.Status == 2 ? '#59b96c' : '#fb862d',
        },
      }
    })
    setMarkedDates(temp)
  }

  // TÌM CÁC BUỔI HỌC TRONG NGÀY ĐÃ CHỌN
  function searchData() {
    let temp = []
    schedule.forEach(element => {
      if (moment(element.StartTime).format('YYYY-MM-DD') == selected) {
        temp.push(element)
      }
    })
    setData(temp)
  }

  return (
    <FlatList
      key="sche"
      data={data}
      scrollEnabled={false}
      ListHeaderComponent={
        <View style={{marginHorizontal: 16, padding: 16, paddingTop: 8, backgroundColor: '#fff', borderRadius: 8}}>
          <Calendar
            onDayPress={day => setSelected(day.dateString)}
            markedDates={{...markedDates, ...selectedDate}}
            theme={{
              backgroundColor: 'red',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#2196F3',
              selectedDayTextColor: '#fff',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
            }}
          />
        </View>
      }
      renderItem={({item, index}: {item: TClassSchedule; index: number}) => (
        <View key={`sche-${item?.Id}-${index}`} style={[styles.container, {marginTop: 16}]}>
          <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text
              style={[
                styles.name,
                {
                  fontSize: 15,
                  color: item?.Status == 2 ? '#59b96c' : '#fb862d',
                },
              ]}>
              {moment(item?.StartTime).format('DD/MM/YYYY')}
            </Text>
            <Text style={{fontFamily: fonts.Semibold, color: '#000', fontSize: 15}}>
              {moment(item?.StartTime).format('HH:mm')} - {moment(item?.EndTime).format('HH:mm')}
            </Text>
          </View>

          <Divider marginBottom={4} />

          <InfoItem title="Giảng viên" value={item?.TeacherName} />
          {item?.RoomName && <InfoItem title="Phòng học" value={item?.RoomName} />}
          {item?.ZoomId && <InfoItem title="Phòng Zoom" value={item?.ZoomId} />}
          {item?.ZoomPass && <InfoItem title="Mật khẩu" value={item?.ZoomPass} />}
        </View>
      )}
      keyExtractor={(item: any) => {
        return item.Id
      }}
      ListEmptyComponent={<Empty />}
      ListFooterComponent={<View style={{height: 16}} />}
    />
  )
}

export default Schedule

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
  scheduleItemInfo: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4},
  scheduleText: {fontFamily: fonts.Semibold, color: '#000', fontSize: 14},
})
