import {Alert, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {colors, fonts} from '~/configs'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Colors, Icon, isIOS, parseMoney} from 'green-native-ts'
import {useGlobalContext} from '~/provider/AppProvider'
import {useNavigation, useRoute} from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import {RefreshControl} from 'react-native'
import RestApi from '~/api/RestApi'
import PriceBlock from './PriceBlock'
import moment from 'moment'

const DetailOrder = () => {
  const insets = useSafeAreaInsets()

  const {getOrders} = useGlobalContext()

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
      const res = await RestApi.getBy('MainOrder/detail', router?.params?.item?.Id)
      if (res.status == 200) {
        setDetail(res.data.data)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  async function cancelOrder() {
    try {
      const res = await RestApi.put('MainOrder/cancel/' + router?.params?.item?.Id, {})
      if (res.status == 200) {
        getOrders()
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
      const res = await RestApi.post('MainOrder/deposit', {
        MainOrderIds: [router?.params?.item?.Id],
      })

      if (res.status == 200) {
        getOrders()
        Alert.alert('Thành công', 'Chúc mừng, bạn đã đặt cọc thành công!')
      }
    } catch (error) {
      Alert.alert('Thất bại', error?.message)
    } finally {
      getDetail()
      setLoading(false)
    }
  }

  async function createSameOrder() {
    setLoading(true)
    try {
      const res = await RestApi.post('MainOrder/order-same/' + router?.params?.item?.Id, {})
      if (res.status == 200) {
        await getOrders()
        navigation.goBack()
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  function handleCreateSameOrder() {
    Alert.alert('Tạo đơn', 'Bạn muốn tạo đơn hàng tương tự ' + router?.params?.item?.Id, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => createSameOrder()},
    ])
  }

  useEffect(() => {
    if (router) {
      getDetail()
    }
  }, [router])

  const navigation = useNavigation<any>()

  function getStatusColor() {
    if (detail?.Status == 0) {
      return {bg: '#FFE082', text: 'black'}
    }

    if (detail?.Status == 1) {
      return {bg: '#EF9A9A', text: 'black'}
    }

    if (detail?.Status == 2) {
      return {bg: '#DCE775', text: 'black'}
    }

    if (detail?.Status == 3) {
      return {bg: '#DCE775', text: 'black'}
    }

    if (detail?.Status == 4) {
      return {bg: '#FFAB91', text: 'black'}
    }

    if (detail?.Status == 5) {
      return {bg: '#A5D6A7', text: 'black'}
    }

    if (detail?.Status == 6) {
      return {bg: '#80CBC4', text: 'black'}
    }

    if (detail?.Status == 7) {
      return {bg: '#4DD0E1', text: 'black'}
    }

    if (detail?.Status == 8) {
      return {bg: '#B3E5FC', text: 'black'}
    }

    if (detail?.Status == 9) {
      return {bg: '#D1C4E9', text: 'black'}
    }

    if (detail?.Status == 10) {
      return {bg: '#F8BBD0', text: 'black'}
    }

    if (detail?.Status == 11) {
      return {bg: '#D7CCC8', text: 'black'}
    }

    if (detail?.Status == 12) {
      return {bg: '#D7CCC8', text: 'black'}
    }

    return {bg: Colors.trans10, text: '#000'}
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
                <Text style={styles.blockTitle}>{detail?.AccountInfo?.FullName}</Text>
                <View style={styles.contactTag}>
                  <Text style={styles.contactText}>{detail?.AccountInfo?.Phone}</Text>
                </View>
                <Text numberOfLines={2} style={styles.addressText}>
                  {detail?.AccountInfo?.Address}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.blockWrapper}>
            <Text style={styles.blockTitle}>Trạng thái</Text>
            <View style={{backgroundColor: getStatusColor().bg, paddingHorizontal: 6, borderRadius: 6, padding: 2}}>
              <Text style={[styles.statusText, {color: getStatusColor().text}]}>
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
            {detail?.Orders.map(detailItem => {
              return (
                <View style={styles.blockProduct}>
                  <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                    <View style={{flexDirection: 'row', flex: 1, alignItems: 'flex-start'}}>
                      <View style={{backgroundColor: Colors.trans05, width: 50, height: 50, borderRadius: 8}}>
                        {detailItem?.Image.includes('http') && (
                          <Image
                            source={{uri: detailItem?.Image}}
                            resizeMode="contain"
                            style={{width: 50, height: 50, borderRadius: 8}}
                          />
                        )}
                      </View>

                      <View style={{flex: 1, marginLeft: 8, alignItems: 'flex-start'}}>
                        <Text style={{fontFamily: fonts.Regular, fontSize: 14, color: '#000'}}>
                          {detailItem?.ProductName || 'không xác định'}
                        </Text>

                        <View style={{flexDirection: 'row', marginTop: 8, alignItems: 'center'}}>
                          <View
                            style={{
                              backgroundColor: Colors.trans10,
                              paddingHorizontal: 4,
                              borderRadius: 6,
                              padding: 2,
                            }}>
                            <Text style={{fontFamily: fonts.Medium, fontSize: 12, color: '#000'}}>
                              {detailItem?.Property || 'Không xác định'}
                            </Text>
                          </View>
                        </View>

                        <View style={{marginTop: 8}}>
                          <Text style={{fontFamily: fonts.Semibold, fontSize: 14, color: '#000'}}>
                            Giá TQ: ¥ {detailItem?.PriceCNY || ''}
                          </Text>

                          <Text style={{fontFamily: fonts.Semibold, fontSize: 14, color: '#000'}}>
                            Giá VN: {parseMoney(detailItem?.PriceVND) || ''} VNĐ
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
              <Text style={styles.blockTitle}>Danh sách kiện</Text>

              {detail?.SmallPackages.map(detailItem => {
                return (
                  <View style={{marginTop: 8, padding: 8, borderRadius: 12, backgroundColor: Colors.trans05}}>
                    <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                      <View style={{flexDirection: 'row', flex: 1, alignItems: 'flex-start'}}>
                        <View style={{flex: 1, alignItems: 'flex-start'}}>
                          <Text style={{fontFamily: fonts.Regular, fontSize: 14, color: '#000'}}>
                            {detailItem?.OrderTransactionCode || 'không xác định'}
                          </Text>

                          <View style={{flexDirection: 'row', marginTop: 8, alignItems: 'center'}}>
                            <View
                              style={{
                                borderRadius: 6,
                                paddingHorizontal: 4,
                                paddingVertical: 2,
                                backgroundColor: '#ff5406',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 8,
                              }}>
                              <Text style={{fontFamily: fonts.Semibold, fontSize: 10, color: '#fff'}}>
                                {detail?.StatusName}
                              </Text>
                            </View>

                            <View
                              style={{
                                backgroundColor: Colors.trans10,
                                paddingHorizontal: 4,
                                borderRadius: 6,
                                padding: 2,
                              }}>
                              <Text style={{fontFamily: fonts.Medium, fontSize: 12, color: '#000'}}>
                                {detailItem?.Size || 'Không xác định'}
                              </Text>
                            </View>
                          </View>

                          <View style={{marginTop: 8}}>
                            <Text style={{fontFamily: fonts.Semibold, fontSize: 14, color: '#000'}}>
                              Cân nặng: {detailItem?.Weight} Kg
                            </Text>
                            <Text style={{fontFamily: fonts.Semibold, fontSize: 14, color: '#000'}}>
                              Cần thanh toán: {parseMoney(detailItem?.CanTinhTien) || ''} VNĐ
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )
              })}
            </View>
          )}

          {detail?.OrderComments.length > 0 && (
            <View style={styles.blockWrapper}>
              <Text style={styles.blockTitle}>Ghi chú</Text>
              {detail?.OrderComments.map((detailComment, indexCom) => {
                return (
                  <View
                    style={{
                      marginTop: indexCom > 0 ? 8 : 4,
                      padding: 8,
                      paddingHorizontal: 10,
                      borderRadius: 12,
                      backgroundColor: Colors.trans05,
                    }}>
                    {detailComment?.CreatedBy && (
                      <Text style={{color: '#000', marginBottom: 4, fontSize: 16, fontFamily: fonts.Semibold}}>
                        {detailComment?.CreatedBy}
                      </Text>
                    )}
                    <Text style={{color: Colors.trans50, marginBottom: 4, fontSize: 13, fontFamily: fonts.Semibold}}>
                      {moment(detailComment?.CreatedDate).format('HH:mm DD/MM/YYYY')}
                    </Text>
                    <Text style={{color: '#000', fontSize: 16, fontFamily: fonts.Regular}}>
                      {detailComment?.Comment || 'Không có ghi chú'}
                    </Text>
                  </View>
                )
              })}
            </View>
          )}

          <PriceBlock detail={detail || {}} />

          <View
            style={{
              width: '100%',
              backgroundColor: '#fff',
              flexDirection: 'row',
              marginTop: 8,
              paddingHorizontal: 16,
              paddingVertical: 16,
            }}>
            <TouchableOpacity
              onPress={handleCreateSameOrder}
              activeOpacity={0.7}
              style={{
                height: 36,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                backgroundColor: '#66BB6A',
                flex: 1,
              }}>
              <Text style={{color: '#fff', fontSize: 16, fontFamily: fonts.Semibold}}>Tạo đơn tương tự</Text>
            </TouchableOpacity>
          </View>

          {(detail?.PayOrderHistorys.length > 0 || detail?.Status == 0 || detail?.Status == 7) && (
            <View
              style={{
                width: '100%',
                backgroundColor: '#fff',
                flexDirection: 'row',
                marginTop: 8,
                paddingHorizontal: 16,
                paddingVertical: 16,
              }}>
              {detail?.Status == 0 && (
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
                  <Text style={{color: '#000', fontSize: 16, fontFamily: fonts.Semibold}}>Huỷ</Text>
                </TouchableOpacity>
              )}

              {(detail?.Status == 0 || detail?.Status == 7) && (
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
                    marginLeft: detail?.Status == 7 ? 0 : 8,
                  }}>
                  <Text style={{color: '#fff', fontSize: 16, fontFamily: fonts.Semibold}}>
                    {detail?.Status == 7 ? 'Thanh toán' : 'Đặt cọc'}
                  </Text>
                </TouchableOpacity>
              )}

              {detail?.PayOrderHistorys.length > 0 && (
                <TouchableOpacity
                  onPress={() => navigation.navigate('PaymentHistories', {item: router?.params?.item})}
                  activeOpacity={0.7}
                  style={{
                    height: 36,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                    backgroundColor: colors.primary,
                    flex: 1,
                    marginLeft: detail?.Status == 0 || detail?.Status == 7 ? 16 : 0,
                  }}>
                  <Text style={{color: '#fff', fontSize: 16, fontFamily: fonts.Semibold}}>Lịch sử thanh toán</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {isIOS() && <View style={{height: insets.bottom + 8, backgroundColor: '#fff'}} />}
        </ScrollView>
      </View>

      <Spinner visible={loading} textStyle={{color: '#fff'}} textContent={'Chờ xíu, tôi đang xử lý...'} />
    </>
  )
}

export default DetailOrder

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingBottom: 12,
  },
  contactTag: {
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingTop: 1,
    paddingBottom: 3,
    backgroundColor: Colors.trans10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  blockProduct: {marginTop: 8, padding: 8, borderRadius: 12, backgroundColor: Colors.trans05},
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
  addressText: {color: '#000', fontSize: 14, fontFamily: fonts.Regular},
  contactText: {color: '#000', fontSize: 14, fontFamily: fonts.Semibold},
  blockTitle: {color: '#000', marginBottom: 8, fontSize: 16, fontFamily: fonts.Semibold},
  totalTitle: {color: '#000', fontSize: 18, fontFamily: fonts.Semibold},
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
