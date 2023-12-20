import {Alert, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {colors, fonts} from '~/configs'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Colors, GreenStyles, Icon, isIOS, parseMoney, windowWidth} from 'green-native-ts'
import {useGlobalContext} from '~/provider/AppProvider'
import {logout, wait} from '~/common'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import {getReadableVersion} from 'react-native-device-info'
import {Divider, HeaderWhite} from '~/common/components'
import GreenAvatar from '~/common/components/Avatar'
import GreenTag from '~/common/components/GreenTag'

function Item(props: any) {
  const {onPress, icon, title, iconColor} = props

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{flexDirection: 'row', alignItems: 'center'}}>
      <View
        style={{
          width: 36,
          height: 36,
          backgroundColor: iconColor,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 16,
        }}>
        {icon}
      </View>
      <Text style={{fontFamily: fonts.Medium, fontSize: 16, color: '#000', flex: 1}}>{title}</Text>
      <Icon type="materialicons" name="chevron-right" size={22} color="#000" />
    </TouchableOpacity>
  )
}

const UserTab = () => {
  const insets = useSafeAreaInsets()
  const focused = useIsFocused()

  const {user, setUser, isProd, is} = useGlobalContext()
  const [loading, setLoading] = useState<boolean>(false)

  const navigation = useNavigation<any>()

  function handleLogout() {
    logout(setUser)
  }

  return (
    <>
      {focused && <StatusBar barStyle="dark-content" />}

      <HeaderWhite canBack={false}>Tài khoản</HeaderWhite>

      <ScrollView style={{flex: 1}}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => navigation.navigate('UserInformation')}
          style={[{width: windowWidth - 32}, styles.itemContainer]}>
          <GreenAvatar
            key="user-avt"
            source={user?.Avatar}
            imageProps={{
              style: {width: 66, height: 66},
            }}
          />

          <View style={{marginLeft: 16, alignItems: 'flex-start', flex: 1}}>
            <Text style={styles.fullName}>{user?.FullName}</Text>
            <Text style={[styles.phone, {marginBottom: 4}]}>{user?.UserName}</Text>
            <GreenTag rounded={99} background={user?.RoleId == 3 ? 'blue' : 'green'}>
              <Text style={{fontFamily: fonts.Medium, fontSize: 11, color: '#fff'}}>{user?.RoleName}</Text>
            </GreenTag>
          </View>

          <Icon type="materialicons" name="chevron-right" size={22} color="#000" />
        </TouchableOpacity>

        <View style={[styles.itemContainer, {width: windowWidth - 32, flexDirection: 'column'}]}>
          {is.parent && (
            <>
              <Item
                onPress={() => navigation.navigate('Students')}
                icon={<Image source={require('~/assets/icons/group_line.png')} style={{width: 24, height: 24}} />}
                iconColor="#3391e7"
                title="Học viên"
              />

              <Divider marginVertical={16} />
            </>
          )}

          <Item
            onPress={() => navigation.navigate('UserPassword')}
            icon={<Image source={require('~/assets/icons/key.png')} style={{width: 26, height: 26}} />}
            iconColor="#3391e7"
            title="Đổi mật khẩu"
          />

          <Divider marginVertical={16} />

          <Item
            onPress={() => navigation.navigate('UserAddress')}
            icon={<Image source={require('~/assets/icons/home_4_line.png')} style={{width: 22, height: 22}} />}
            iconColor="#3391e7"
            title="Thay đổi địa chỉ"
          />

          {is.student && (
            <>
              <Divider marginVertical={16} />

              <Item
                onPress={() => navigation.navigate('UserLearn')}
                icon={<Image source={require('~/assets/icons/book_line.png')} style={{width: 22, height: 22}} />}
                iconColor="#3391e7"
                title="Thông tin học"
              />
            </>
          )}

          <Divider marginVertical={16} />

          <Item
            onPress={() => navigation.navigate('PaymentHistories')}
            icon={<Image source={require('~/assets/icons/paper_line.png')} style={{width: 22, height: 22}} />}
            iconColor="#3391e7"
            title="Lịch sử thanh toán"
          />

          <Divider marginVertical={16} />

          <Item
            onPress={() => navigation.navigate('LearningHistory')}
            icon={<Image source={require('~/assets/icons/lr-switch.png')} style={{width: 22, height: 22}} />}
            iconColor="#3391e7"
            title="Lịch sử học"
          />

          <Divider marginVertical={16} />

          <Item
            onPress={() => navigation.navigate('Feedback')}
            icon={<Image source={require('~/assets/icons/message-dots.png')} style={{width: 20, height: 20}} />}
            iconColor="#3391e7"
            title="Phản hồi cho trung tâm"
          />
        </View>

        <View style={[styles.itemContainer, {width: windowWidth - 32, flexDirection: 'column'}]}>
          <Item
            onPress={handleLogout}
            icon={<Image source={require('~/assets/icons/out.png')} style={{width: 24, height: 24}} />}
            iconColor="#f27375"
            title="Đăng xuất"
          />
        </View>

        {/* <Item
          onPress={() => {
            Alert.alert(
              'Yêu cầu xoá tài khoản',
              'Sau khi nhận yêu cầu, chúng tôi sẽ tiến hành xác thực và xoá toàn bộ dữ liệu của bạn trong 24 giờ.\n\nDữ liệu sau khi xoá sẽ không thể khôi phục.',
              [
                {
                  text: 'Huỷ',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: async () => {
                    setLoading(true)
                    await wait(3000)
                    setLoading(false)
                    Alert.alert('Yêu cầu đã được gửi đi', 'Chúng tôi sẽ xử lý trong 24 giờ.')
                  },
                },
              ],
            )
          }}
          icon={<Icon type="ionicons" name="close-sharp" size={20} color="#fff" />}
          iconColor="#F44336"
          title="Xoá tài khoản"
        />

        <View style={styles.divider} />

     */}

        <Text style={styles.appVersion}>v{getReadableVersion()}</Text>

        <View style={{height: 24}}></View>
      </ScrollView>

      <Spinner visible={loading} textContent={'Đang xử lý...'} textStyle={{color: '#fff'}} />
    </>
  )
}

export default UserTab

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
  appVersion: {textAlign: 'center', fontSize: 16, fontFamily: fonts.Regular, marginTop: 16},
  divider: {
    width: windowWidth - 32,
    marginHorizontal: 16,
    height: 1,
    backgroundColor: Colors.trans10,
    marginTop: 16,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: fonts.Bold,
    fontSize: 20,
    color: '#fff',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.trans05,
  },
  fullName: {fontFamily: fonts.Bold, fontSize: 14, color: '#000'},
  phone: {fontFamily: fonts.Semibold, fontSize: 14},
})
