import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import React, {useEffect, useRef, useState} from 'react'
import {colors, fonts, webViewURLs} from '~/configs'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Colors, GreenStyles, Icon, isIOS, windowWidth} from 'green-native-ts'
import {useInputState} from '~/common/utils/customHooks/useInputState'
import {useNavigation} from '@react-navigation/native'
import {getFullUrl} from '~/common'
import translate from '~/api/translatetion'
import SuperWebview from '../../common/components/SuperWebview'
import ProcessBar from './ProcessBar'
import {useGlobalContext} from '~/provider/AppProvider'

const FAKE_DATA = [
  {id: 1, text: 'Váy'},
  {id: 2, text: 'Đầm'},
  {id: 3, text: 'Đồ ngủ'},
  {id: 4, text: 'Đồ tết'},
  {id: 5, text: 'Áo khác'},
  {id: 6, text: 'Áo sơ mi'},
  {id: 7, text: 'Tai nghe'},
  {id: 8, text: 'Giày'},
  {id: 9, text: 'Dép nam'},
  {id: 10, text: 'Dép nữ'},
  {id: 11, text: 'Túi xách'},
  {id: 12, text: 'Ốp lưng iphone'},
]

const checkImages = (image: any) => {
  let processedImage = image

  if (!image.includes('https://') && !image.includes('http://') && !image.includes('http')) {
    processedImage = `https://${image}`
  } else if (image.includes('http://')) {
    const split = image?.split('://')
    processedImage = `${split?.[0]}s://${split?.[1]}`
  }

  processedImage = processedImage.replace('_.webp', '').replace('.jpg._web', '')
  processedImage = decodeURIComponent(processedImage)

  return processedImage
}

const SearchTab = () => {
  const insets = useSafeAreaInsets()
  const webview = useRef<any>(null)
  // const navigation = useNavigation()

  const [visible, setVisible] = useState<boolean>(false)

  // ----------------------------------------------------------------

  const [wvUrl, setUrl] = useState('')

  // ----------------------------------------------------------------

  const {isProd} = useGlobalContext()
  const [wvProcess, setwvProcess] = useState(0)
  const [isRefresh, setRefresh] = useState(false)
  const [isDetail, setDetail] = useState(false)
  const [atc_Loading, setatc_Loading] = useState(false)
  const noteInputState = useInputState('')
  // const {user} = useGlobalContext()
  const navigation = useNavigation<any>()

  const [searchText, setSearchText] = useState('')

  const [loadPage, setLoadPage] = useState(false)

  const translateText = async (web, url) => {
    let temp = ''
    try {
      const translateValue = await translate(searchText, {to: 'zh-cn'})
      temp = translateValue[0][0][0]
    } catch (error) {}

    setVisible(false)

    navigation.navigate('Webview', {
      web: web,
      url: url + temp,
      vnValue: searchText,
      cnValue: temp,
    })
  }

  function handleSearch(params) {
    if (params == 'taobao') {
      translateText('taobao', webViewURLs.taobao.searchUrl)
    }
    if (params == '1688') {
      translateText('taobao', webViewURLs[1688].searchUrl)
    }
  }

  function handlePressSearch() {
    if (!isProd) {
      Alert.alert('Không tìm thấy', 'Không thể tìm thấy đơn')
      return
    }

    if (searchText.includes('http')) {
      navigation.navigate('Webview', {
        web: 'url',
        url: searchText,
        vnValue: '',
        cnValue: '',
      })
    } else {
      setVisible(true)
    }
  }

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" />

      <View style={[{paddingTop: isIOS() ? insets.top + 4 : insets.top + 12}, styles.headerContainer]}>
        <View style={{height: 36, backgroundColor: '#fff', flex: 1, borderRadius: 6}}>
          <TextInput
            placeholder={isProd ? 'Tìm kiếm hoặc link' : 'Tìm kiếm'}
            placeholderTextColor={Colors.trans30}
            defaultValue={searchText}
            onChangeText={e => setSearchText(e)}
            onEndEditing={handlePressSearch}
            style={{
              height: 38,
              width: '100%',
              borderRadius: 6,
              fontSize: 14,
              marginTop: 1,
              paddingHorizontal: 8,
              color: '#000',
            }}
          />
        </View>
        <TouchableOpacity
          onPress={handlePressSearch}
          activeOpacity={0.7}
          style={{
            width: 36,
            height: 36,
            backgroundColor: '#fff',
            marginLeft: 8,
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon type="Ionicons" name="search" color={colors.primary} size={18} />
        </TouchableOpacity>
      </View>

      <Modal visible={visible} transparent>
        <View style={{flexDirection: 'column', backgroundColor: Colors.trans20, alignItems: 'center', flex: 1}}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{flexDirection: 'row', width: '100%', alignItems: 'center', flex: 1}}
          />
          <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={{flexDirection: 'row', alignItems: 'center', flex: 1}}
            />

            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#fff',
                width: '90%',
                borderRadius: 8,
                padding: 8,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#000',
                  fontFamily: fonts.Medium,
                  marginBottom: 8,
                  textTransform: 'uppercase',
                }}>
                Chọn sàn thương mại
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', borderRadius: 8, padding: 8}}>
                <TouchableOpacity
                  onPress={() => handleSearch('taobao')}
                  activeOpacity={0.7}
                  style={{
                    backgroundColor: '#fe7500',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 7,
                  }}>
                  <Image
                    resizeMode="contain"
                    source={require('~/assets/logo-taobao.png')}
                    style={{width: 'auto', height: 48, aspectRatio: 1.5}}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleSearch('1688')}
                  activeOpacity={0.7}
                  style={{
                    backgroundColor: '#fe7100',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 7,
                    marginLeft: 16,
                  }}>
                  <Image
                    resizeMode="contain"
                    source={require('~/assets/logo-1688.png')}
                    style={{width: 'auto', height: 48, aspectRatio: 1.8}}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={{flexDirection: 'row', alignItems: 'center', flex: 1}}
            />
          </View>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{flexDirection: 'row', width: '100%', alignItems: 'center', flex: 1}}
          />
        </View>
      </Modal>

      <ProcessBar percent={wvProcess} />

      {!!wvUrl ? (
        <>
          <View style={styles.pageContent}>
            <SuperWebview
              isRefresh={isRefresh}
              ref={webview}
              style={{marginTop: 0}}
              source={{uri: checkImages(wvUrl)}}
              onError={(error: any) => console.error('WebView error:', error)}
              javaScriptEnabled={true}
              setLoadPage
              onLoadEnd={() => setLoadPage(true)}
              cacheEnabled={false}
              cacheMode={'LOAD_NO_CACHE'}
              javaScriptEnabledAndroid={true}
            />
          </View>

          {!!wvUrl && wvProcess >= 70 && isDetail && (
            <>
              <View
                style={[
                  styles.BottomBtnGroup,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                ]}>
                <View style={styles.btnWrap}>
                  <TouchableOpacity
                    style={[styles.btn]}
                    // onPress={_onPressOrderProps}
                  >
                    <Text style={styles.btnTxt}>Xem thuộc tính</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.btnWrap}>{/* <NoteModal input={noteInputState} /> */}</View>
                <View style={styles.btnWrap}>
                  <TouchableOpacity
                    style={[styles.btn, {backgroundColor: 'green'}]}
                    // onPress={atc_Loading ? () => { } : _onPressOrderAddToCart}
                  >
                    <Text style={styles.btnTxt}>{atc_Loading ? 'Đang xử lý' : 'Đặt hàng'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View />
            </>
          )}
        </>
      ) : (
        <>
          {isProd && (
            <View style={{backgroundColor: '#fff', padding: 8}}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>Tìm kiếm phổ biến</Text>

              <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: 8}}>
                {FAKE_DATA.map((item, index) => {
                  return (
                    <View key={`search-${index}`} style={[styles.btnPageorder, {marginTop: index == 0 ? 0 : 8}]}>
                      <TouchableOpacity
                        onPress={() => {
                          if (!isProd) {
                            Alert.alert('Không tìm thấy', 'Không thể tìm thấy đơn')
                            return
                          }
                          setSearchText(item?.text)
                          setVisible(true)
                        }}>
                        <Text style={{color: '#000', fontSize: 16, fontWeight: '400'}}>{item?.text}</Text>
                      </TouchableOpacity>
                    </View>
                  )
                })}
              </View>
            </View>
          )}
        </>
      )}

      <View style={{height: 24}}></View>
    </View>
  )
}

export default SearchTab

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 16,
  },
  divider: {
    width: windowWidth - 32,
    marginHorizontal: 16,
    height: 1,
    backgroundColor: Colors.trans10,
    marginTop: 16,
  },
  pageContent: {
    flex: 1,
  },
  BottomBtnGroup: {
    padding: 5,
    paddingVertical: 16,
    paddingBottom: isIOS() ? 30 : 16,
  },
  input: {
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
    lineHeight: 20,
    borderRadius: 4,
  },
  focus: {
    width: '60%',
    flexGrow: 20,
  },
  wvArrowBtn: {
    backgroundColor: colors.primary,
    borderRadius: 4,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 20,
    minWidth: 48,
    minHeight: 48,
  },
  btnWrap: {
    flexGrow: 1,
    margin: 2.5,
  },
  btn: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  btnTxt: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    lineHeight: 20,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  orderPageList: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  btnPageorderx: {
    padding: 5,
  },
  btnPageorder: {
    padding: 8,
    backgroundColor: Colors.trans10,
    borderRadius: 8,
    marginRight: 8,
    paddingVertical: 6,
  },
  imgBtnOrder: {
    // height: hp('3%'),
    // width: hp('8%'),
  },
  headerTitle: {fontFamily: fonts.Bold, fontSize: 20, color: '#000'},
  avatar: {width: 42, height: 42, borderRadius: 999},
  fullName: {fontFamily: fonts.Semibold, fontSize: 16, color: '#000'},
  phone: {fontFamily: fonts.Semibold, fontSize: 16},
})
