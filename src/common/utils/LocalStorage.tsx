import AsyncStorage from '@react-native-async-storage/async-storage'

const LANGUAGE = 'CURRENT_LANGUAGE'
const TOKEN = 'ACCESS_TOKEN'
const USER = 'USER'
const WELCOME = 'WELCOME'

const LocalStorage = {
  async setToken(params: string) {
    await AsyncStorage.setItem(TOKEN, params)
  },
  async getToken() {
    const response: string | null = await AsyncStorage.getItem(TOKEN)
    return response == null ? null : response
  },
  async deleteToken() {
    await AsyncStorage.removeItem(TOKEN)
  },
  async setUserInformation(params: any) {
    try {
      let temp = JSON.stringify(params)
      await AsyncStorage.setItem(USER, temp)
    } catch (error) {
      console.log(error)
    }
  },
  async getUserInformation() {
    const response = await AsyncStorage.getItem(USER)
    return response == null ? null : JSON.parse(response)
  },
  async logout() {
    await AsyncStorage.multiRemove([USER, TOKEN])
  },
  async setWelcome() {
    await AsyncStorage.setItem(WELCOME, 'false')
  },
  async getWelcome() {
    const response = await AsyncStorage.getItem(WELCOME)
    return response == null ? null : response
  },
}

export default LocalStorage
