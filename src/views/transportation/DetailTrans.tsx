import {Alert, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {colors, fonts} from '~/configs'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Colors, Icon, isIOS, parseMoney} from 'green-native-ts'
import {useNavigation, useRoute} from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import {RefreshControl} from 'react-native'
import RestApi from '~/api/RestApi'
import moment from 'moment'
import {getTransColor} from './CartItem'

const DetailTrans = () => {
  const insets = useSafeAreaInsets()

  const [loading, setLoading] = useState<boolean>(false)
  const [refreshing, setRefreshing] = React.useState(false)

  const router = useRoute<any>()

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await getDetail()
    setRefreshing(false)
  }, [])

  const [detail, setDetail] = useState<any>(null)

  async function getDetail() {
    setLoading(true)
    try {
      const res = await RestApi.getBy('TransportationOrder/detail', router?.params?.item?.Id)
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
      console.log('--- router?.params?.item: ', router?.params?.item)

      getDetail()
    }
  }, [router])

  const navigation = useNavigation<any>()

  async function cancelOrder() {
    try {
      const res = await RestApi.put('TransportationOrder/cancel/' + router?.params?.item?.Id, {})
      if (res.status == 200) {
        navigation.goBack()
      }
    } catch (error) {}
  }

  function handleCancel() {
    Alert.alert('Huỷ đơn', 'Bạn muốn huỷ đơn ' + router?.params?.item?.Id + ' thật sao?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => cancelOrder()},
    ])
  }

  async function handleDeposit() {
    setLoading(true)

    try {
      const res = await RestApi.post('TransportationOrder/pay/' + router?.params?.item?.Id, {})

      if (res.status == 200) {
        Alert.alert('Thành công', 'Chúc mừng, bạn đã thanh toán thành công!')
      }
    } catch (error) {
      Alert.alert('Thất bại', error?.message)
    } finally {
      getDetail()
      setLoading(false)
    }
  }

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
            <Text style={styles.headerTitle}>Chi tiết: {router?.params?.item?.Id}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, opacity: 0}}>
            <Icon type="MaterialIcons" name="arrow-back-ios" color="#fff" size={20} />
          </TouchableOpacity>
        </View>

        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={{flex: 1, paddingHorizontal: 0}}>
            <View style={styles.addressWrapper}>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <Text style={styles.blockTitle}>Người đặt: {detail?.UserName}</Text>

                <Text style={{fontFamily: fonts.Medium, color: Colors.trans50}}>
                  Ngày: {moment(router?.params?.item?.CreatedDate).format('HH:mm DD/MM/YYYY')}
                </Text>

                <Text style={[styles.blockTitle, {marginBottom: 0, marginTop: 4, fontSize: 14}]}>
                  Tiền lưu kho: {parseMoney(detail?.TotalPriceVND)} VNĐ
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.blockWrapper}>
            <View
              style={{
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.blockTitle}>Vận chuyển</Text>

              <View style={{backgroundColor: '#03A9F4', paddingHorizontal: 6, borderRadius: 6, padding: 2}}>
                <Text style={[styles.statusText, {color: '#fff'}]}>{detail?.ShippingTypeName || 'Không xác định'}</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{backgroundColor: Colors.trans10, paddingHorizontal: 6, borderRadius: 6, padding: 2}}>
                <Text style={[styles.statusText, {color: '#000'}]}>
                  {detail?.WarehourseFromName || 'Không xác định'}
                </Text>
              </View>

              <View style={{paddingHorizontal: 8}}>
                <Icon type="FontAwesome" name="long-arrow-right" color={Colors.trans40} size={20} />
              </View>

              <View style={{backgroundColor: Colors.trans10, paddingHorizontal: 6, borderRadius: 6, padding: 2}}>
                <Text style={[styles.statusText, {color: '#000'}]}>{detail?.WarehourseToName || 'Không xác định'}</Text>
              </View>
            </View>
          </View>

          <View style={styles.blockWrapper}>
            <Text style={styles.blockTitle}>Trạng thái</Text>
            <View style={{backgroundColor: Colors.trans10, paddingHorizontal: 6, borderRadius: 6, padding: 2}}>
              <Text style={[styles.statusText, {fontFamily: fonts.Medium, color: getTransColor(detail?.Status)}]}>
                {detail?.StatusName || 'Không xác định'}
              </Text>
            </View>
          </View>

          {detail?.Note && (
            <View style={styles.blockWrapper}>
              <Text style={styles.blockTitle}>Ghi chú</Text>
              <View style={{paddingHorizontal: 6, borderRadius: 6, padding: 2}}>
                <Text style={styles.noteText}>{detail?.Note || 'Không xác định'}</Text>
              </View>
            </View>
          )}

          <View style={{width: '100%', backgroundColor: '#fff', marginTop: 8, padding: 16}}>
            <Text style={styles.blockTitle}>Sản phẩm</Text>
            {detail?.Products.map(detailItem => {
              return (
                <View style={styles.blockProduct}>
                  <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                    <View style={{flexDirection: 'row', flex: 1, alignItems: 'flex-start'}}>
                      <View style={{flex: 1, marginLeft: 8, alignItems: 'flex-start'}}>
                        <Text style={{fontFamily: fonts.Semibold, fontSize: 14, color: '#000'}}>
                          {detailItem?.ProductName || 'không xác định'}
                        </Text>

                        <View style={{flexDirection: 'row', marginTop: 8, alignItems: 'center'}}>
                          <View style={styles.blockProductStatus}>
                            <Text
                              style={{
                                fontFamily: fonts.Semibold,
                                paddingHorizontal: 2,
                                fontSize: 10,
                                color: '#fff',
                              }}>
                              {detailItem?.OrderCode}
                            </Text>
                          </View>
                        </View>

                        <View style={{marginTop: 8}}>
                          <Text style={{fontFamily: fonts.Semibold, fontSize: 14, color: '#000'}}>
                            Giá VN: {parseMoney(detailItem?.Price) || ''} VNĐ
                          </Text>

                          <Text style={{fontFamily: fonts.Semibold, fontSize: 14, color: '#000'}}>
                            Số lượng: {detailItem?.Quantity || ''}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )
            })}
          </View>

          {detail?.SmallPackages.length > 0 && (
            <View style={{width: '100%', backgroundColor: '#fff', marginTop: 8, padding: 16}}>
              <Text style={styles.blockTitle}>Danh sách kiện ({detail?.SmallPackages?.length})</Text>

              {detail?.SmallPackages.map(detailItem => {
                return (
                  <View style={{marginTop: 8, padding: 8, borderRadius: 12, backgroundColor: Colors.trans05}}>
                    <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                      <View style={{flexDirection: 'row', flex: 1, alignItems: 'flex-start'}}>
                        <View style={{flex: 1, alignItems: 'flex-start'}}>
                          <Text style={{fontFamily: fonts.Medium, fontSize: 14, color: '#000'}}>
                            Mã vận đơn: {detailItem?.OrderTransactionCode || 'không xác định'}
                          </Text>

                          <View style={{flexDirection: 'row', marginTop: 8, alignItems: 'center'}}>
                            <View
                              style={{
                                borderRadius: 6,
                                paddingHorizontal: 6,
                                paddingVertical: 2,
                                backgroundColor: '#ff5406',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 8,
                                paddingBottom: 3,
                              }}>
                              <Text style={{fontFamily: fonts.Semibold, fontSize: 10, color: '#fff'}}>
                                {detailItem?.Weight} Kg
                              </Text>
                            </View>

                            <View
                              style={{
                                backgroundColor: Colors.trans10,
                                paddingHorizontal: 6,
                                borderRadius: 6,
                                padding: 2,
                                paddingBottom: 3,
                              }}>
                              <Text style={{fontFamily: fonts.Medium, fontSize: 12, color: '#000'}}>
                                {detailItem?.StatusName || 'Không xác định'}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )
              })}
            </View>
          )}

          {router?.params?.item?.Status == 1 && (
            <View
              style={{
                width: '100%',
                backgroundColor: '#fff',
                flexDirection: 'row',
                paddingHorizontal: 16,
                paddingVertical: 16,
                marginTop: 8,
              }}>
              <TouchableOpacity
                onPress={handleCancel}
                activeOpacity={0.7}
                style={{
                  height: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  backgroundColor: Colors.trans10,
                  flex: 1,
                }}>
                <Text style={{color: '#000', fontSize: 16, fontFamily: fonts.Regular}}>Huỷ</Text>
              </TouchableOpacity>
            </View>
          )}

          {router?.params?.item?.Status == 5 && (
            <View style={{padding: 16, marginTop: 8, backgroundColor: '#fff'}}>
              <TouchableOpacity
                onPress={handleDeposit}
                activeOpacity={0.7}
                style={{
                  height: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  backgroundColor: '#42A5F5',
                  flex: 1,
                }}>
                <Text style={{color: '#fff', fontSize: 16, fontFamily: fonts.Semibold}}>Thanh toán</Text>
              </TouchableOpacity>
            </View>
          )}

          {isIOS() && <View style={{height: insets.bottom}} />}
        </ScrollView>
      </View>

      <Spinner visible={loading} textStyle={{color: '#fff'}} textContent={'Chờ xíu, tôi đang xử lý...'} />
    </>
  )
}

export default DetailTrans

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingBottom: 12,
  },
  blockProduct: {
    marginTop: 8,
    padding: 8,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.trans05,
  },
  blockProductStatus: {
    borderRadius: 6,
    paddingHorizontal: 4,
    paddingVertical: 2,
    backgroundColor: '#ff5406',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  statusText: {
    fontFamily: fonts.Medium,
    fontSize: 12,
    marginTop: -0,
    paddingBottom: 2,
  },
  noteText: {
    fontFamily: fonts.Medium,
    fontSize: 12,
    color: '#000',
    marginTop: -0,
    paddingBottom: 2,
  },
  blockTitle: {color: '#000', marginBottom: 8, fontSize: 16, fontFamily: fonts.Semibold},
  headerTitle: {fontFamily: fonts.Bold, fontSize: 20, color: '#fff'},
  addressWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 8,
    padding: 16,
  },
  blockWrapper: {width: '100%', alignItems: 'flex-start', backgroundColor: '#fff', marginTop: 8, padding: 16},
})
