import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Colors, Icon} from 'green-native-ts'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import {colors} from '~/configs'
import {useGlobalContext} from '~/provider/AppProvider'

const WebHeader = ({searchText, setSearchText, webview, handleSearch}) => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<any>()

  const {canBack, webState} = useGlobalContext()

  const [thisValue, setThisValue] = useState<string>('')

  useEffect(() => {
    setThisValue(searchText)
  }, [searchText])

  useEffect(() => {
    setThisValue(webState?.url)
  }, [webState?.url])

  return (
    <View style={[{paddingTop: insets.top + 16}, styles.headerContainer]}>
      <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} style={styles.btnHome}>
        <Icon type="Entypo" name="home" color={colors.primary} size={18} />
      </TouchableOpacity>

      {canBack && (
        <TouchableOpacity onPress={() => webview.current?.goBack()} activeOpacity={0.7} style={styles.btnBack}>
          <Icon type="MaterialIcons" name="keyboard-arrow-left" color={colors.primary} size={26} />
        </TouchableOpacity>
      )}

      <View style={{height: 36, backgroundColor: '#fff', flex: 1, borderRadius: 6}}>
        <TextInput
          placeholder="Tìm kiếm"
          placeholderTextColor={Colors.trans30}
          value={thisValue}
          onChangeText={e => setSearchText(e)}
          style={styles.input}
          textContentType="URL"
          selectTextOnFocus={true}
          autoCapitalize="none"
          scrollEnabled={true}
        />
      </View>
      <TouchableOpacity onPress={handleSearch} activeOpacity={0.7} style={styles.btnSearch}>
        <Icon type="Ionicons" name="search" color={colors.primary} size={18} />
      </TouchableOpacity>
    </View>
  )
}

export default WebHeader

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  input: {
    height: 37,
    width: '100%',
    borderRadius: 6,
    fontSize: 16,
    marginTop: 2,
    paddingHorizontal: 8,
    color: '#000',
  },
  btnBack: {
    width: 36,
    height: 36,
    backgroundColor: '#fff',
    marginRight: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnHome: {
    width: 36,
    height: 36,
    backgroundColor: '#fff',
    marginRight: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSearch: {
    width: 36,
    height: 36,
    backgroundColor: '#fff',
    marginLeft: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
