type IMainProvider = {
  user?: IUser
  setUser?: Function
  mainLoading?: boolean
  setMainLoading?: Function
  remoteConfigs?: IRemoteConfig
  schedule?: Array<any>
  childrens?: Array<IUser>
  is?: {
    student?: boolean
    parent?: boolean
  }
  curChildren?: IUser
  setCurChildren?: Function
  getMyChildrens?: Function

  notifications?: Array<any>
  getNotifications?: Function

  isProd?: boolean
  setIsProd?: Function
  getConfigs?: Function

  setIsWelcome?: Function

  isWelcome?: boolean
  classes?: Array<TClassType>
  homeClasses?: Array<TClassType>
  getClasses?: Function

  navigation?: any
}

type IChildren = {
  children?: React.ReactNode
}

type IRemoteConfig = {
  activated: boolean
  isOld: boolean
  version: string
}
