import instance from '../instance'

const RestApi = {
  get<T>(url: string, params: Object) {
    return instance.get<IApiResult<T>>(`/${url}`, {
      params,
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
