import {Image, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {fonts} from '~/configs'
import moment from 'moment'

const FirstInfo = (props: {detail: TClassDetail}) => {
  const {detail} = props

  return (
    <View style={[styles.container, {flexDirection: 'column'}]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          resizeMode="contain"
          source={detail?.Thumbnail ? {uri: detail?.Thumbnail} : require('~/assets/images/default-class.png')}
          style={styles.thumbnail}
        />

        <View style={styles.main}>
          <View style={{flexDirection: 'row'}}>
            <Text numberOfLines={2} style={styles.name}>
              {detail?.Name}
            </Text>
          </View>

          <View style={{width: '100%', backgroundColor: '#A4A4A433', height: 1, marginVertical: 8}} />

          <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
            <View
              style={{
                paddingHorizontal: 8,
                paddingTop: 2,
                paddingBottom: 4,
                borderRadius: 999,
                backgroundColor: detail?.Status == 2 ? '#2196F3' : detail?.Status == 1 ? '#4CAF50' : '#E53935',
              }}>
              <Text style={{fontFamily: fonts.Semibold, color: '#fff'}}>{detail?.StatusName}</Text>
            </View>

            <View
              style={{
                paddingHorizontal: 8,
                paddingTop: 2,
                paddingBottom: 4,
                borderRadius: 999,
                marginLeft: 8,
                backgroundColor: detail?.Type == 1 ? '#E91E63' : '#009688',
              }}>
              <Text style={{fontFamily: fonts.Semibold, color: '#fff'}}>{detail?.TypeName}</Text>
            </View>
          </View>

          <Text style={{fontFamily: fonts.Semibold, color: '#000', marginTop: 8, fontSize: 12}}>
            {moment(detail?.StartDay).format('DD/MM/YYYY')} - {moment(detail?.EndDay).format('DD/MM/YYYY')}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default FirstInfo

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'column',
  },
  name: {
    fontFamily: fonts.Bold,
    fontSize: 15,
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
  main: {flex: 1, marginLeft: 16, alignItems: 'flex-start'},
})
