import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import appConfigs from '~/configs'

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

// Intercept all request
instance.interceptors.request.use(
  async (config: AxiosRequestConfig & {startCall: any}) => {
    config.startCall = new Date().getTime()

    // console.log(`%c ${config?.method?.toUpperCase()} - ${getUrl(config)}:`, 'color: #0086b3; font-weight: bold', config)
    return config
  },
  (error: any) => {
    // console.log(`%c ${error?.response?.status}  :`, 'color: red; font-weight: bold', error?.response?.data)
    return Promise.reject(error)
  },
)

function convertMsToS(ms) {
  var seconds = ms / 1000
  return seconds.toFixed(1)
}

// Intercept all responses
instance.interceptors.response.use(
  (response: any) => {
    const apiUrl = `${response?.status} - ${getUrl(response?.config)}`
    const elapsedTime = new Date().getTime() - response?.config?.startCall // Tính thời gian đã trôi qua
    const apiRating = elapsedTime < 1000 ? 'Rất nhanh' : elapsedTime > 2000 ? 'Rất chậm' : 'Hơi nhanh'
    const apiTime = `${elapsedTime}ms --> ${convertMsToS(elapsedTime)}s`

    console.log(`%c ${response?.status} - ${getUrl(response?.config)}:`, 'color: #008000; font-weight: bold', {
      timeSpend: apiTime,
      rate: apiRating,
      ...response,
    })
    return response
  },
  (error: any) => {
    // console.log(
    //   `%c ${error?.response?.status} - ${getUrl(error?.response?.config)}:`,
    //   'color: #a71d5d; font-weight: bold',
    //   error?.response,
    // )
    return Promise.reject(error?.response || error?.response)
  },
)

export default instance
