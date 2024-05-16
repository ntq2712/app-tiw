import axios, {AxiosRequestConfig} from 'axios'
import {LocalStorage, logout} from '~/common'
import appConfigs from '~/configs'
import {throttle} from '~/utils/timeHandler'
import {authApi} from './Auth/login'

const throttleLogout = throttle(logout, 8000)

const apiConfig = {
  baseUrl: `${appConfigs.hostURL}/api`,
}

const instance = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {Accept: 'application/json'},
})

export const setToken = (token: string) => {
  instance.defaults.headers.common['token'] = token
}

const getUrl = (config: any) => {
  if (config?.baseURL) {
    return config?.url.replace(config?.baseURL, '')
  }
  return config?.url
}

let isRefreshToken = false
let refreshSubscribers = []

// Intercept all request
instance.interceptors.request.use(
  async (config: AxiosRequestConfig & {startCall: any}) => {
    config.startCall = new Date().getTime()
    return config
  },
  (error: any) => {
    console.log(`%c ${error?.response?.status}  :`, 'color: red; font-weight: bold', error?.response?.data)
    return Promise.reject(error)
  },
)

function convertMsToS(ms) {
  var seconds = ms / 1000
  return seconds.toFixed(1)
}

// Intercept all responses
instance.interceptors.response.use(
  async (response: any) => {
    const apiUrl = `${response?.status} - ${getUrl(response?.config)}`
    const elapsedTime = new Date().getTime() - response?.config?.startCall // Tính thời gian đã trôi qua
    const apiRating = elapsedTime < 1000 ? 'Rất nhanh' : elapsedTime > 2000 ? 'Rất chậm' : 'Hơi nhanh'
    const apiTime = `${elapsedTime}ms --> ${convertMsToS(elapsedTime)}s`

    console.log(
      `%c REPONSE THÀNH CÔNG ${response?.status} - ${getUrl(response?.config)}:`,
      'color: #008000; font-weight: bold',
      {
        timeSpend: apiTime,
        rate: apiRating,
        ...response,
      },
    )
    return response
  },
  (error: any) => {
    console.log(
      `%c REQUEST LỖI ${error?.response?.status} - ${getUrl(error?.response?.config)}:`,
      'color: #a71d5d; font-weight: bold',
      error?.response,
      error,
    )
    const originalRequest = error.config

    if (error?.response?.status === 401) {
      if (!isRefreshToken) {
        isRefreshToken = true
        LocalStorage.getRefreshToken()
          .then(dataRefresh => {
            const refreshToken = dataRefresh.refreshToken
            return authApi.refreshToken(refreshToken)
          })
          .then(res => {
            isRefreshToken = false
            const newToken = res?.data?.token
            setToken(newToken)

            return LocalStorage.setRefreshToken({
              refreshToken: res?.data?.refreshToken,
              refreshTokenExpires: res?.data?.refreshTokenExpires,
            }).then(() => newToken)
          })
          .then(newToken => {
            onRefreshed(newToken)
          })
          .catch(error => {
            throttleLogout()
          })
      }
      if (error?.response?.status === 403) {
        throttleLogout()
      }
      const retryOrigReq = new Promise((resolve, reject) => {
        subscribeTokenRefresh(accessToken => {
          originalRequest.headers['token'] = accessToken
          resolve(instance(originalRequest))
        })
      })
      return retryOrigReq
    }

    return Promise.reject(error?.response || error?.response)
  },
)
function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb)
}
function onRefreshed(accessToken) {
  refreshSubscribers.map(cb => cb(accessToken))
}

export default instance
