import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true, // 跨域请求时发送 cookies
  timeout: 5000 // 超时
})

//请求拦截
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
//响应拦截
service.interceptors.response.use(

  response => {
    const res = response.data
    if (res.code !== 20000) { //后台返回的请求失败状态码处理
      /*   Message({
          message: res.message || 'error',
          type: 'error',
          duration: 5 * 1000
        }) */
      //TODO 具体的失败状态码处理，比如提示重新登录等
      return Promise.reject(res || 'error')
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
