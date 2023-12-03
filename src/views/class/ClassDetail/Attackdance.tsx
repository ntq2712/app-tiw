import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import {fonts} from '~/configs'
import moment from 'moment'

import RNPickerSelect from 'react-native-picker-select'
import {Icon, isIOS} from 'green-native-ts'
import RestApi from '~/api/RestApi'

const Attackdance = ({detail, router, schedule, curStudent}) => {
  const [curSchedule, setCurSchedule] = useState(null)

  useEffect(() => {
    if (schedule) {
      // Lấy thời gian hiện tại
      const currentTime = new Date().getTime()

      // Khởi tạo biến để lưu item gần nhất
      let closestItem = null

      // Khởi tạo biến để lưu khoảng thời gian gần nhất
      let closestTimeDifference = Infinity

      // Lặp qua từng item trong mảng
      for (const item of schedule) {
        // Tính khoảng thời gian giữa startTime của item và currentTime
        const timeDifference = Math.abs(new Date(item?.StartTime).getTime() - currentTime)

        // Nếu khoảng thời gian này nhỏ hơn khoảng thời gian gần nhất đã tìm thấy
        if (timeDifference < closestTimeDifference) {
          // Cập nhật closestItem và closestTimeDifference
          closestItem = item
          closestTimeDifference = timeDifference
        }
      }

      setCurSchedule(closestItem)
    }
  }, [schedule])

  useEffect(() => {
    if (curSchedule?.Id) {
      getAttackdance()
    }
  }, [curSchedule?.Id])

  const [data, setData] = useState([])

  async function getAttackdance() {
    try {
      const res = await RestApi.get<any>('RollUp', {
        classId: router?.params?.Id,
        pageIndex: 1,
        pageSize: 990,
        scheduleId: curSchedule?.Id,
        studentIds: curStudent,
      })
      if (res.status == 200) {
        setData(res.data.data)
      }
    } catch (error) {}
  }

  console.log('--- curSchedule: ', curSchedule)

  const whfRef = useRef(null)

  return (
    <>
      <View style={{marginTop: 0}}>
        <TouchableOpacity
          onPress={() => {
            if (isIOS()) {
              whfRef.current?.togglePicker()
            }
          }}
          activeOpacity={0.7}
          style={[
            {
              flexDirection: isIOS() ? 'row' : 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              marginBottom: 16,
              marginHorizontal: 16,
              height: 42,
              borderRadius: 10,
              paddingHorizontal: isIOS() ? 16 : 0,
            },
          ]}>
          <RNPickerSelect
            key="whf-select"
            ref={whfRef}
            placeholder="Chọn buổi học"
            fixAndroidTouchableBug={true}
            value={curSchedule ? JSON.stringify(curSchedule) : null}
            items={[
              ...schedule.map((item, scheIndex) => {
                const scheTime = `${moment(item?.StartTime).format('HH:mm')} - ${moment(item?.EndTime).format('HH:mm')}`

                return {
                  label: `[Buổi ${scheIndex + 1}] ${moment(item?.StartTime).format('DD/MM/YYYY')}: ${scheTime}`,
                  value: JSON.stringify({...item}),
                }
              }),
            ]}
            onValueChange={(value, item) => setCurSchedule(JSON.parse(value + ''))}
            style={{}}
          />

          {isIOS() && (
            <>
              <Text style={{color: '#000', flex: 1}}>{!curSchedule?.Name ? 'Chọn buổi' : curSchedule?.Name}</Text>
              <Icon name="caretdown" type="antdesign" color="#000" size={14} />
            </>
          )}
        </TouchableOpacity>
      </View>

      {data &&
        data.map((item, index) => {
          return (
            <View style={[styles.container, {marginTop: index == 0 ? 0 : 16, flexDirection: 'column'}]}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  marginTop: -2,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={[styles.name, {fontSize: 16, color: '#009688'}]}>{item?.FullName}</Text>
              </View>

              <View style={{width: '100%', backgroundColor: '#A4A4A433', height: 1, marginVertical: 8}} />

              <Text style={{fontFamily: fonts.Semibold, color: '#000', fontSize: 15}}>
                Điểm danh:{' '}
                <Text style={{color: item?.StatusName ? '#2196F3' : '#F44336'}}>
                  {item?.StatusName || 'Chưa có thông tin'}
                </Text>
              </Text>

              <Text style={{fontFamily: fonts.Semibold, marginTop: 8, color: '#000', fontSize: 15}}>
                Học lực:{' '}
                <Text style={{color: item?.StatusName ? '#2196F3' : '#F44336'}}>
                  {item?.StatusName || 'Chưa có thông tin'}
                </Text>
              </Text>

              <Text style={{fontFamily: fonts.Semibold, marginTop: 8, color: '#000', fontSize: 15}}>
                Đánh giá:{' '}
                <Text style={{color: item?.Note ? '#2196F3' : '#F44336'}}>{item?.Note || 'Chưa có thông tin'}</Text>
              </Text>
            </View>
          )
        })}
    </>
  )
}

export default Attackdance

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
