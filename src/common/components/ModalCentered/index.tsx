import React from 'react'
import {Modal, StatusBar, TouchableOpacity, View} from 'react-native'

const ModalCentered = ({visible, onClose, children}) => {
  return (
    <Modal visible={visible} transparent>
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" />
      <View style={{backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, width: '100%'}}>
        <TouchableOpacity onPress={onClose} style={{flex: 1, width: '100%'}} />
        <View style={{flexDirection: 'row', width: '100%'}}>
          <TouchableOpacity onPress={onClose} style={{flex: 1}} />
          <View style={{}}>{children}</View>
          <TouchableOpacity onPress={onClose} style={{flex: 1}} />
        </View>
        <TouchableOpacity onPress={onClose} style={{flex: 1, width: '100%'}} />
      </View>
    </Modal>
  )
}

export default ModalCentered
