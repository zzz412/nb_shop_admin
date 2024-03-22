// 自己封装Axios函数
import Axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

// 1. 创建一个axios实例
const request = Axios.create({
  // 请求公共路径[后续所有请求都会自动拼接在公共路径上]
  baseURL: 'https://zhi.zeng.pub/new-bee/manage-api/v1'
})

// 2. 添加请求拦截器 【作用: 对每次请求做拦截】
request.interceptors.request.use(
  // 请求成功
  (config) => {
    // 为每次请求添加token  -> headers
    config.headers.token = store.state.user.token
    return config
  },
  // 请求失败
  (error) => Promise.reject('网络异常' + error)
)

// 2. 添加响应拦截器 【作用: 对每次请求的响应做拦截】
request.interceptors.response.use(
  // 响应成功 res响应结果
  (res) => {
    // 将响应的数据解析
    const data = res.data
    // 处理响应结果 [判断状态码是否为200 -> 错误提示并返回Promise失败状态]
    if (data.resultCode !== 200) {
      Message.error(data.message)
      // 判断是否为419错误 [token失效、用户未登录   ->   清理token]
      if (data.resultCode === 419) {
        store.commit('user/resetInfo')
        router.push('/login')
      }
      return Promise.reject('错误')
    }
    // 将成功结果返回
    return data.data
  },
  // 响应失败 err响应错误原因
  (err) => Promise.reject(err)
)

// 3. 导出实例
export default request
