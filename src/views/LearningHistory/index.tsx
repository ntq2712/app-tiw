import {StyleSheet, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Empty, GStatusBar, HeaderWhite, SuperLoading} from '~/common/components'
import {useIsFocused} from '@react-navigation/native'
import RestApi from '~/api/RestApi'
import {useGlobalContext} from '~/provider'
import Timeline from 'react-native-timeline-flatlist'
import moment from 'moment'
import {fonts} from '~/configs'
import FilterStudent from '~/common/components/FilterStudent'

const LearningHistory = () => {
  const {user, curChildren} = useGlobalContext()

  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<Array<TLearningHistory>>([])

  const focused = useIsFocused()

  useEffect(() => {
    if (focused && data.length == 0) {
      getData()
    }
  }, [focused])

  useEffect(() => {
    if (!!curChildren) {
      getData()
    }
  }, [curChildren])

  async function getData() {
    const studentId = user?.RoleId == 3 ? user?.UserInformationId : curChildren?.UserInformationId || null

    setLoading(false)
    try {
      const res = await RestApi.get<TLearningHistory>(
        'LearningHistory',
        {
          studentId: studentId,
        },
        true,
      )
      if (res.status == 200) {
        setData(res.data?.data)
      } else {
        setData([])
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{flex: 1}}>
      <GStatusBar.Dark />
      <HeaderWhite>Lịch sử học</HeaderWhite>

      <View style={{width: '100%'}}>
        <FilterStudent />
      </View>

      {!loading && data.length == 0 && <Empty />}

      {!loading && data.length > 0 && (
        <Timeline
          style={{paddingLeft: 0, paddingRight: 0, flex: 1}}
          listViewStyle={{paddingRight: 16, marginTop: 16, flex: 1, paddingBottom: 16}}
          showTime={false}
          data={data.map((item, index) => {
            return {time: index + '', ...item}
          })}
          isUsingFlatlist={true}
          lineWidth={2}
          circleSize={12}
          lineColor="rgb(45,156,219)"
          renderDetail={(item: TLearningHistory, index) => {
            return (
              <View style={[styles.itemContainer, {}]}>
                <Text style={styles.textDate}>{moment(item?.CreatedOn).format('HH:mm DD/MM/YYYY')}</Text>
                <Text style={styles.textContent}>{item?.Content}</Text>
              </View>
            )
          }}
        />
      )}

      <SuperLoading loading={loading} />
    </View>
  )
}

export default LearningHistory

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 8,
    borderTopStartRadius: 0,
    padding: 8,
    backgroundColor: '#fff',
    marginTop: -8,
    alignItems: 'flex-start',
    marginRight: 16,
  },
  textDate: {fontSize: 14, fontFamily: fonts.Medium},
  textContent: {fontSize: 16, marginBottom: 4, color: '#000', fontFamily: fonts.Medium},
})
