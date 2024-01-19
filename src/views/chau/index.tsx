import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {HeaderWhite} from '~/common/components'
import {fonts} from '~/configs'
import {useNavigation} from '@react-navigation/native'

const ChauDashboard = () => {
  const navigation = useNavigation<any>()

  return (
    <View>
      <HeaderWhite>Dash Of Chaos</HeaderWhite>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 16,
          paddingHorizontal: 16,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Webview', 'https://play.google.com/store/games')}
          activeOpacity={0.7}
          style={{
            flex: 1,
            backgroundColor: '#fff',
            borderRadius: 999,
            height: 42,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 8,
          }}>
          <Text style={{fontFamily: fonts.Semibold, color: '#000', fontSize: 16}}>CH Play</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Webview', 'https://play.google.com/console/developers')}
          activeOpacity={0.7}
          style={{
            flex: 1,
            backgroundColor: '#fff',
            borderRadius: 999,
            height: 42,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 8,
          }}>
          <Text style={{fontFamily: fonts.Semibold, color: '#000', fontSize: 16}}>Play Console</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', marginTop: 16, paddingHorizontal: 16}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Webview', 'https://appstoreconnect.apple.com')}
          activeOpacity={0.7}
          style={{
            flex: 1,
            backgroundColor: '#fff',
            borderRadius: 999,
            height: 42,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 8,
          }}>
          <Text style={{fontFamily: fonts.Semibold, color: '#000', fontSize: 16}}>AppStore Connect</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Webview', 'https://vercel.com/dashboard')}
          activeOpacity={0.7}
          style={{
            flex: 1,
            backgroundColor: '#fff',
            borderRadius: 999,
            height: 42,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 8,
          }}>
          <Text style={{fontFamily: fonts.Semibold, color: '#000', fontSize: 16}}>Vercel</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ChauDashboard

const styles = StyleSheet.create({})
