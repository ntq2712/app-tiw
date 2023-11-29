import axios from 'axios'
import appConfigs from '~/configs'

var config = {
  method: 'get',
  url: appConfigs.configURL + '/order/piget/config.json',
  headers: {},
}

async function ConfigsApi() {
  let temp = {}
  await axios(config)
    .then(function (response) {
      temp = response.data
    })
    .catch(function (error) {
      temp = error
    })
  return temp
}

export default ConfigsApi
