import {setToken} from '~/api/instance'
import LocalStorage from './LocalStorage'

export {LocalStorage}

export const languages: any = {
  auto: 'Automatic',
  af: 'Afrikaans',
  sq: 'Albanian',
  am: 'Amharic',
  ar: 'Arabic',
  hy: 'Armenian',
  az: 'Azerbaijani',
  eu: 'Basque',
  be: 'Belarusian',
  bn: 'Bengali',
  bs: 'Bosnian',
  bg: 'Bulgarian',
  ca: 'Catalan',
  ceb: 'Cebuano',
  ny: 'Chichewa',
  'zh-cn': 'Chinese Simplified',
  'zh-hk': 'Chinese (Hong Kong)',
  'zh-tw': 'Chinese Traditional',
  co: 'Corsican',
  hr: 'Croatian',
  cs: 'Czech',
  da: 'Danish',
  nl: 'Dutch',
  en: 'English',
  eo: 'Esperanto',
  et: 'Estonian',
  tl: 'Filipino',
  fi: 'Finnish',
  fr: 'French',
  fy: 'Frisian',
  gl: 'Galician',
  ka: 'Georgian',
  de: 'German',
  el: 'Greek',
  gu: 'Gujarati',
  ht: 'Haitian Creole',
  ha: 'Hausa',
  haw: 'Hawaiian',
  iw: 'Hebrew',
  hi: 'Hindi',
  hmn: 'Hmong',
  hu: 'Hungarian',
  is: 'Icelandic',
  ig: 'Igbo',
  id: 'Indonesian',
  ga: 'Irish',
  it: 'Italian',
  ja: 'Japanese',
  jw: 'Javanese',
  kn: 'Kannada',
  kk: 'Kazakh',
  km: 'Khmer',
  ko: 'Korean',
  ku: 'Kurdish (Kurmanji)',
  ky: 'Kyrgyz',
  lo: 'Lao',
  la: 'Latin',
  lv: 'Latvian',
  lt: 'Lithuanian',
  lb: 'Luxembourgish',
  mk: 'Macedonian',
  mg: 'Malagasy',
  ms: 'Malay',
  ml: 'Malayalam',
  mt: 'Maltese',
  mi: 'Maori',
  mr: 'Marathi',
  mn: 'Mongolian',
  my: 'Myanmar (Burmese)',
  ne: 'Nepali',
  no: 'Norwegian',
  ps: 'Pashto',
  fa: 'Persian',
  pl: 'Polish',
  pt: 'Portuguese',
  ma: 'Punjabi',
  ro: 'Romanian',
  ru: 'Russian',
  sm: 'Samoan',
  gd: 'Scots Gaelic',
  sr: 'Serbian',
  st: 'Sesotho',
  sn: 'Shona',
  sd: 'Sindhi',
  si: 'Sinhala',
  sk: 'Slovak',
  sl: 'Slovenian',
  so: 'Somali',
  es: 'Spanish',
  su: 'Sundanese',
  sw: 'Swahili',
  sv: 'Swedish',
  tg: 'Tajik',
  ta: 'Tamil',
  te: 'Telugu',
  th: 'Thai',
  tr: 'Turkish',
  uk: 'Ukrainian',
  ur: 'Urdu',
  uz: 'Uzbek',
  vi: 'Vietnamese',
  cy: 'Welsh',
  xh: 'Xhosa',
  yi: 'Yiddish',
  yo: 'Yoruba',
  zu: 'Zulu',
}

export function logout(setUser) {
  LocalStorage.logout()
  setToken('')
  setUser(null)
}

export const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

function getCode(desiredLang: any) {
  if (!desiredLang) {
    return false
  }
  desiredLang = desiredLang.toLowerCase()

  if (languages[desiredLang]) {
    return desiredLang
  }

  var keys = Object.keys(languages).filter(function (key) {
    if (typeof languages[key] !== 'string') {
      return false
    }

    return languages[key].toLowerCase() === desiredLang
  })

  return keys[0] || false
}

function isSupported(desiredLang: any) {
  return Boolean(getCode(desiredLang))
}

// LẤY URL CÓ CHỨA KÝ TỰ LẠ
export const getFullUrl = (url: any) => {
  let temp = ''
  let flag = 0
  if (url === undefined || url === null || url === '') {
    return '' // https://m.1688.com/
  } else {
    if (url[0] === 'h' && url[1] === 't' && url[2] === 't' && url[3] === 'p') {
      return url.replace('modal=sku', '')
    } else {
      for (let i = 0; i < url.length; i++) {
        // URL CÓ CHỨA HTTP
        if (url[i] === 'h' && url[i + 1] === 't' && url[i + 2] === 't' && url[i + 3] === 'p') {
          flag = 1
        }
        // GHI ĐOẠN CÓ HTTP LẠI
        if (flag === 1) {
          temp = temp + url[i]
        }
        // KẾT THÚC CÁI HTTP THÌ NGƯNG GHI
        if (url[i + 1] === ' ') {
          flag = 0
        }
      }
      return temp.replace('modal=sku', '')
    }
  }
}
