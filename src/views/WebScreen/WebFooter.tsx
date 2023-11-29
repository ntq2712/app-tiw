import {ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {useGlobalContext} from '~/provider/AppProvider'
import {colors, fonts} from '~/configs'
import {Colors} from 'green-native-ts'

const WebFooter = ({onPressProps, addingToCart, onPressAddToCard}) => {
  const {isDetail, wvProcess, webState} = useGlobalContext()

  const isShowOrder = webState?.url.includes('taobao') || webState?.url.includes('1688.com/offer/')

  return (
    <>
      {isDetail && wvProcess >= 70 && (
        <View style={styles.container}>
          {webState?.url.includes('taobao') && (
            <TouchableOpacity activeOpacity={0.7} style={styles.btnProps} onPress={onPressProps}>
              <Text style={styles.btnText}>Thuộc tính</Text>
            </TouchableOpacity>
          )}

          {isShowOrder && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnAddToCard}
              onPress={addingToCart ? () => {} : onPressAddToCard}>
              {!addingToCart && <Text style={styles.btnText}>Đặt hàng</Text>}
              {addingToCart && <Text style={styles.btnText}>Đang xử lý</Text>}
              {addingToCart && <ActivityIndicator color="#fff" size="small" style={{marginLeft: 8}} />}
            </TouchableOpacity>
          )}
        </View>
      )}
      <SafeAreaView />
    </>
  )
}

export default WebFooter

const styles = StyleSheet.create({
  btnText: {color: '#fff', fontFamily: fonts.Semibold, textAlign: 'center'},
  container: {
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: Colors.trans10,
  },
  btnAddToCard: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    height: 36,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  btnProps: {
    backgroundColor: 'green',
    borderRadius: 6,
    height: 36,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginVertical: 16,
  },
})
