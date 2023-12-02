import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {fonts} from '~/configs'
import Spinner from 'react-native-loading-spinner-overlay'
import {useNavigation} from '@react-navigation/native'

const ClassItem = ({item}: {item: TClassType}) => {
  const [loading, setLoading] = useState<boolean>(false)

  const navigation = useNavigation<any>()

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('ClassDetail', item)}
        activeOpacity={0.7}
        style={styles.container}>
        <Image
          resizeMode="contain"
          source={item?.Thumbnail ? {uri: item?.Thumbnail} : require('~/assets/images/default-class.png')}
          style={styles.thumbnail}
        />

        <View style={{flex: 1, marginLeft: 16, alignItems: 'flex-start'}}>
          <View style={{flexDirection: 'row'}}>
            <Text numberOfLines={1} style={styles.name}>
              {item?.Name}
            </Text>
            <Image
              resizeMode="contain"
              source={require('~/assets/icons/arrow-black.png')}
              style={{width: 20, height: 20}}
            />
          </View>

          <View style={{width: '100%', backgroundColor: '#A4A4A433', height: 1, marginVertical: 8}} />

          <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
            <View
              style={{
                paddingHorizontal: 8,
                paddingTop: 2,
                paddingBottom: 4,
                borderRadius: 999,
                backgroundColor: item?.Status == 2 ? '#2196F3' : item?.Status == 1 ? '#4CAF50' : '#E53935',
              }}>
              <Text
                style={{
                  fontFamily: fonts.Semibold,
                  color: '#fff',
                }}>
                {item?.StatusName}
              </Text>
            </View>

            <View
              style={{
                paddingHorizontal: 8,
                paddingTop: 2,
                paddingBottom: 4,
                borderRadius: 999,
                marginLeft: 8,
                backgroundColor: item?.Type == 1 ? '#E91E63' : '#009688',
              }}>
              <Text style={{fontFamily: fonts.Semibold, color: '#fff'}}>{item?.TypeName}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 8}}>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
              <Image
                resizeMode="contain"
                source={require('~/assets/icons/users.png')}
                style={{width: 18, height: 18}}
              />
              <Text style={styles.textInfo}>
                {item?.TotalStudent}/{item?.MaxQuantity}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                resizeMode="contain"
                source={require('~/assets/icons/notebook.png')}
                style={{width: 18, height: 18}}
              />
              <Text style={styles.textInfo}>
                {item?.LessonCompleted}/{item?.TotalLesson}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <Spinner
        visible={loading}
        textContent={'Chờ xíu, tôi đang xử lý...'}
        textStyle={{color: '#fff', fontSize: 14, fontFamily: fonts.Semibold}}
      />
    </>
  )
}

export default ClassItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
  },
  name: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    color: '#0B1B19',
    flex: 1,
  },
  thumbnail: {
    backgroundColor: '#E9E9E9',
    borderRadius: 10,
    width: 90,
    height: 90,
  },
  textInfo: {
    fontFamily: fonts.Medium,
    color: '#000',
    fontSize: 14,
    marginLeft: 8,
    marginTop: -2,
  },
})
