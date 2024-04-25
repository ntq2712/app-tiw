import appConfigs from '~/configs'
import instance from '../instance'

const FormData = require('form-data')

export const loginApi = async data => {
  console.log('login Running.. : ', data)

  try {
    let formData = new FormData()

    formData.append('username', data.userName)
    formData.append('password', data.password)

    var requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    }

    let temp = null

    await fetch(appConfigs.hostURL + '/api/Account/Login', requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log('-- result: ', result)
        temp = JSON.parse(result)
      })
      .catch(error => {
        console.log('---- error: ', error)
        temp = error
      })

    return temp
  } catch (error) {
    return Promise.reject(error)
  }
}

export const authApi = {
  forgotPassword: (data: { UserName: string }) => {
    return instance.post('/KeyForgotPassword', data)
  }
};