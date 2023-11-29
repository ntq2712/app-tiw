import {Dimensions} from 'react-native'

const {width, height} = Dimensions.get('window')

// Live:
// Dev: https://gdc.monamedia.net

const appConfigs = {
  hostURL: 'https://gdc.monamedia.net',
  configURL: 'https://nguyenchau.w3spaces.com',
  oneSignalID: '',
  colors: {
    primary: '#EB3349',
    second: '#6610f2',
    placeholder: '#7C7C7C',
    boder: 'rgba(84, 84, 88, 0.2)',
    white: '#fff',
    black: '#000',
  },
  sizes: {
    dW: width,
    dH: height,
  },
  fonts: {
    Bold: 'SFProDisplay-Bold',
    Medium: 'SFProDisplay-Medium',
    Semibold: 'SFProDisplay-Semibold',
    Regular: 'SFProDisplay-Regular',
  },
}

export const webViewURLs = {
  taobao: {
    targetUrl: 'https://m.intl.taobao.com/',
    searchUrl: 'https://m.intl.taobao.com/search/search.html?q=',
    detailUrl:
      'm.intl.taobao.com/detail|item.taobao.com/item|a.m.taobao.com/|detail.m.tmall.com/item|tmall.hk/item.htm?id|detail.tmall.com/item|m.1688.com/offer|detail.m.1688.com/|dj.1688.com/ci_bb',
  },
  tmall: {
    targetUrl: 'https://www.tmall.com/',
    searchUrl: 'https://list.tmall.com/search_product.htm?q=',
    detailUrl:
      'm.intl.taobao.com/detail|item.taobao.com/item|a.m.taobao.com/|detail.m.tmall.com/item|tmall.hk/item.htm?id|detail.tmall.com/item|m.1688.com/offer|detail.m.1688.com/|dj.1688.com/ci_bb',
  },
  1688: {
    targetUrl: 'https://m.1688.com/',
    searchUrl: 'https://m.1688.com/offer_search/-6D7033.html?keywords=',
    detailUrl:
      'm.intl.taobao.com/detail|item.taobao.com/item|a.m.taobao.com/|detail.m.tmall.com/item|tmall.hk/item.htm?id|detail.tmall.com/item|m.1688.com/offer|detail.m.1688.com/|dj.1688.com/ci_bb',
  },
}

const fonts = appConfigs.fonts
const sizes = appConfigs.sizes
const colors = appConfigs.colors

export {fonts, sizes, colors}
export default appConfigs
