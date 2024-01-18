import React, {createContext, useContext, useState, useEffect, FC} from 'react'
import RestApi from '~/api/RestApi'
import {useIsFocused, useRoute} from '@react-navigation/native'
import {useGlobalContext} from './AppProvider'

type TClassContext = {
  notifications?: Array<TClassNotification>
  schedule?: Array<TClassSchedule>
  loading?: boolean
  detail?: TClassDetail
  curStudent?: number
  examinations?: Array<TClassExam>

  setLoading?: Function
  setSchedule?: Function
  setNotifications?: Function
  setCurStudent?: Function
  refeshNotifications?: Function
  refeshExams?: Function
}

export const ClassContext = createContext<TClassContext>({})

const ClassProvider: FC<{children: React.ReactNode}> = ({children}) => {
  const router: any = useRoute()
  const focused = useIsFocused()

  const {user, curChildren} = useGlobalContext()

  const [loading, setLoading] = useState<boolean>(true)

  const [detail, setDetail] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [schedule, setSchedule] = useState([])
  const [curStudent, setCurStudent] = useState(null)
  const [examinations, setExaminations] = useState([])

  useEffect(() => {
    if (focused && router?.params) {
      getDetail()
      getSchedule()
    }
  }, [focused, router])

  useEffect(() => {
    if (user?.RoleId == 3) {
      setCurStudent(user?.UserInformationId)
    } else {
      setCurStudent(curChildren)
    }
  }, [])

  // LẤY THÔNG TIN CHI TIẾT CỦA LỚP
  async function getDetail() {
    setLoading(true)
    try {
      const res = await RestApi.getBy<any>('Class', router?.params?.Id)
      if (res.status == 200) {
        setDetail(res.data.data)
      } else {
        setDetail([])
      }
    } catch (error) {
    } finally {
      setLoading(false)

      getNotifications()
      getTranscripts()
    }
  }

  // LẤY LỊCH HỌC CỦA LỚP
  async function getSchedule() {
    try {
      const res = await RestApi.get<any>('Schedule', {classId: router?.params?.Id, pageSize: 99999, pageIndex: 1})
      if (res.status == 200) {
        setSchedule(res.data.data)
      }
    } catch (error) {}
  }

  // LẤY LỊCH HỌC CỦA LỚP
  async function getNotifications() {
    try {
      const res = await RestApi.get<any>('NotificationInClass', {classId: router?.params?.Id}, true)
      if (res.status == 200) {
        setNotifications(res.data.data)
      }
    } catch (error) {}
  }

  // LẤY ĐỢT THI
  async function getTranscripts() {
    try {
      const res = await RestApi.getBy<any>(`Transcript/by-class`, router?.params?.Id)
      if (res.status == 200) {
        setExaminations(res.data.data)
      }
    } catch (error) {}
  }

  const contextValue = {
    notifications,
    setNotifications,
    schedule,
    setSchedule,
    loading,
    setLoading,
    detail,
    curStudent,
    setCurStudent,
    examinations,
    refeshNotifications: getNotifications,
    refeshExams: getTranscripts,
  }

  return <ClassContext.Provider value={contextValue}>{children}</ClassContext.Provider>
}

export const useClassContext = () => useContext(ClassContext)
export default ClassProvider
