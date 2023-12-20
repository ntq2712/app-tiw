import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Divider, Empty, HeaderWhite, SuperLoading} from '~/common/components'
import {Calendar, LocaleConfig} from 'react-native-calendars'
import {calendarConfigs} from '~/common/calendars.configs'
import moment from 'moment'
import {fonts} from '~/configs'
import RestApi from '~/api/RestApi'
import {Colors, Icon} from 'green-native-ts'
import {headerStyles} from '~/common/components/Header/header.styles'
import FilterStudent from '~/common/components/FilterStudent'
import {useGlobalContext} from '~/provider'

LocaleConfig.locales['vi'] = calendarConfigs
LocaleConfig.defaultLocale = 'vi'

export function InfoItem({title, value}) {
  return (
    <View style={styles.scheduleItemInfo}>
      <Text style={styles.scheduleText}>{title}</Text>
      <Text style={styles.scheduleText}>{value}</Text>
    </View>
  )
}

export function ScheduleItem({item, index}) {
  return (
    <View style={[styles.container, {marginTop: 16}]}>
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

      <InfoItem title="Lớp" value={item?.ClassName} />
      <InfoItem title="Giảng viên" value={item?.TeacherName} />
      {item?.RoomName && <InfoItem title="Phòng học" value={item?.RoomName} />}
      {item?.ZoomId && <InfoItem title="Phòng Zoom" value={item?.ZoomId} />}
      {item?.ZoomPass && <InfoItem title="Mật khẩu" value={item?.ZoomPass} />}
    </View>
  )
}

const ScheduleTab = () => {
  const [selected, setSelected] = useState('')
  const selectedDate = selected ? {[selected]: {selected: true}} : null

  const [markedDates, setMarkedDates] = useState({...selectedDate})
  const [data, setData] = useState([])

  const [loading, setLoading] = useState<boolean>(true)

  const {is, user, curChildren} = useGlobalContext()

  useEffect(() => {
    if (is.student) {
      getSchedule()
    }

    setSelected(moment(new Date()).format('YYYY-MM-DD'))
  }, [])

  useEffect(() => {
    if (is.parent && !!curChildren?.UserInformationId) {
      getSchedule()
    }
  }, [])

  useEffect(() => {
    if (is.parent && !!curChildren?.UserInformationId) {
      getSchedule()
    }
  }, [curChildren])

  const [schedule, setSchedule] = useState<Array<TClassSchedule>>([])

  // LẤY LỊCH HỌC
  async function getSchedule() {
    const studentId = user?.RoleId == 3 ? user?.UserInformationId : curChildren?.UserInformationId || null

    setLoading(true)
    try {
      const res = await RestApi.get<any>('Schedule', {studentId: studentId}, true)
      if (res.status == 200) {
        setSchedule(res.data.data)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleSchedule()
  }, [schedule])

  useEffect(() => {
    if (selected && !!schedule) {
      searchData()
    }
  }, [selected, schedule])

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
    setLoading(false)
  }

  const [visible, setVisible] = useState<boolean>(true)

  return (
    <>
      <HeaderWhite
        canBack={false}
        customRight={
          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            style={[headerStyles.right, {opacity: 1, transform: [{rotate: visible ? '270deg' : '90deg'}]}]}>
            <Icon
              type="materialicons"
              name={visible ? 'arrow-forward-ios' : 'arrow-forward-ios'}
              color={Colors.trans90}
              size={16}
            />
          </TouchableOpacity>
        }>
        Lịch học
      </HeaderWhite>

      <FlatList
        key="master-sche"
        data={data}
        ListHeaderComponent={
          <>
            {visible && (
              <>
                <FilterStudent />
                <View
                  style={{
                    marginHorizontal: 16,
                    marginTop: 16,
                    padding: 16,
                    paddingTop: 8,
                    backgroundColor: '#fff',
                    borderRadius: 8,
                  }}>
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
              </>
            )}

            <View style={{marginTop: 16, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{backgroundColor: '#59b96c', width: 10, height: 10, borderRadius: 999}} />
                <Text style={{fontFamily: fonts.Medium, marginLeft: 8}}>Đã học</Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 16}}>
                <View style={{backgroundColor: '#fb862d', width: 10, height: 10, borderRadius: 999}} />
                <Text style={{fontFamily: fonts.Medium, marginLeft: 8}}>Chưa học</Text>
              </View>
            </View>
          </>
        }
        renderItem={({item, index}: {item: TClassSchedule; index: number}) => (
          <ScheduleItem key={`sche-${item?.Id}-${index}`} index={index} item={item} />
        )}
        keyExtractor={(item: any) => {
          return item.Id
        }}
        ListEmptyComponent={!loading ? <Empty fitHeight /> : <></>}
        ListFooterComponent={<View style={{height: 16}} />}
      />

      <SuperLoading loading={loading} />
    </>
  )
}

export default ScheduleTab

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
