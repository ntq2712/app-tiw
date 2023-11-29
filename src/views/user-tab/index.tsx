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

function Item(props: any) {
  const {onPress, icon, title, iconColor} = props

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[{width: windowWidth - 32}, styles.itemContainer]}>
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
      <Icon type="MaterialIcons" name="chevron-right" size={22} color="#000" />
    </TouchableOpacity>
  )
}

const UserTab = () => {
  const insets = useSafeAreaInsets()
  const focused = useIsFocused()

  const {user, setUser, isProd} = useGlobalContext()
  const [loading, setLoading] = useState<boolean>(false)

  const navigation = useNavigation<any>()

  function handleLogout() {
    logout(setUser)
  }

  return (
    <>
      {focused && <StatusBar barStyle="light-content" />}

      <View style={[{paddingTop: isIOS() ? insets.top + 4 : insets.top + 12}, styles.headerContainer]}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.headerTitle}>Quản lý tài khoản</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{flex: 1}}>
        <View style={[{width: windowWidth - 32}, styles.itemContainer]}>
          <Image
            source={user?.ImgUser ? {uri: user?.ImgUser} : require('~/assets/images/logo.png')}
            style={styles.avatar}
          />
          <View style={{marginLeft: 16}}>
            <Text style={styles.fullName}>{user?.FirstName + ' ' + user?.LastName}</Text>
            <Text style={styles.phone}>{user?.UserName}</Text>
          </View>
        </View>

        {isProd && (
          <>
            <TouchableOpacity
              onPress={() => {
                Alert.alert('Tính năng đang phát triển', 'Vui lòng thử lại sau')
              }}
              activeOpacity={0.7}
              style={[styles.itemContainer, {width: windowWidth - 32}]}>
              <View style={{flex: 1}}>
                <Text style={{fontFamily: fonts.Medium, fontSize: 16, color: '#000', flex: 1}}>Ví của bạn</Text>
                <Text style={{fontFamily: fonts.Bold, fontSize: 22, color: colors.primary, flex: 1}}>
                  {parseMoney(user?.Wallet + '')}
                  <Text style={{fontSize: 14}}> VNĐ</Text>
                </Text>
              </View>
              <Icon type="MaterialIcons" name="chevron-right" size={22} color="#000" />
            </TouchableOpacity>

            <Item
              onPress={() => navigation.navigate('RechargeScreen')}
              icon={<Icon type="MaterialCommunityIcons" name="bank" size={18} color="#fff" />}
              iconColor="#66BB6A"
              title="Nạp tiền"
            />
          </>
        )}

        {isProd && (
          <Item
            onPress={() => navigation.navigate('Orders')}
            icon={<Icon type="MaterialCommunityIcons" name="cart" size={18} color="#fff" />}
            iconColor="#E91E63"
            title="Đơn hàng của bạn"
          />
        )}

        <Item
          onPress={() => navigation.navigate('UserInformation')}
          icon={<Icon type="FontAwesome5" name="user-edit" size={16} color="#fff" />}
          iconColor="#3391e7"
          title="Thay đổi thông tin"
        />

        <Item
          onPress={() => navigation.navigate('UserPassword')}
          icon={<Icon type="FontAwesome5" name="edit" size={16} color="#fff" />}
          iconColor="#b44ac6"
          title="Đổi mật khẩu"
        />

        <Item
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
          icon={<Icon type="Ionicons" name="close-sharp" size={20} color="#fff" />}
          iconColor="#F44336"
          title="Xoá tài khoản"
        />

        <View style={styles.divider} />

        <Item
          onPress={handleLogout}
          icon={<Icon type="MaterialIcons" name="logout" size={18} color="#fff" />}
          iconColor="#f27375"
          title="Đăng xuất"
        />

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
  fullName: {fontFamily: fonts.Semibold, fontSize: 16, color: '#000'},
  phone: {fontFamily: fonts.Semibold, fontSize: 16},
})
