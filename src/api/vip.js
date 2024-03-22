// 会员模块 接口方法
import request from '@/utils/request'

//* 获取会员列表
export const vipListApi = (params) => request.get('/users', { params })

//* 批量操作会员状态  [禁用1  解禁0]
export const changeVipStatusApi = (status, ids) => request.put('/users/' + status, { ids })
