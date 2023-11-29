import {Clipboard, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {Colors, Icon, isIOS, windowWidth} from 'green-native-ts'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import {colors, fonts} from '~/configs'
import {useGlobalContext} from '~/provider/AppProvider'

const RechargeScreen = () => {
  const insets = useSafeAreaInsets()

  const navigation = useNavigation<any>()

  const {user} = useGlobalContext()

  return (
    <>
      <StatusBar barStyle="light-content" />

      <View style={[{paddingTop: isIOS() ? insets.top + 4 : insets.top + 12}, styles.headerContainer]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={{alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16}}>
          <Icon type="MaterialIcons" name="arrow-back-ios" color="#fff" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.headerTitle}>Hướng dẫn nạp tiền</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, opacity: 0}}>
          <Icon type="MaterialIcons" name="arrow-back-ios" color="#fff" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={{width: '100%', alignItems: 'center', padding: 16}}>
          <Text style={{fontFamily: fonts.Semibold, color: '#000', fontSize: 20}}>Chuyển khoản qua ngân hàng</Text>

          <View style={{padding: 16, borderRadius: 8, marginTop: 16, width: '100%', backgroundColor: Colors.trans05}}>
            <Text style={{fontFamily: fonts.Semibold, color: colors.primary, fontSize: 16, textAlign: 'center'}}>
              Ngân hàng Thương mại Cổ phần Tiên Phong
            </Text>

            <View style={{width: '100%', height: 1, marginTop: 8, backgroundColor: Colors.trans10}} />

            <View style={{flexDirection: 'row', width: '100%', marginTop: 8, justifyContent: 'space-between'}}>
              <Text style={{fontFamily: fonts.Regular, color: '#000', fontSize: 14}}>Tên:</Text>
              <Text style={{fontFamily: fonts.Semibold, color: '#000', fontSize: 16}}>Phạm Bá Thiết</Text>
            </View>

            <View style={{flexDirection: 'row', width: '100%', marginTop: 8, justifyContent: 'space-between'}}>
              <Text style={{fontFamily: fonts.Regular, color: '#000', fontSize: 14}}>Số tài khoản:</Text>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: fonts.Semibold,
                    color: '#000',
                    marginRight: 6,
                    fontSize: 16,
                  }}>
                  05235444319
                </Text>
                <TouchableOpacity
                  onPress={() => Clipboard.setString('05235444319')}
                  activeOpacity={0.7}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: colors.primary,
                    borderRadius: 6,
                    paddingHorizontal: 4,
                    paddingBottom: 3,
                    paddingTop: 1,
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.Bold,
                      color: '#fff',
                      marginRight: 4,
                      fontSize: 12,
                    }}>
                    Copy
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{flexDirection: 'row', width: '100%', marginTop: 8, justifyContent: 'space-between'}}>
              <Text style={{fontFamily: fonts.Regular, color: '#000', fontSize: 14}}>Chi nhánh:</Text>
              <Text style={{fontFamily: fonts.Semibold, color: '#000', fontSize: 16}}>Chi nhánh Sài Gòn</Text>
            </View>

            <View
              style={{
                flexDirection: 'column',
                width: '100%',
                marginTop: 16,
                backgroundColor: '#fff',
                padding: 16,
                borderRadius: 8,
              }}>
              <Text style={{fontFamily: fonts.Regular, color: '#000', fontSize: 14}}>Nội dung:</Text>

              <View style={{flexDirection: 'row', marginTop: 8, alignItems: 'center'}}>
                <Text
                  numberOfLines={1}
                  style={{fontFamily: fonts.Semibold, color: '#000', marginRight: 6, fontSize: 14}}>
                  {/* {`PIGET ${user?.UserName} ${user?.Phone}`} */}
                </Text>
                <TouchableOpacity
                  onPress={() => Clipboard.setString(`PIGET ${user?.UserName} ${user?.Phone}`)}
                  activeOpacity={0.7}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: colors.primary,
                    borderRadius: 6,
                    paddingHorizontal: 4,
                    paddingBottom: 3,
                    paddingTop: 1,
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.Bold,
                      color: '#fff',
                      marginRight: 4,
                      fontSize: 12,
                    }}>
                    Copy
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{paddingTop: 8, borderRadius: 8, marginTop: 16, backgroundColor: '#fff'}}>
            {/* <Image
              resizeMode="contain"
              source={{
                uri: `https://img.vietqr.io/image/tpb-05235444319-compact2.jpg?addInfo=PIGET%20${user?.UserName}%20${user?.Phone}&accountName=PIGET%20${user?.UserName}%${user?.Phone}`,
              }}
              style={{
                width: windowWidth - 32,
                height: windowWidth + 32,
                borderRadius: 8,
              }}
            /> */}
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default RechargeScreen

const styles = StyleSheet.create({
  headerTitle: {fontFamily: fonts.Bold, fontSize: 20, color: '#fff'},
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingBottom: 12,
  },
})
