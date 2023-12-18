import {FlatList, Image, StatusBar, StyleSheet, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {colors, fonts} from '~/configs'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {isIOS, windowHeight} from 'green-native-ts'
import {useGlobalContext} from '~/provider/AppProvider'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import {Empty, GreenHeader} from '~/common/components'
import RestApi from '~/api/RestApi'
import RenderItem from './RenderItem'

const PaymentHistories = () => {
  const insets = useSafeAreaInsets()

  const {isProd, user} = useGlobalContext()

  const [loading, setLoading] = useState<boolean>(true)

  const focused = useIsFocused()

  const [data, setData] = useState<Array<TPayment>>([])

  useEffect(() => {
    if (focused) {
      getData()
    }
  }, [focused])

  const navigation = useNavigation<any>()

  async function getData() {
    try {
      const res = await RestApi.get<TPayment>('Bill', {
        pageSize: 99999,
        pageIndex: 1,
        studentIds: user?.UserInformationId || null,
      })
      if (res?.status == 200) {
        setData(res.data.data)
      } else {
        setData([...res.data.data])
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <View style={{flex: 1}}>
        {focused && <StatusBar barStyle="dark-content" />}

        <GreenHeader canBack={true}>Lịch sử thanh toán</GreenHeader>

        <FlatList
          key="mona-payments"
          data={data}
          renderItem={({item}) => <RenderItem key={`pay-item-${item?.Id}`} item={item} />}
          keyExtractor={(item: any) => {
            return item.Id
          }}
          ListEmptyComponent={<Empty />}
          ListFooterComponent={<View style={{height: 16}} />}
        />
      </View>

      <Spinner visible={loading} textContent={'Đang xử lý...'} textStyle={{color: '#fff'}} />
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
