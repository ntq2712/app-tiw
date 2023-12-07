import instance from '../instance'

const getAll = {
  pageSize: 99999,
  pageIndex: 1,
}

const RestApi = {
  get<T>(url: string, params: Object, isAll?: boolean) {
    const systemParams = isAll ? getAll : null
    return instance.get<IArrayResult<T>>(`/${url}`, {
      params: {...params, ...systemParams},
    })
  },
  getBy<T>(url: string, ID: string) {
    return instance.get<IApiResult<T>>(`/${url}/${ID}`)
  },
  post(url: string, data: Object) {
    return instance.post(`/${url}`, data)
  },
  put(url: string, data: Object) {
    return instance.put(`/${url}`, data)
  },
  delete(url: string, id: Object) {
    return instance.delete(`/${url}/${id}`)
  },
}

export default RestApi
