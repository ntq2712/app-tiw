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

  function parseJwt(token) {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString())
    return JSON.parse(jsonPayload) || {}
  }

  useEffect(() => {
    if (user?.token) {
    }
  }, [user])

  async function getNotifications() {
    if (user?.UserName) {
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

  async function getMyInfo(token, id) {
    try {
      const res = await RestApi.get<any>('UserInformation/' + id, {})
      if (res.status == 200) {
        console.log('Current USER: ', {token: token, ...res?.data?.data})
        !!setUser && setUser({token: token, ...res?.data?.data})
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

  const contextValue = {
    mainText,
    setMainText,
    mainLoading,
    setMainLoading,
    user,
    setUser: setUser,
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
  }

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>
}

export const useGlobalContext = () => useContext(GlobalContext)
export default AppProvider
