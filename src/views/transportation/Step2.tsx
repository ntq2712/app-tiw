import {FlatList, Clipboard, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {FC} from 'react'
import {Colors, Icon} from 'green-native-ts'
import {fonts} from '~/configs'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import TheInput from './TheInput'

type TOtherOrderStep2 = {
  step: number
  items: Array<any>
  setItems: Function
}

const CreateTransStep2: FC<TOtherOrderStep2> = props => {
  const {step, items, setItems} = props

  const insets = useSafeAreaInsets()

  function setItemValues(index, field, value) {
    let temp = [...items]
    temp[index][field] = value
    setItems([...temp])
  }

  function removeItemAtIndex(arr, index) {
    // Kiểm tra index có hợp lệ không
    if (index < 0 || index >= arr.length) {
      console.error('Index không hợp lệ')
      return arr
    }

    // Sử dụng slice để tạo một bản sao của mảng và loại bỏ phần tử tại index
    const updatedArray = [...arr.slice(0, index), ...arr.slice(index + 1)]

    setItems(updatedArray)
  }

  return (
    <>
      {step == 2 && (
        <>
          <View style={styles.step2Wrapper}>
            <FlatList
              data={items}
              renderItem={({item, index}) => {
                return (
                  <View style={[styles.itemWrapper, {marginTop: index > 0 ? 16 : 0}]}>
                    <View style={styles.itemHeader}>
                      <View style={styles.productIndex}>
                        <Text style={{fontFamily: fonts.Semibold, color: '#fff'}}>Kiện: {index + 1}</Text>
                      </View>

                      {index > 0 && (
                        <TouchableOpacity
                          onPress={() => removeItemAtIndex(items, index)}
                          activeOpacity={0.7}
                          style={{paddingLeft: 8, borderRadius: 8}}>
                          <Icon type="Ionicons" name="close" color="#F44336" size={26} />
                        </TouchableOpacity>
                      )}
                    </View>

                    <View style={[styles.inputWrapper, {marginTop: 16, width: '100%'}]}>
                      <TheInput
                        defaultValue={item?.OrderCode}
                        onBlur={text => setItemValues(index, 'OrderCode', text)}
                        placeholder="Mã vận đơn"
                      />
                      <TouchableOpacity
                        onPress={async () => {
                          const clipText = await Clipboard.getString()
                          setItemValues(index, 'OrderCode', clipText)
                        }}
                        activeOpacity={0.7}
                        style={styles.btnPaste}>
                        <Icon type="FontAwesome5" color="#2196F3" size={16} name="paste" />
                      </TouchableOpacity>
                    </View>

                    <View style={[styles.inputWrapper, {marginTop: 16}]}>
                      <TheInput
                        defaultValue={item?.ProductName}
                        onBlur={text => setItemValues(index, 'ProductName', text)}
                        placeholder="Tên sản phẩm"
                      />
                      <TouchableOpacity
                        onPress={async () => {
                          const clipText = await Clipboard.getString()
                          setItemValues(index, 'ProductName', clipText)
                        }}
                        activeOpacity={0.7}
                        style={styles.btnPaste}>
                        <Icon type="FontAwesome5" color="#2196F3" size={16} name="paste" />
                      </TouchableOpacity>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
                      <View style={[styles.inputWrapper, {marginTop: 16, flex: 1}]}>
                        <TheInput
                          keyboardType="number-pad"
                          defaultValue={item?.Weight}
                          onBlur={text => setItemValues(index, 'Weight', text)}
                          placeholder="Cân nặng (Kg)"
                        />
                      </View>

                      <View style={[styles.inputWrapper, {marginTop: 16, flex: 1, marginLeft: 16}]}>
                        <TheInput
                          keyboardType="number-pad"
                          defaultValue={item?.Quantity}
                          onBlur={text => setItemValues(index, 'Quantity', text)}
                          placeholder="Số lượng"
                        />
                      </View>
                    </View>

                    <View style={[styles.inputWrapper, {marginTop: 16, flex: 1}]}>
                      <TheInput
                        keyboardType="number-pad"
                        defaultValue={item?.Price}
                        onBlur={text => setItemValues(index, 'Price', text)}
                        placeholder="Giá trị"
                      />
                    </View>
                  </View>
                )
              }}
              keyExtractor={(item: any) => {
                return item?.ProductLink
              }}
              scrollEnabled={false}
            />
          </View>
        </>
      )}
    </>
  )
}

export default CreateTransStep2

const styles = StyleSheet.create({
  step2Wrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 8,
    padding: 16,
  },
  productIndex: {
    paddingHorizontal: 8,
    borderRadius: 8,
    paddingVertical: 4,
    paddingTop: 3,
    backgroundColor: '#2196F3',
  },
  itemHeader: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  semi16: {fontFamily: fonts.Semibold, fontSize: 16},
  btnPaste: {
    paddingHorizontal: 12,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemWrapper: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'flex-start',
    backgroundColor: Colors.trans05,
  },
  inputWrapper: {
    height: 36,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.trans10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: '100%',
    flex: 1,
    padding: 0,
    paddingHorizontal: 12,
    borderRadius: 9,
  },
})
