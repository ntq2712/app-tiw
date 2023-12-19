import React, {createContext, useContext, useState, useEffect, FC} from 'react'
import {setToken} from '~/api/instance'
import {LocalStorage, logout, wait} from '~/common'
import ConfigsApi from '~/api/Configs'
import RestApi from '~/api/RestApi'
import SplashScreen from 'react-native-splash-screen'
import {Alert, Platform} from 'react-native'
import {getVersion} from 'react-native-device-info'
import {isIOS} from 'green-native-ts'
import {Buffer} from 'buffer'
import moment from 'moment'
import {useNavigation} from '@react-navigation/native'

const initUser = null

export const GlobalContext = createContext<IMainProvider>({})

const AppProvider: FC<{children: React.ReactNode}> = ({children}) => {
  const [mainText, setMainText] = useState('Click me!')
  const [mainLoading, setMainLoading] = useState(true)
  const [user, setUser] = useState<IUser>(initUser)

  const [remoteConfigs, setRemoteConfig] = useState<any>({})

  const [carts, setCarts] = useState([])
  const [cartChecked, setCartChecked] = useState([])

  const [notifications, setNotifications] = useState([])

  const [isProd, setIsProd] = useState(true)
  const [curChildren, setCurChildren] = useState<IUser>(null)

  function parseJwt(token) {
    if (token) {
      var base64Url = token.split('.')[1]
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      var jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString())
      return JSON.parse(jsonPayload) || {}
    }
  }

  async function getNotifications() {
    if (user?.UserName) {
      if (user?.RoleId == 3) {
        getSchedule()
      }

      try {
        const response = await RestApi.get<any>('Notification', {pageIndex: 1, pageSize: 999999})
        if (response?.status == 200) {
          setNotifications(response.data?.data)
        } else {
          setNotifications([])
        }
      } catch (error) {
        setCarts([])
      }
    }
  }

  useEffect(() => {
    if (user?.RoleId == 8 && !!curChildren?.UserInformationId) {
      getSchedule()
    }
  }, [curChildren])

  const [schedule, setSchedule] = useState<Array<TClassSchedule>>([])

  // LẤY LỊCH HỌC
  async function getSchedule() {
    const studentId = user?.RoleId == 3 ? user?.UserInformationId : curChildren?.UserInformationId || null

    try {
      const res = await RestApi.get<any>(
        'Schedule',
        {
          studentId: studentId,
          from: moment().startOf('day').format('YYYY-MM-DDTHH:mm:ssZ'),
          to: moment().endOf('day').format('YYYY-MM-DDTHH:mm:ssZ'),
        },
        true,
      )
      if (res.status == 200) {
        setSchedule(res.data.data)
      } else {
        setSchedule([])
      }
    } catch (error) {}
  }

  async function getMyInfo(token, id) {
    try {
      const res = await RestApi.getBy<any>('UserInformation', id)
      if (res.status == 200) {
        console.log('Current USER: ', {token: token, ...res?.data?.data})

        !!setUser && setUser({token: token, ...res?.data?.data})

        if (res?.data?.data?.RoleId == 8) {
          getMyChildrens(res?.data?.data?.UserInformationId)
        }
      }
    } catch (error) {
    } finally {
      await wait(2000)
      SplashScreen.hide()
      setMainLoading(false)
    }
  }

  async function getCurrentToken() {
    try {
      const token = await LocalStorage.getToken()

      if (!token) {
        handleWelcome()
      }

      setToken(token || '')

      const tempUser = await parseJwt(token)
      getMyInfo(token, tempUser?.UserInformationId || null)
    } catch (error) {
      console.error(error)
    }
  }

  const [isWelcome, setIsWelcome] = useState<boolean>(false)

  async function handleWelcome() {
    try {
      const res = await LocalStorage.getWelcome()
      if (res == null || res == undefined) {
        setIsWelcome(true)
      } else {
        setIsWelcome(false)
      }
      setMainLoading(false)
    } catch (error) {
      setMainLoading(false)
    }
  }

  useEffect(() => {
    getCurrentToken()
  }, [])

  // ----------------------------------------------------------------

  useEffect(() => {
    if (user?.RoleId == 3) {
      // Học viên
      getMyClass()
      getHomeClass()
    }
  }, [user])

  useEffect(() => {
    if (curChildren) {
      console.log('---- curChildren: ', curChildren)

      if (user?.RoleId == 8) {
        // Phụ huynh
        getMyClass()
        getHomeClass()
      }
    }
  }, [curChildren, user])

  // curChildren

  const [classes, setClasses] = useState([])

  async function getMyClass() {
    if (user?.UserName) {
      const studentId = user?.RoleId == 3 ? user?.UserInformationId : curChildren?.UserInformationId || null

      try {
        const response = await RestApi.get<any>('Class', {studentId: studentId}, true)
        if (response?.status == 200) {
          setClasses(response.data?.data)
        } else {
          setClasses([])
        }
      } catch (error) {
        setCarts([])
      }
    }
  }

  const [homeClasses, setHomeClasses] = useState([])

  async function getHomeClass() {
    if (user?.UserName) {
      const studentId = user?.RoleId == 3 ? user?.UserInformationId : curChildren?.UserInformationId || null

      try {
        const response = await RestApi.get<any>('Class', {
          pageIndex: 1,
          pageSize: 3,
          status: 2,
          studentId: studentId,
        })
        if (response?.status == 200) {
          setHomeClasses(response.data?.data)
        } else {
          setHomeClasses([])
        }
      } catch (error) {
        setCarts([])
      }
    }
  }

  const [childrens, setChildrent] = useState(null)

  async function getMyChildrens(parentIds?: number) {
    try {
      const response = await RestApi.get<any>(
        'UserInformation',
        {parentIds: parentIds || user?.UserInformationId},
        true,
      )

      if (response?.status == 200) {
        setChildrent(response.data?.data)
        if (response.data?.data.length > 1) {
          setCurChildren(response.data?.data[0])
        }
      } else {
        setChildrent([])
        setCurChildren(null)
      }
    } catch (error) {
      setCarts([])
    }
  }

  const is = {
    parent: user?.RoleId == 8,
    student: user?.RoleId == 3,
  }

  const contextValue = {
    mainText,
    setMainText,
    mainLoading,
    setMainLoading,
    user,
    is,
    curChildren,
    setCurChildren,
    schedule,
    homeClasses,
    childrens,
    setUser: setUser,
    getMyChildrens,
    remoteConfigs,
    setRemoteConfig,
    canBack: null,
    setCanBack: null,
    webState: null,
    setWebState: null,
    isDetail: null,
    setDetail: null,
    wvProcess: null,
    setwvProcess: null,
    carts,
    setCarts: setCarts,
    getCarts: () => {},
    cartChecked,
    setCartChecked: setCartChecked,
    orders: null,
    getOrders: () => {},
    orderStatus: null,
    getOrderStatus: () => {},

    orderOtherStatus: null,
    getOrderOtherStatus: () => {},

    otherOrders: null,
    getOtherOrders: () => {},

    notifications,
    getNotifications: getNotifications,

    isProd,
    setIsProd: setIsProd,
    getConfigs: () => {},

    isWelcome,
    setIsWelcome: setIsWelcome,
    classes,
    getClasses: getMyClass,
  }

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>
}

export const useGlobalContext = () => useContext(GlobalContext)
export default AppProvider
