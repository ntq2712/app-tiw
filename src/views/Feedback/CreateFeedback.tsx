import {
  Alert,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Empty, GInput, GStatusBar, HeaderWhite, SuperLoading, TextError} from '~/common/components'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import RestApi from '~/api/RestApi'
import {useGlobalContext} from '~/provider'
import Timeline from 'react-native-timeline-flatlist'
import moment from 'moment'
import {fonts} from '~/configs'
import FeedbackItem from './Feedback.Item'
import {Colors, Icon} from 'green-native-ts'
import GTextArea from '~/common/components/GTextArea'
import {TextInput} from 'react-native'
import MyTextArea from '~/common/components/GTextArea/MyTextArea'
import Button from '~/common/components/Button'

const CreateFeedback = () => {
  const {user} = useGlobalContext()

  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<Array<TLearningHistory>>([])

  const focused = useIsFocused()
  const navigation = useNavigation<any>()

  const [refreshing, setRefreshing] = React.useState(false)

  const [privated, setPrivated] = useState<boolean>(false)

  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [prioritize, setPrioritize] = useState<boolean>(false)

  const [textError, setTextError] = useState<string>('')

  async function handleCreate() {
    setLoading(false)
    try {
      const res = await RestApi.post('Feedback', {
        IsPriority: prioritize,
        IsIncognito: privated,
        Title: title,
        Content: content,
      })
      if (res.status == 200) {
        Alert.alert('Thành công', 'Phản hồi đã được gửi cho trung tâm', [
          {text: 'OK', onPress: () => navigation.goBack()},
        ])
      }
    } catch (error) {
      setTextError(error?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  function onSubmit() {
    handleCreate()
  }

  return (
    <>
      <GStatusBar.Dark />

      <HeaderWhite>Thêm phản hồi</HeaderWhite>

      <ScrollView endFillColor={Colors.transparent} automaticallyAdjustKeyboardInsets={true}>
        <View style={{flex: 1}}>
          <View style={styles.formWrapper}>
            <GInput
              value={title}
              onChange={e => setTitle(e)}
              inputStyle={{height: 40}}
              placeholder="Nhập tiêu đề"
              label="Tiêu đề"
              wrapStyle={{marginTop: 16}}
              disabled={loading}
            />

            <GTextArea
              value={content}
              onChange={e => setContent(e)}
              placeholder="Nhập nội dung"
              label="Nội dung"
              wrapStyle={{marginTop: 16}}
              disabled={loading}
            />

            <View style={styles.switchContainer}>
              <Switch
                trackColor={{false: '#CFD8DC', true: '#81b0ff'}}
                thumbColor={privated ? '#2196F3' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setPrivated(!privated)}
                value={privated}
                style={{marginLeft: -4, marginRight: 4}}
              />
              <Text style={{fontFamily: fonts.Medium, color: '#000'}}>Gửi ẩn danh</Text>
            </View>

            <View style={styles.switchContainer}>
              <Switch
                trackColor={{false: '#CFD8DC', true: '#81b0ff'}}
                thumbColor={prioritize ? '#2196F3' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setPrioritize(!prioritize)}
                value={prioritize}
                style={{marginLeft: -4, marginRight: 4}}
              />
              <Text style={{fontFamily: fonts.Medium, color: '#000'}}>Ưu tiên</Text>
            </View>

            <TextError>{textError}</TextError>

            <Button
              onPress={onSubmit}
              loading={loading}
              disabled={!title || !content}
              style={{marginTop: 16, height: 42}}>
              Gửi
            </Button>
          </View>
        </View>
      </ScrollView>

      <SuperLoading loading={loading} />
    </>
  )
}

export default CreateFeedback

const styles = StyleSheet.create({
  formWrapper: {
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 8,
    padding: 16,
  },
  switchContainer: {
    width: '100%',
    marginTop: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
})
