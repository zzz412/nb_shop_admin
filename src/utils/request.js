// 自己封装Axios函数
import Axios from 'axios'

// 1. 创建一个axios实例
const request = Axios.create({
  // 请求公共路径[后续所有请求都会自动拼接在公共路径上]
  baseURL: 'https://zhi.zeng.pub/new-bee/manage-api/v1'
})

// 2. 添加响应拦截器 【作用: 对每次请求的响应做拦截】
request.interceptors.response.use(
  // 响应成功 res响应结果
  (res) => {
    // 将响应的数据解析并返回
    const data = res.data
    return data
  },
  // 响应失败 err响应错误原因
  (err) => Promise.reject(err)
)

// 3. 导出实例
export default request
