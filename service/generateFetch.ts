import axios from 'axios'

export const generateFetch = (baseurl: string) => {
  const requestInstance = axios.create({
    baseURL: baseurl
  })

  requestInstance.interceptors.request.use(
    config => config,
    error => Promise.reject(error)
  )

  requestInstance.interceptors.response.use(
    response => {
      if (response?.status === 200) {
        return response?.data
      } else {
        return {
          code: -1,
          msg: '未知错误',
          data: null
        }
      }
    },
    error => Promise.reject(error)
  )

  return requestInstance
}

export default generateFetch
