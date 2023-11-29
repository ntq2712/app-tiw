import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {colors, fonts} from '~/configs'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Colors, Icon, isIOS, parseMoney} from 'green-native-ts'
import {useNavigation, useRoute} from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import RestApi from '~/api/RestApi'
import Timeline from 'react-native-timeline-flatlist'
import moment from 'moment'

const PaymentHistories = () => {
  const insets = useSafeAreaInsets()

  const [loading, setLoading] = useState<boolean>(true)
  const [detail, setDetail] = useState<any>(null)

  const router = useRoute<any>()

  async function getDetail() {
    setLoading(true)
    try {
      const res = await RestApi.getBy('MainOrder/detail', router?.params?.item?.Id)
      if (res.status == 200) {
        setDetail(res.data.data)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (router) {
      getDetail()
    }
  }, [router])

  const navigation = useNavigation<any>()

  return (
    <>
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" />

        <View style={[{paddingTop: isIOS() ? insets.top + 4 : insets.top + 12}, styles.headerContainer]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
            style={{alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16}}>
            <Icon type="MaterialIcons" name="arrow-back-ios" color="#fff" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.headerTitle}>Lịch sử: {router?.params?.item?.Id}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, opacity: 0}}>
            <Icon type="MaterialIcons" name="arrow-back-ios" color="#fff" size={20} />
          </TouchableOpacity>
        </View>

        {detail?.PayOrderHistorys && (
          <Timeline
            style={{padding: 16, marginTop: 8, paddingLeft: 0}}
            showTime={false}
            data={detail?.PayOrderHistorys.map((hisItem, index) => {
              return {time: index + '', ...hisItem}
            })}
            isUsingFlatlist={true}
            lineWidth={2}
            circleSize={12}
            lineColor="rgb(45,156,219)"
            renderDetail={(detailItem: any) => {
              return (
                <View
                  style={{
                    borderRadius: 8,
                    borderTopStartRadius: 0,
                    padding: 8,
                    backgroundColor: Colors.trans10,
                    marginTop: -4,
                    alignItems: 'flex-start',
                  }}>
                  <Text style={{fontSize: 14, fontFamily: fonts.Medium}}>
                    {detailItem?.CreatedBy} - {moment(detailItem?.CreatedDate).format('HH:mm DD/MM/YYYY')}
                  </Text>

                  <View
                    style={{
                      paddingHorizontal: 6,
                      paddingVertical: 1,
                      borderRadius: 6,
                      backgroundColor: colors.primary,
                      marginTop: 4,
                      marginBottom: 4,
                      paddingBottom: 3,
                    }}>
                    <Text style={{fontSize: 14, color: '#fff', opacity: 0.7, fontFamily: fonts.Semibold}}>
                      {detailItem?.StatusName}
                    </Text>
                  </View>

                  <Text style={{fontSize: 16, marginBottom: 4, color: '#000', fontFamily: fonts.Medium}}>
                    Số tiền: {parseMoney(detailItem?.Amount)} VNĐ
                  </Text>
                  <Text style={{fontSize: 16, color: '#000', fontFamily: fonts.Medium}}>
                    Hình thức: {detailItem?.TypeName}
                  </Text>
                </View>
              )
            }}
          />
        )}

        <View style={{width: '100%', marginTop: 8, backgroundColor: '#fff'}}></View>
      </View>
      <Spinner visible={loading} textContent={'Chờ xíu, tôi đang xử lý...'} />
    </>
  )
}

export default PaymentHistories

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingBottom: 12,
  },
  headerTitle: {fontFamily: fonts.Bold, fontSize: 20, color: '#fff'},
})
