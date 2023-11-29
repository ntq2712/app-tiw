import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {Colors, Icon} from 'green-native-ts'
import {fonts} from '~/configs'

const Header1688 = props => {
  const {priceStep, data1688, setFilter, setNumberData, extendInfo} = props

  function handleClose() {
    setFilter(false)
    setNumberData([])
  }

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {priceStep.length > 0 ? (
          priceStep.map(item => {
            return (
              <View style={styles.leftItem}>
                <Text style={styles.leftTitle}>¥ {item.PriceText}</Text>
                <Text style={styles.leftValue}>{item.unitText}</Text>
              </View>
            )
          })
        ) : (
          <View style={styles.priceScale}>
            <Text style={styles.priceScaleTitle}>{data1688?.skuModel?.skuPriceScale || ''}</Text>
            <Text style={styles.priceScaleValue}>{extendInfo || ''}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity activeOpacity={0.7} onPress={handleClose} style={{marginTop: 8}}>
        <Icon type={'Feather'} name={'x'} size={20} color={'#000'} />
      </TouchableOpacity>
    </View>
  )
}

export default Header1688

const styles = StyleSheet.create({
  priceScaleValue: {fontSize: 12, color: Colors.trans50, marginLeft: 8, fontFamily: fonts.Regular},
  priceScaleTitle: {fontSize: 16, color: '#000', marginLeft: 8, fontFamily: fonts.Semibold},
  priceScale: {flexDirection: 'row', alignItems: 'center'},
  leftValue: {fontSize: 14, color: Colors.trans50, marginLeft: 8, fontFamily: fonts.Regular},
  leftTitle: {fontSize: 18, color: '#000', marginLeft: 8, fontFamily: fonts.Semibold},
  leftItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginTop: 16,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    width: '100%',
  },
  left: {alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', width: '100%', flex: 1},
})
