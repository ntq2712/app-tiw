import {StyleSheet, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useRoute} from '@react-navigation/native'
import WebView from 'react-native-webview'
import {HeaderWhite} from '~/common/components'

const SWebview = () => {
  const router = useRoute<any>()

  const [url, setUrl] = useState('')

  useEffect(() => {
    if (router?.params) {
      setUrl(router?.params)
    }
  }, [router])

  return (
    <View style={{flex: 1}}>
      <HeaderWhite>Xem web</HeaderWhite>
      <WebView source={{uri: url}} style={{flex: 1}} />
    </View>
  )
}

export default SWebview

const styles = StyleSheet.create({})
