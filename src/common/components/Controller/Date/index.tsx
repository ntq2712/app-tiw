import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React, {FC, useState} from 'react'
import {Controller} from 'react-hook-form'
import {TDateController} from '../controller'
import appConfigs, {fonts} from '~/configs'
import {Colors, Icon} from 'green-native-ts'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'

const DatePicker: FC<TDateController> = props => {
  const {label, name, control, required = true, hideError = false} = props
  const {style, errors, wrapStyle, placeholder, inputStyle} = props

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date, callback) => {
    callback(date)
    hideDatePicker()
  }

  function getSelectedItem(value) {
    if (!!value) {
      return moment(value).format('DD/MM/YYYY')
    }
    return placeholder || ''
  }

  const [visible, setVisible] = useState<boolean>(false)

  return (
    <>
      <View style={!!wrapStyle ? {...wrapStyle} : {}}>
        <Text style={styles.lable}>{label} </Text>
        <View style={{...styles.wrapInput, ...style}}>
          <Controller
            control={control}
            rules={{required: required}}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={showDatePicker}
                    style={{...styles.input, ...inputStyle, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: '#000', flex: 1, fontSize: 14, fontFamily: fonts.Medium}}>
                      {getSelectedItem(value)}
                    </Text>
                    <Icon
                      type="MaterialCommunityIcons"
                      name="calendar"
                      size={20}
                      color={Colors.trans50}
                      style={{marginRight: -4}}
                    />
                  </TouchableOpacity>

                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={date => handleConfirm(date, onChange)}
                    onCancel={hideDatePicker}
                  />
                </>
              )
            }}
            name={name}
          />
        </View>

        {!hideError && errors && <Text style={{color: 'red', marginTop: 5}}>Không được bỏ trống</Text>}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 50,
    flex: 1,
    fontFamily: appConfigs.fonts.Medium,
    color: '#000',
    justifyContent: 'center',
  },
  wrapInput: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    flexDirection: 'row',
  },
  lable: {
    color: '#000',
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: appConfigs.fonts.Bold,
  },
})

export default DatePicker
