import {Image, Modal, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {Colors} from 'green-native-ts'
import {fonts} from '~/configs'

const ModalSelect = (props: {visible?: boolean; setVisible: Function; onPress: Function}) => {
  const {visible, setVisible, onPress} = props

  return (
    <Modal visible={visible} transparent>
      <View style={{flexDirection: 'column', backgroundColor: Colors.trans20, alignItems: 'center', flex: 1}}>
        <View style={styles.fakeBlock2} />
        <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
          <View style={styles.fakeBlock} />

          <View style={styles.containerBlock}>
            <Text style={styles.title}>Chọn sàn thương mại</Text>
            <View style={styles.containerList}>
              <TouchableOpacity onPress={() => onPress('taobao')} activeOpacity={0.7} style={styles.taobaoBlock}>
                <Image
                  resizeMode="contain"
                  source={require('~/assets/logo-taobao.png')}
                  style={{width: 'auto', height: 48, aspectRatio: 1.5}}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => onPress('1688')} activeOpacity={0.7} style={styles.block1688}>
                <Image
                  resizeMode="contain"
                  source={require('~/assets/logo-1688.png')}
                  style={{width: 'auto', height: 48, aspectRatio: 1.8}}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.fakeBlock} />
        </View>

        <View style={styles.fakeBlock2} />
      </View>
    </Modal>
  )
}

export default ModalSelect

const styles = StyleSheet.create({
  block1688: {
    backgroundColor: '#fe7100',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginLeft: 16,
  },
  taobaoBlock: {
    backgroundColor: '#fe7500',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    width: 50,
    height: 50,
  },
  containerList: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    padding: 8,
  },
  title: {
    fontSize: 18,
    color: '#000',
    fontFamily: fonts.Medium,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  containerBlock: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 8,
    padding: 8,
  },
  fakeBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fakeBlock2: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    flex: 1,
  },
})
