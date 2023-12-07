type IApiUploadResult<T = any> = {
  data: string
  resultCode?: number
  resultMessage?: string
  success?: boolean
}

type TApiPani = {
  pageIndex?: number
  pageSize?: number
  totalItem?: number
  totalPage?: number
}

type IApiResult<T = any> = {
  data: T
  resultCode?: number
  resultMessage?: string
  success?: boolean
}

type IArrayResult<T = any> = {
  pageIndex: number
  pageSize: number
  totalPage: number
  totalItem: number
  data: Array<T>
}
