import {FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {fonts} from '~/configs'
import Empty from '~/common/components/Empty'
import {useClassContext} from '~/provider'
import {Colors, Icon} from 'green-native-ts'
import {useNavigation} from '@react-navigation/native'

const Examinations = () => {
  const {examinations, refeshExams, detail} = useClassContext()
  const navigation = useNavigation<any>()

  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await refeshExams()
    setRefreshing(false)
  }, [])

  function viewScore(params) {
    navigation.navigate('Transcript', {class: detail?.Id, exam: params, classDetail: detail})
  }

  return (
    <FlatList
      key="examinations"
      data={examinations}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      renderItem={({item, index}: {item: TClassExam; index: number}) => (
        <TouchableOpacity
          key={`cart-item-${item?.Id}`}
          onPress={() => viewScore(item)}
          activeOpacity={0.7}
          style={[styles.container, {marginTop: index == 0 ? 0 : 16}]}>
          <View style={styles.topBlock}>
            <Text style={styles.name}>{item?.Name}</Text>
            <Icon type="materialicons" name="arrow-forward-ios" size={16} color={Colors.trans50} />
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item: any) => {
        return item.Id
      }}
      ListEmptyComponent={<Empty />}
      ListFooterComponent={<View style={{height: 16}} />}
    />
  )
}

export default Examinations

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
