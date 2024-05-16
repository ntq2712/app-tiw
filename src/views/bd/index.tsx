import {Colors} from 'green-native-ts'
import React, {useEffect, useState} from 'react'
import {Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import RestApi from '~/api/RestApi'
import {setToken} from '~/api/instance'
import {LocalStorage} from '~/common'
import {Empty, HeaderWhite, SuperLoading} from '~/common/components'
import {fonts} from '~/configs'
import {useGlobalContext} from '~/provider'
import {parseJwt} from '../auth/signin'

function categorizeUsers(userArray) {
  const result = {
    admins: [],
    teachers: [],
    students: [],
    parents: [],
    others: [],
  }

  userArray.forEach(user => {
    switch (user.RoleName) {
      case 'Admin':
        result.admins.push(user)
        break
      case 'Giảng viên':
        result.teachers.push(user)
        break
      case 'Giáo viên':
        result.teachers.push(user)
        break
      case 'Học sinh':
        result.students.push(user)
        break
      case 'Học viên':
        result.students.push(user)
        break
      case 'Phụ huynh':
        result.parents.push(user)
        break
      default:
        result.others.push(user)
    }
  })

  return result
}

const BDScreen = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState([])

  const [curShowing, setCurShowing] = useState<any[]>([])
  const [allAccounts, setAllAccounts] = useState<any[]>([])
  const [showingNumber, setShowingNumber] = useState<number>(2)
  const [accounts, setAccounts] = useState({
    admins: [],
    teachers: [],
    students: [],
    parents: [],
    others: [],
  })

  useEffect(() => {
    if (showingNumber == 1) {
      setCurShowing(allAccounts)
    }
    if (showingNumber == 2) {
      setCurShowing(accounts.admins)
    }
    if (showingNumber == 3) {
      setCurShowing(accounts.teachers)
    }
    if (showingNumber == 4) {
      setCurShowing(accounts.students)
    }
    if (showingNumber == 5) {
      setCurShowing(accounts.parents)
    }
    if (showingNumber == 6) {
      setCurShowing(accounts.others)
    }
  }, [showingNumber])

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    try {
      const res = await RestApi.get<any>('getAccount', {})
      if (res.status == 200) {
        const categorizedUsers = categorizeUsers(res.data.data)
        setAccounts(categorizedUsers)

        setAllAccounts(res.data.data)
        setCurShowing(categorizedUsers?.admins)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  console.log('-- curShowing: ', curShowing)

  const [curAcc, setCurAcc] = useState<boolean>(null)
  const [pass, setPass] = useState('')

  const {setUser, getConfigs} = useGlobalContext()

  async function getMyInfo(token, id) {
    try {
      const res = await RestApi.get<any>('UserInformation/' + id, {})
      if (res.status == 200) {
        LocalStorage.setToken(token)
        !!setUser && setUser({token: token, ...res?.data?.data})
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async data => {
    try {
      setLoading(true)
      const res: any = await RestApi.post('LoginDev', {...data})

      const thisTolen = res?.data?.token

      if (thisTolen) {
        await setToken(thisTolen)

        const tempUser = await parseJwt(thisTolen)

        console.log('--- tempUser: ', tempUser)

        getMyInfo(thisTolen, tempUser?.UserInformationId || null)
      } else {
        Alert.alert('Lỗi', res?.data?.message)
      }
    } catch (error) {
      Alert.alert('Lỗi', error?.data?.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <HeaderWhite>SUPER SUPPORT SCREEN</HeaderWhite>

      <View
        style={{
          height: 30,
          borderWidth: 1,
          borderColor: Colors.trans20,
          marginHorizontal: 16,
          marginTop: 16,
          borderRadius: 6,
          paddingHorizontal: 8,
          backgroundColor: '#fff',
        }}>
        <TextInput
          style={{padding: 0, height: '100%', width: '100%'}}
          value={pass}
          onChangeText={e => setPass(e)}
          placeholder="Nhập super pass"
          placeholderTextColor={Colors.trans30}
        />
      </View>

      <View style={{paddingHorizontal: 16, paddingVertical: 16}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 6,
            padding: 4,
          }}>
          <TouchableOpacity
            onPress={() => setShowingNumber(2)}
            activeOpacity={0.7}
            style={{
              height: 28,
              paddingHorizontal: 10,
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: showingNumber != 2 ? '#fff' : '#E91E63',
            }}>
            <Text
              style={{
                fontFamily: fonts.Semibold,
                color: showingNumber != 2 ? '#000' : '#fff',
                fontSize: 14,
              }}>
              Ad ({accounts.admins.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowingNumber(3)}
            activeOpacity={0.7}
            style={{
              height: 28,
              paddingHorizontal: 10,
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: showingNumber != 3 ? '#fff' : '#E91E63',
            }}>
            <Text
              style={{
                fontFamily: fonts.Semibold,
                color: showingNumber != 3 ? '#000' : '#fff',
                fontSize: 14,
              }}>
              GV ({accounts.teachers.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowingNumber(4)}
            activeOpacity={0.7}
            style={{
              height: 28,
              paddingHorizontal: 10,
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: showingNumber != 4 ? '#fff' : '#E91E63',
            }}>
            <Text
              style={{
                fontFamily: fonts.Semibold,
                color: showingNumber != 4 ? '#000' : '#fff',
                fontSize: 14,
              }}>
              HV ({accounts.students.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowingNumber(5)}
            activeOpacity={0.7}
            style={{
              height: 28,
              paddingHorizontal: 10,
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: showingNumber != 5 ? '#fff' : '#E91E63',
            }}>
            <Text
              style={{
                fontFamily: fonts.Semibold,
                color: showingNumber != 5 ? '#000' : '#fff',
                fontSize: 14,
              }}>
              PH ({accounts.parents.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowingNumber(6)}
            activeOpacity={0.7}
            style={{
              height: 28,
              paddingHorizontal: 10,
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: showingNumber != 6 ? '#fff' : '#E91E63',
            }}>
            <Text
              style={{
                fontFamily: fonts.Semibold,
                color: showingNumber != 6 ? '#000' : '#fff',
                fontSize: 14,
              }}>
              Khác ({accounts.others.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        key="classes"
        data={curShowing}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => onSubmit({PassDev: pass, Id: item?.Id})}
            key={`bd-i-${item?.Id}`}
            style={{
              marginBottom: 8,
              padding: 8,
              borderRadius: 8,
              backgroundColor: '#fff',
            }}>
            <Text style={{fontFamily: fonts.Semibold, color: curAcc == item?.Id ? '#' : '#000', fontSize: 14}}>
              {item?.Id} - {item?.FullName}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item: any) => {
          return item.Id
        }}
        style={{paddingHorizontal: 16}}
        ListEmptyComponent={<Empty />}
        ListFooterComponent={<View style={{height: 16}} />}
      />

      <SuperLoading loading={loading} />
    </>
  )
}

export default BDScreen

const styles = StyleSheet.create({})
