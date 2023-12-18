import {useIsFocused, useRoute} from '@react-navigation/native'
import {parseMoney} from 'green-native-ts'
import React, {useEffect, useState} from 'react'
import {FlatList, StatusBar, StyleSheet, Text, View} from 'react-native'
import RestApi from '~/api/RestApi'
import {Divider, Empty, HeaderWhite, SuperLoading} from '~/common/components'
import {fonts} from '~/configs'

const PayDetail = () => {
  const router: any = useRoute()
  const focused = useIsFocused()

  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState([])

  useEffect(() => {
    if (focused && router?.params) {
      getData()
    }
  }, [focused, router])

  async function getData() {
    setLoading(true)
    try {
      const res = await RestApi.getBy<any>('Bill/detail', router?.params?.Id)
      if (res.status == 200) {
        setData(res.data.data)
      } else {
        setData([])
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{backgroundColor: '#f1f1f1', flex: 1}}>
      <StatusBar barStyle="light-content" />

      <HeaderWhite>{router?.params?.Code}</HeaderWhite>

      <FlatList
        key="mona-payments"
        data={data}
        renderItem={({item}) => (
          <View key={`pay-item-${item?.Id}`} style={styles.itemContainer}>
            <Text style={{fontFamily: fonts.Bold, fontSize: 16, color: '#000'}}>{item?.ProductName}</Text>

            <Divider />

            <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
              <Text style={{fontFamily: fonts.Semibold, color: '#000', flex: 1}}>Tổng</Text>
              <Text style={{fontFamily: fonts.Bold, color: '#4CAF50'}}>{parseMoney(item?.TotalPrice + '')}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item: any) => {
          return item.Id
        }}
        ListEmptyComponent={<Empty />}
        ListFooterComponent={<View style={{height: 16}} />}
      />

      <SuperLoading loading={loading} />
    </View>
  )
}

export default PayDetail

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
  },
})
