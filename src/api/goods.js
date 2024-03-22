// 商品API模块
import request from '@/utils/request'

//* 获取分类列表
export const cateListApi = (params) => request.get('/categories', { params })

//* 修改分类
export const editCateApi = (data) => request.put('/categories', data)

//* 新增分类
export const addCateApi = (data) => request.post('/categories', data)

//* 批量删除分类
export const delCateApi = (data) => request.delete('/categories', { data: { ids: data } })

//* 获取单个分类
export const getCateApi = (id) => request.get('/categories/' + id)

//* 获取分类列表三级
export const getCateSelectApi = (categoryId) => request.get('/categories4Select/', { params: { categoryId } })

//* 获取商品列表
export const goodsListApi = (params) => request.get('/goods/list', { params })

//* 修改商品
export const editGoodsApi = (data) => request.put('/goods', data)

//* 新增商品
export const addGoodsApi = (data) => request.post('/goods', data)

//* 批量修改商品状态
export const changeGoodsStatusApi = (sellStatus, ids) => request.put('/goods/status/' + sellStatus, { ids })

//* 获取单个商品
export const getGoodsApi = (id) => request.get('/goods/' + id)
