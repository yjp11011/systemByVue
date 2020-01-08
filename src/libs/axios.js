
import axios from 'axios'
import store from '@/store'
import { isEmpty } from 'lodash'
import { Modal } from 'iview'

// UUID
function uuid () {
  function S4 () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}
axios.defaults.withCredentials = true
class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        // 'Authorization': 'Bearer ' + 'token',
        // 'TOKEN': 'test',
        // 固定设置请求头
        'X-GW-APP-ID': 1103,
        'CHANNEL_ID': 'CZ'
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    instance.defaults.headers.common['X-GW-NONCE'] = uuid()
    instance.defaults.headers.common['X-GW-TIME'] = new Date().getTime()
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 动态设置请求

      // 添加全局的loading...
      store.dispatch('saveLoading', true)
      this.queue[url] = true
      return config
    }, error => {
	    store.dispatch('saveLoading', true)
	    return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      if (res.status === 200) {
        if(data.head) {
          if (data.head.H_STATUS === '000000') {
            store.dispatch('saveLoading', false)
            return data.body
          } else {
            Modal.error({title: data.head.H_STATUS,content: data.head.H_MSG})
            store.dispatch('saveLoading', false)
            return false
          }
        }else {
          store.dispatch('saveLoading', false)
          return data
        }
      } else {
        Modal.error({title: '错误信息',content:'网络连接错误，请重试'})
      }
    }, error => {
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
      }
      Modal.error({title: status,content: statusText})
      store.dispatch('saveLoading', false)
      return Promise.reject(false)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
