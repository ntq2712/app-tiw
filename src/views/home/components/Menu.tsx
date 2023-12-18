import {Image, Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {fonts} from '~/configs'
import {useNavigation} from '@react-navigation/native'

const HomeMenu = () => {
  const navigation = useNavigation<any>()

  return (
    <View>
      <View style={styles.rowWrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LearningHistory')}
          activeOpacity={0.7}
          style={[styles.button, {marginRight: 8}]}>
          <View style={[styles.iconWrapper, {backgroundColor: '#51c3fe'}]}>
            <Image source={require('~/assets/icons/home/mortarboard_fill.png')} style={styles.imgButton} />
          </View>
          <Text style={styles.btnText}>Lịch sử học</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} style={[styles.button, {marginLeft: 8}]}>
          <View style={[styles.iconWrapper, {backgroundColor: '#f9ae2b'}]}>
            <Image source={require('~/assets/icons/home/book_5_line.png')} style={styles.imgButton} />
          </View>
          <Text style={styles.btnText}>Thư viện</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rowWrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Feedback')}
          activeOpacity={0.7}
          style={[styles.button, {marginRight: 8}]}>
          <View style={[styles.iconWrapper, {backgroundColor: '#54ad67'}]}>
            <Image source={require('~/assets/icons/home/star_fill.png')} style={styles.imgButton} />
          </View>
          <Text style={styles.btnText}>Phản hồi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL('https://gdcenglish.edu.vn')}
          activeOpacity={0.7}
          style={[styles.button, {marginLeft: 8}]}>
          <View style={[styles.iconWrapper, {backgroundColor: '#7384c0'}]}>
            <Image source={require('~/assets/icons/home/information_fill.png')} style={styles.imgButton} />
          </View>
          <Text style={styles.btnText}>Thông tin</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeMenu

const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  button: {
    flex: 1,
    borderRadius: 9999,
    backgroundColor: '#fff',
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 13,
  },
  iconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgButton: {width: 20, height: 20},
  btnText: {
    fontFamily: fonts.Semibold,
    color: '#000',
    marginLeft: 8,
    fontSize: 14,
  },
})
