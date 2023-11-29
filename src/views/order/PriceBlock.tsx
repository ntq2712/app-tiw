import {Text, StyleSheet, View} from 'react-native'
import React, {FC} from 'react'
import {Colors, parseMoney} from 'green-native-ts'
import {fonts} from '~/configs'

const PriceItem: FC<{
  title: string
  value: string | number
  hiddeLine?: boolean
  suffix?: React.ReactElement | string | number
}> = ({title, value, hiddeLine, suffix}) => {
  return (
    <>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text style={{color: '#000', fontSize: 16, fontFamily: fonts.Regular}}>{title}</Text>
        <Text style={{color: '#000', fontSize: 16, fontFamily: fonts.Semibold}}>
          {!!value ? parseMoney(value + '') : 0}
          {!!suffix && suffix}
        </Text>
      </View>
      {!hiddeLine && (
        <View style={{width: '100%', marginTop: 8, marginBottom: 6, backgroundColor: Colors.trans10, height: 1}} />
      )}
    </>
  )
}

function PriceBlock({detail}) {
  return (
    <>
      <View style={{width: '100%', backgroundColor: '#fff', marginTop: 8, padding: 16}}>
        <PriceItem title="Tiền hàng" value={detail?.PriceVND} suffix={` (¥${detail?.PriceCNY})`} />
        <PriceItem title="Tổng số lượng SP" value={detail?.Quantity} />
        <PriceItem title="Phí dịch vụ" value={detail?.FeeBuyPro} />
        <PriceItem title="Phí kiểm đếm" value={detail?.IsCheckProductPrice} />
        <PriceItem title="Phí ship TQ" value={detail?.FeeShipCN} />
        <PriceItem title="Phí cân nặng" value={detail?.FeeWeight} />
        <PriceItem title="Phí bảo hiểm" value={detail?.FeeInsurrance} />
        <PriceItem title="Phí đóng gỗ" value={detail?.IsPackedPrice} />
        <PriceItem hiddeLine title="Phí giao tận nhà" value={detail?.IsFastDeliveryPrice} />
      </View>

      <View style={{width: '100%', backgroundColor: '#fff', marginTop: 8, padding: 16}}>
        <PriceItem title="Phải cọc" value={detail?.AmountDeposit} />
        <PriceItem title="Đã thanh toán" value={detail?.Deposit} suffix={0} />
        <PriceItem hiddeLine title="Cần thanh toán" value={detail?.InDebt} />

        {/* <PriceItem title="Trọng lượng" value={detail?.OrderWeight} /> */}
        {/* <PriceItem hiddeLine title="Tổng" value={detail?.TotalPriceVND} /> */}

        <View style={styles.totalBlock}>
          <Text style={styles.totalTitle}>Tổng</Text>
          <Text style={styles.totalTitle}>{!!detail?.TotalPriceVND ? parseMoney(detail?.TotalPriceVND + '') : 0}</Text>
        </View>
      </View>
    </>
  )
}

export default PriceBlock

const styles = StyleSheet.create({
  totalBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.trans05,
    paddingVertical: 4,
    paddingBottom: 6,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 16,
  },
  totalTitle: {color: '#000', fontSize: 18, fontFamily: fonts.Semibold},
})
