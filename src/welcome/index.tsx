import {windowWidth} from 'green-native-ts'
import React, {useState} from 'react'
import {View} from 'react-native'
import * as Animatable from 'react-native-animatable'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {LocalStorage} from '~/common'
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
            Chào mừng
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
            Trung tâm ngoại ngữ GDC English là đơn vị cung cấp dịch vụ học ngoại ngữ và luyện thi IELTS uy tín cho học
            viên tại khu vực tỉnh Hưng Yên
          </Animatable.Text>
        </View>
      )}

      {curStep == 2 && (
        <View
          style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, height: '100%'}}>
          <Animatable.Image
            resizeMode="contain"
            source={require('~/assets/images/welcome-02.png')}
            style={{width: windowWidth - 32, height: windowWidth - 32}}
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
            Mục tiêu cốt lõi của hệ thống đào tạo tại GDC là đưa học sinh đến với đỉnh cao của tiếng Anh một cách thực
            chất
          </Animatable.Text>
        </View>
      )}

      {curStep == 3 && (
        <View
          style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, height: '100%'}}>
          <Animatable.Image
            resizeMode="contain"
            source={require('~/assets/images/welcome-03.png')}
            style={{width: windowWidth - 32, height: windowWidth - 32}}
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
            Giá trị cốt lõi trong hoạt động của cả công ty và trung tâm là 3T - Tâm - Tầm - Tín
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
