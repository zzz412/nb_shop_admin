// 订单模块 接口方法
import request from '@/utils/request'

//* 获取订单列表
export const orderListApi = (params) => request.get('/orders', { params })

//* 获取订单详情
export const getOrderApi = (id) => request.get('/orders/' + id)

//* 修改订单状态【配货成功】
export const checkDoneApi = (ids) => request.put('/orders/checkDone', { ids })

//* 修改订单状态【出库成功】
export const checkOutApi = (ids) => request.put('/orders/checkOut', { ids })

//* 修改订单状态【关闭订单】
export const checkCloseApi = (ids) => request.put('/orders/close', { ids })
