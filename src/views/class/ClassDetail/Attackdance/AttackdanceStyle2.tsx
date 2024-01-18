import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {fonts} from '~/configs'
import moment from 'moment'
import {Colors, Icon, windowWidth} from 'green-native-ts'
import RestApi from '~/api/RestApi'
import SuperLoading from '~/common/components/SuperLoading'
import {Divider, Empty} from '~/common/components'

const Attackdance2 = ({detail, router, schedule, curStudent}) => {
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

  const [loading, setLoading] = useState<boolean>(true)

  async function getAttackdance() {
    setLoading(true)
    try {
      const res = await RestApi.get<any>('RollUp', {
        classId: router?.params?.Id,
        pageIndex: 1,
        pageSize: 990,
        scheduleId: curSchedule?.Id,
        studentIds: curStudent?.UserInformationId || curStudent,
      })
      if (res.status == 200) {
        setData(res.data.data)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <FlatList
        key="schedules"
        data={schedule}
        renderItem={({item, index}: {item: any; index: number}) => {
          const scheTime = `${moment(item?.StartTime).format('HH:mm')} - ${moment(item?.EndTime).format('HH:mm')}`
          const title = `[Buổi ${index + 1}] ${moment(item?.StartTime).format('DD/MM/YYYY')}: ${scheTime}`

          return (
            <TouchableOpacity
              key={`sc-${index}`}
              onPress={() => setCurSchedule(curSchedule?.Id !== item?.Id ? item : null)}
              activeOpacity={0.7}
              style={{
                width: windowWidth - 32,
                marginLeft: 16,
                padding: 16,
                backgroundColor: '#fff',
                marginBottom: 16,
                borderRadius: 8,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  numberOfLines={1}
                  style={{fontFamily: fonts.Medium, flex: 1, color: item?.Status == 2 ? '#1E88E5' : '#000'}}>
                  {title}
                </Text>

                <View style={{marginRight: -4}}>
                  <Icon
                    type="materialicons"
                    name={curSchedule?.Id == item?.Id ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    size={18}
                    color="#000"
                  />
                </View>
              </View>

              {curSchedule?.Id !== item?.Id ? (
                <></>
              ) : (
                <>
                  <Divider marginVertical={16} />

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
                            Tình trạng:{' '}
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
                            <Text style={{color: item?.Note ? '#2196F3' : '#F44336'}}>
                              {item?.Note || 'Chưa có thông tin'}
                            </Text>
                          </Text>
                        </View>
                      )
                    })}
                </>
              )}
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item: any) => {
          return item?.Id
        }}
        ListEmptyComponent={<Empty />}
        ListFooterComponent={<View style={{height: 16}} />}
      />

      <SuperLoading loading={loading} />
    </>
  )
}

export default Attackdance2

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.trans10,
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
