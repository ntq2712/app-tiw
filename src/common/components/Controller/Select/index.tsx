import {View, Text, StyleSheet, TouchableOpacity, Modal, StatusBar, Alert, FlatList} from 'react-native'
import React, {FC, useState} from 'react'
import {Controller} from 'react-hook-form'
import {TSelectController} from '../controller'
import appConfigs, {fonts} from '~/configs'
import {Colors, Icon, isIOS, windowWidth} from 'green-native-ts'
import {headerStyles, whiteStyles} from '../../Header/header.styles'
import Empty from '../../Empty'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

const Select: FC<TSelectController> = props => {
  const {label, name, control, required = true, hideError = false, onChangeValue} = props
  const {style, errors, wrapStyle, closeOnPress = true, headerTitle, data, inputStyle} = props

  const insets = useSafeAreaInsets()

  function getSelectedItem(value) {
    if (data.length == 0) {
      return 'Nhấn để chọn'
    }
    if (data.length > 0) {
      const thisIndex = data.findIndex(item => item?.value == value)

      if (thisIndex != -1) {
        return data[thisIndex].title
      }
    }
    return 'Nhấn để chọn'
  }

  const [visible, setVisible] = useState<boolean>(false)

  function toggle() {
    if (!visible && data.length == 0) {
      Alert.alert('', 'Không có dữ liệu')
    }
    setVisible(!visible)
  }

  return (
    <>
      <View style={!!wrapStyle ? {...wrapStyle} : {}}>
        <Text style={styles.lable}>{label} </Text>
        <View style={{...styles.wrapInput, ...style}}>
          <Controller
            control={control}
            rules={{required: required}}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <TouchableOpacity onPress={toggle} style={{...styles.input, ...inputStyle}}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 14,
                      fontFamily: fonts.Medium,
                      opacity: getSelectedItem(value) == 'Nhấn để chọn' ? 0.3 : 1,
                    }}>
                    {getSelectedItem(value)}
                  </Text>
                </TouchableOpacity>

                <Modal visible={visible} transparent animationType="none">
                  <View style={{backgroundColor: '#f2f2f2', flex: 1}}>
                    {isIOS() && <View style={{height: insets.top, backgroundColor: '#fff'}} />}
                    {visible ? <StatusBar barStyle="dark-content" /> : <></>}

                    <View style={[{paddingTop: 16}, whiteStyles.headerContainer]}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={toggle}
                        style={[headerStyles.btnBack, {opacity: 1}]}>
                        <Icon type="materialicons" name="arrow-back-ios" color="#000" size={16} />
                      </TouchableOpacity>

                      <View style={headerStyles.title}>
                        <Text numberOfLines={1} style={headerStyles.headerTitle}>
                          {headerTitle}
                        </Text>
                      </View>

                      <TouchableOpacity style={headerStyles.right}>
                        <Icon type="materialicons" name="arrow-back-ios" color="#fff" size={16} />
                      </TouchableOpacity>
                    </View>

                    <FlatList
                      data={data}
                      renderItem={({item}) => {
                        const activated = value == item?.value

                        return (
                          <TouchableOpacity
                            onPress={() => {
                              onChange(item?.value)
                              !!onChangeValue && onChangeValue(item?.value)
                              if (closeOnPress) {
                                toggle()
                              }
                            }}
                            activeOpacity={activated ? 1 : 0.7}
                            style={{
                              width: windowWidth - 32,
                              marginLeft: 16,
                              padding: 16,
                              paddingVertical: 14,
                              backgroundColor: '#fff',
                              borderRadius: 8,
                              marginTop: 16,
                              flexDirection: 'row',
                              alignItems: 'center',
                              borderWidth: 1,
                              borderColor: activated ? '#1E88E5' : '#fff',
                            }}>
                            <Text style={[headerStyles.headerTitle, {flex: 1}]}>{item?.title || ''}</Text>
                          </TouchableOpacity>
                        )
                      }}
                      keyExtractor={(item: any) => {
                        return item?.Id
                      }}
                      ListEmptyComponent={<Empty />}
                      ListFooterComponent={<View style={{height: 16}} />}
                    />
                  </View>
                </Modal>
              </>
            )}
            name={name}
          />

          <View style={{marginTop: 2, marginRight: 4}}>
            <Icon name="arrow-drop-up" type="materialicons" size={26} color={Colors.trans50} />
            <Icon
              name="arrow-drop-down"
              type="materialicons"
              size={26}
              style={{marginTop: -18}}
              color={Colors.trans50}
            />
          </View>
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

export default Select
