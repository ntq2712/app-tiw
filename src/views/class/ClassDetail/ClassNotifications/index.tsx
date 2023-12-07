import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {fonts} from '~/configs'
import Empty from '~/common/components/Empty'
import {useClassContext} from '~/provider'
import {Divider} from '~/common/components'

const ClassNotifications = () => {
  const {notifications, refeshNotifications} = useClassContext()

  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)

    refeshNotifications()

    setTimeout(() => {
      setRefreshing(false)
    }, 500)
  }, [])

  return (
    <FlatList
      key="noti"
      data={notifications}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      renderItem={({item, index}: {item: TClassNotification; index: number}) => (
        <View key={`cart-item-${item?.Id}`} style={[styles.container, {marginTop: index == 0 ? 0 : 16}]}>
          <View style={styles.topBlock}>
            <Text style={styles.name}>{item?.Title}</Text>
          </View>
          <Divider />
          <Text style={styles.textContent}>{item?.Content}</Text>
        </View>
      )}
      keyExtractor={(item: any) => {
        return item.Id
      }}
      ListEmptyComponent={<Empty />}
      ListFooterComponent={<View style={{height: 16}} />}
    />
  )
}

export default ClassNotifications

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'column',
  },
  topBlock: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: fonts.Bold,
    color: '#0B1B19',
    flex: 1,
    fontSize: 15,
  },
  textContent: {
    fontFamily: fonts.Regular,
    color: '#000',
    fontSize: 15,
  },
})
