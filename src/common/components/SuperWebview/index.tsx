import {Dimensions, RefreshControl, ScrollView, StyleSheet} from 'react-native'
import React, {useState} from 'react'
import WebView from 'react-native-webview'
import {useGlobalContext} from '~/provider/AppProvider'
import {injectTaobaoDetail, removeAppBar, removeSearchBar, transTextBar} from './injectScript'
import {webViewURLs} from '~/configs'
import Spinner from 'react-native-loading-spinner-overlay'

const theInject = removeSearchBar + removeAppBar + transTextBar

const SuperWebview = React.forwardRef(({isRefresh, onRefresh, ...webViewProps}: any, ref) => {
  const [height, setHeight] = useState(Dimensions.get('screen').height)
  const [isEnabled, setEnabled] = useState(typeof onRefresh === 'function')

  const {setCanBack, setwvProcess, setWebState, setDetail} = useGlobalContext()

  const [loading, setLoading] = useState<boolean>(false)

  function onLoadEnd() {
    setLoading(false)
  }

  function startLoad() {
    setLoading(true)
  }

  const _onLoadProgress = ({nativeEvent}) => {
    // console.log('---- LOADING: ', nativeEvent.progress * 100)
    if (nativeEvent.progress * 100 < 20) {
      setLoading(true)
    }
    setwvProcess(nativeEvent.progress * 100)
  }

  return (
    <ScrollView
      scrollEventThrottle={20}
      overScrollMode="never"
      bounces={false}
      onLayout={e => setHeight(e.nativeEvent.layout.height)}
      refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={isRefresh} enabled={isEnabled} />}
      style={styles.view}>
      <WebView
        {...webViewProps}
        ref={ref}
        onLoadStart={startLoad}
        onLoadEnd={onLoadEnd}
        // originWhitelist={['*']}
        setSupportMultipleWindows={false}
        injectedJavaScript={theInject}
        onScroll={e => setEnabled(typeof onRefresh === 'function' && e.nativeEvent.contentOffset.y === 0)}
        style={[styles.view, {height}, webViewProps.style]}
        onLoadProgress={_onLoadProgress}
        onNavigationStateChange={event => {
          setWebState(event)
          setCanBack(event?.canGoBack)

          const {url} = event
          if (!url) return

          // console.log('--- url: ', url)

          let checkDt = webViewURLs.taobao.detailUrl
            .toString()
            .trim()
            .split('|')
            .some(s => url.includes(s))

          setDetail(checkDt)

          if (checkDt) {
            // @ts-ignore
            url.includes('taobao') && ref.current.injectJavaScript(injectTaobaoDetail)

            url.includes('tmall') &&
              // @ts-ignore
              ref.current.injectJavaScript(injectTaobaoDetail)

            url.includes('1688') &&
              // @ts-ignore
              ref.current.injectJavaScript(`
                if(document.querySelectorAll("[style='border: 0px solid black; box-sizing: border-box; display: flex; flex-direction: column; align-content: flex-start; flex-shrink: 0; position: relative;']").length > 0){
                    document.querySelectorAll("[style='border: 0px solid black; box-sizing: border-box; display: flex; flex-direction: column; align-content: flex-start; flex-shrink: 0; position: relative;']")[0].style.display = 'none'
                }

                if(document.querySelectorAll("#header").length > 0){
                    document.querySelectorAll("#header")[0].style.display = 'none'
                }

                if(document.querySelectorAll(".list_counter").length > 0){
                    document.querySelectorAll(".list_counter")[0].style.display = 'none'
                }

                if(document.querySelectorAll(".search-filter").length > 0){
                    document.querySelectorAll(".search-filter")[0].style.display = 'none'
                }

                if(document.querySelectorAll(".detail-footer").length > 0){
                    document.querySelectorAll(".detail-footer")[0].style.display = 'none'
                }

                if(document.querySelectorAll("[style='position: fixed; bottom: 29.3333vw; z-index: 1199; width: 100vw; height: 0vw; display: flex; justify-content: center; align-items: center;']").length > 0){
                  document.querySelectorAll("[style='position: fixed; bottom: 29.3333vw; z-index: 1199; width: 100vw; height: 0vw; display: flex; justify-content: center; align-items: center;']")[0].style.display = 'none'
                }

                if(document.querySelectorAll(".openModalMask").length > 0){
                  document.querySelectorAll(".openModalMask")[0].style.display = 'none'
                }

                if(document.querySelectorAll(".iosOpenModal").length > 0){
                  document.querySelectorAll(".iosOpenModal")[0].style.display = 'none'
                }

                if(document.querySelectorAll(".list-button").length > 0){
                  document.querySelectorAll(".list-button")[0].style.display = 'none'
                }

                if(document.querySelectorAll(".androidOpenModal").length > 0){
                  document.querySelectorAll(".androidOpenModal")[0].style.display = 'none'
                }

                if(document.querySelectorAll("[style='border: 0px solid black; box-sizing: border-box; display: flex; flex-direction: column; align-content: flex-start; flex-shrink: 0; position: fixed; top: 0vw; visibility: inherit;']").length > 0){
                  document.querySelectorAll("[style='border: 0px solid black; box-sizing: border-box; display: flex; flex-direction: column; align-content: flex-start; flex-shrink: 0; position: fixed; top: 0vw; visibility: inherit;']")[0].style.display = 'none'
                }
            `)
          }
        }}
      />
      <Spinner visible={loading} textContent="Đang tải.." textStyle={{color: '#fff'}} />
    </ScrollView>
  )
})

export default SuperWebview

const styles = StyleSheet.create({
  view: {
    flex: 1,
    height: '100%',
  },
})
