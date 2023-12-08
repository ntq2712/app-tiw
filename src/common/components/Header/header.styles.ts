import {Colors} from 'green-native-ts'
import {StyleSheet} from 'react-native'
import {fonts} from '~/configs'

export const headerStyles = StyleSheet.create({
  btnBack: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  headerTitle: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    color: '#000',
  },
  right: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    opacity: 0,
  },
})

export const whiteStyles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.trans07,
  },
})
