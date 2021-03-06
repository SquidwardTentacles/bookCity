import vue from 'vue'
import axios from 'axios'
import { address, port } from '../server/config.json'
import { Message } from 'element-ui'
console.log(address, port)

// axios.defaults.baseURL = `http://${address}:${port}`
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 记得返回config参数
  return config
  // 在发送请求之前做些什么
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (res) {
  // 对响应数据做点什么
  return Promise.resolve(res.data)
}, function (error) {
  // 对响应错误做点什么

  Message.error('服务器异常！')
  return Promise.reject(error)
})

vue.prototype.axios = axios
