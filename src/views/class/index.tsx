import {FlatList, StatusBar, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useGlobalContext} from '~/provider/AppProvider'
import {useIsFocused} from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import ClassItem from './ClassItem'
import {Empty, GreenHeader} from '~/common/components'
import FilterStudent from '~/common/components/FilterStudent'

const ClassTab = () => {
  const {classes, getClasses} = useGlobalContext()

  const [loading, setLoading] = useState<boolean>(false)

  const focused = useIsFocused()

  useEffect(() => {
    if (focused) {
      getClasses()
    }
  }, [focused])

  return (
    <>
      <View style={{flex: 1}}>
        {focused && <StatusBar barStyle="dark-content" />}

        <GreenHeader canBack={false}>Danh sách lớp</GreenHeader>

        <FlatList
          key="classes"
          data={classes}
          ListHeaderComponent={<FilterStudent />}
          renderItem={({item}) => <ClassItem key={`cl-i-${item?.Id}`} item={item} />}
          keyExtractor={(item: any) => {
            return item.Id
          }}
          ListEmptyComponent={<Empty />}
          ListFooterComponent={<View style={{height: 16}} />}
        />
      </View>

      <Spinner visible={loading} textContent={'Chờ xíu, tôi đang xử lý...'} />
    </>
  )
}

export default ClassTab
