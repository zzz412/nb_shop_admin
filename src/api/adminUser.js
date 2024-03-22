// 管理员模块 接口方法
import request from '@/utils/request'

// * 登录方法
export const loginApi = (data) => request.post('/adminUser/login', data)

// * 退出登录
export const logoutApi = () => request.delete('/logout')

// * 获取个人信息
export const userInfoApi = () => request.get('/adminUser/profile')

// * 修改昵称
export const updateNameApi = (data) => request.put('/adminUser/name', data)

// * 修改密码
export const updatePasswordApi = (data) => request.put('/adminUser/password', data)
