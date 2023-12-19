import {StyleSheet, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import moment from 'moment'
import {Divider} from '~/common/components'
import {fonts} from '~/configs'
import RestApi from '~/api/RestApi'
import {useGlobalContext} from '~/provider'
import {Colors} from 'green-native-ts'

function InfoItem({title, value}) {
  return (
    <View style={styles.scheduleItemInfo}>
      <Text style={styles.scheduleText}>{title}</Text>
      <Text style={styles.scheduleText}>{value}</Text>
    </View>
  )
}

const ScheduleItem = ({item, index}) => {
  const {user} = useGlobalContext()

  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState([])

  async function getAttackdance(scheduleId) {
    setLoading(true)
    try {
      const res = await RestApi.get<any>(
        'RollUp',
        {
          classId: item?.ClassId,
          scheduleId: scheduleId,
          studentIds: user.RoleId == 3 ? user?.UserInformationId : '',
        },
        true,
      )
      if (res.status == 200) {
        setData(res.data.data)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (item?.Id) {
      getAttackdance(item?.Id)
    }
  }, [item])

  return (
    <>
      <View key={`sche-${item?.Id}-${index}`} style={[styles.container, {marginTop: 16}]}>
        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={[styles.name, {fontSize: 15, color: item?.Status == 2 ? '#59b96c' : '#fb862d'}]}>
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

        {item?.Status == 2 ? (
          <>
            {data.map((item, index) => {
              return (
                <View style={[attackStyles.container, {marginTop: 16, flexDirection: 'column'}]}>
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
                    <Text style={{color: item?.Note ? '#2196F3' : '#F44336'}}>{item?.Note || 'Chưa có thông tin'}</Text>
                  </Text>
                </View>
              )
            })}
          </>
        ) : (
          <></>
        )}
      </View>
    </>
  )
}

export default ScheduleItem

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

const attackStyles = StyleSheet.create({
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
