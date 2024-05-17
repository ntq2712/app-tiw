import {Dimensions} from 'react-native'

const {width, height} = Dimensions.get('window')

// Live: https://lms.gdcenglish.edu.vn
// Dev: https://gdc.monamedia.net

const appConfigs = {
  hostURL: 'https://lms.gdcenglish.edu.vn',
  // hostURL: 'https://gdc.monamedia.net',
  configURL: 'https://skillhub.mona.software/chau/gdc-configs.json',
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
    Bold: 'Roboto-Bold',
    Medium: 'Roboto-Medium',
    Semibold: 'Roboto-Medium',
    Regular: 'Roboto-Regular',
  },
}

export const theme = {
  attackDance: 2, // 1 = chọn buổi ; 2 = show hết
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

export {colors, fonts, sizes}
export default appConfigs

// {
//   ClassId: 1111
//   CreatedBy: 'Nguyễn Thị Quỳnh Trang'
//   CreatedOn: '2024-02-01T18:26:27.77'
//   Enable: true
//   Id: 708
//   ModifiedBy: 'Nguyễn Thị Quỳnh Trang'
//   ModifiedOn: '2024-02-01T18:26:27.77'
//   ScoreColumnId: 287
//   StudentId: 1636
//   TranscriptId: 76
//   Value: '8'
// }
