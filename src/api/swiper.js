// 轮播图模块 接口方法
import request from '@/utils/request'

//* 获取轮播图列表
export const swiperListApi = (params) => request.get('/carousels', { params })

//* 修改轮播图
export const editSwiperApi = (data) => request.put('/carousels', data)

//* 新增轮播图
export const addSwiperApi = (data) => request.post('/carousels', data)

//* 批量删除轮播图
export const delSwiperApi = (data) => request.delete('/carousels', { data })

//* 获取单个轮播图
export const getSwiperApi = (id) => request.get('/carousels/' + id)
