type IMainProvider = {
  user?: IUser
  setUser?: Function
  mainLoading?: boolean
  setMainLoading?: Function
  remoteConfigs?: IRemoteConfig
  canBack?: boolean
  setCanBack?: Function

  webState?: any
  setWebState?: Function

  isDetail?: any
  setDetail?: Function

  wvProcess?: any
  setwvProcess?: Function

  carts?: any
  setCarts?: Function
  getCarts?: Function
  cartChecked?: Array<any>
  setCartChecked?: Function

  orders?: Array<any>
  getOrders?: Function

  orderStatus?: Array<any>
  getOrderStatus?: Function

  orderOtherStatus?: Array<any>
  getOrderOtherStatus?: Function

  otherOrders?: Array<any>
  getOtherOrders?: Function

  notifications?: Array<any>
  getNotifications?: Function

  isProd?: boolean
  setIsProd?: Function
  getConfigs?: Function

  setIsWelcome?: Function

  isWelcome?: boolean
}

type IChildren = {
  children?: React.ReactNode
}

type IRemoteConfig = {
  activated: boolean
  isOld: boolean
  version: string
}
