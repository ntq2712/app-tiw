import {windowWidth} from 'green-native-ts'
import React, {useState} from 'react'
import {StatusBar, View} from 'react-native'
import * as Animatable from 'react-native-animatable'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {LocalStorage} from '~/common'
import {GStatusBar} from '~/common/components'
import Button from '~/common/components/Button'
import {colors, fonts} from '~/configs'
import {useGlobalContext} from '~/provider/AppProvider'

const WelcomeScreen = () => {
  const [curStep, setCurStep] = useState(1)

  const {setIsWelcome} = useGlobalContext()

  const insets = useSafeAreaInsets()

  async function handleWelcome() {
    setIsWelcome(false)
    LocalStorage.setWelcome()
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar barStyle="dark-content" />

      {curStep == 1 && (
        <View
          style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, height: '100%'}}>
          <Animatable.Image
            resizeMode="contain"
            source={require('~/assets/images/welcome-01.png')}
            style={{width: windowWidth - 32, height: windowWidth - 32}}
            animation="zoomInUp"
          />

          <Animatable.Text
            animation="zoomInUp"
            style={{fontFamily: fonts.Bold, fontSize: 28, color: colors.primary, marginTop: 32}}>
            GDC Xin chào
          </Animatable.Text>

          <Animatable.Text
            animation="zoomInUp"
            style={{
              fontFamily: fonts.Regular,
              fontSize: 14,
              color: '#999999',
              paddingHorizontal: 24,
              marginTop: 8,
              textAlign: 'center',
              lineHeight: 21,
            }}>
            Trung tâm Anh ngữ GDC English là đơn vị cung cấp dịch vụ học ngoại ngữ và luyện thi IELTS - TOEIC uy tín cho
            học viên
          </Animatable.Text>
        </View>
      )}

      {curStep == 2 && (
        <View
          style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, height: '100%'}}>
          <Animatable.Image
            resizeMode="contain"
            source={require('~/assets/images/welcome-02.png')}
            style={{width: windowWidth - 32, height: windowWidth - 100, borderRadius: 12}}
            animation="zoomInUp"
          />

          <Animatable.Text
            animation="zoomInUp"
            style={{fontFamily: fonts.Bold, fontSize: 28, color: colors.primary, marginTop: 32}}>
            Mục tiêu
          </Animatable.Text>

          <Animatable.Text
            animation="zoomInUp"
            style={{
              fontFamily: fonts.Regular,
              fontSize: 14,
              color: '#999999',
              paddingHorizontal: 24,
              marginTop: 8,
              textAlign: 'center',
              lineHeight: 21,
            }}>
            Mục tiêu cốt lõi của GDC là đồng hành cùng học viên chinh phục thành công chứng chỉ IELTS, TOEIC,... và có
            khả năng sử dụng Tiếng Anh hiệu quả trong thực tế
          </Animatable.Text>
        </View>
      )}

      {curStep == 3 && (
        <View
          style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, height: '100%'}}>
          <Animatable.Image
            resizeMode="contain"
            source={require('~/assets/images/welcome-03.png')}
            style={{width: windowWidth - 32, height: windowWidth - 32, borderRadius: 8}}
            animation="zoomInUp"
          />

          <Animatable.Text
            animation="zoomInUp"
            style={{fontFamily: fonts.Bold, fontSize: 28, color: colors.primary, marginTop: 32}}>
            Giá trị cốt lõi
          </Animatable.Text>

          <Animatable.Text
            animation="zoomInUp"
            style={{
              fontFamily: fonts.Regular,
              fontSize: 14,
              color: '#999999',
              paddingHorizontal: 24,
              marginTop: 8,
              textAlign: 'center',
              lineHeight: 21,
            }}>
            Tâm - Tầm - Tín với sứ mệnh đem đến dịch vụ và chất lượng học tậptốt nhất cho học viên. Hàng trăm học viên
            đạt kết quả cao trong kỳ thi IELTS - TOEIC chính là minh chứng rõ ràng nhất cho lời cam kết của GDC.
          </Animatable.Text>
        </View>
      )}

      <Animatable.View
        animation="slideInUp"
        style={{
          width: windowWidth,
          paddingHorizontal: 16,
          marginTop: 46,
          marginBottom: 16 + insets.bottom,
          zIndex: 999,
        }}>
        <Button
          activeOpacity={0.7}
          style={{borderRadius: 8, height: 50}}
          onPress={() => {
            if (curStep != 3) {
              setCurStep(curStep + 1)
            } else {
              handleWelcome()
            }
          }}>
          {curStep == 3 ? 'Đăng nhập' : 'Tiếp tục'}
        </Button>
      </Animatable.View>
    </View>
  )
}

export default WelcomeScreen
