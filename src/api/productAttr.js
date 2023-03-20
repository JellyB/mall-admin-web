import request from '@/utils/request'
export function fetchList(cid, params) {
  return request({
    url: '/mall-admin/productAttribute/list/' + cid,
    method: 'get',
    params: params
  })
}

export function deleteProductAttr(data) {
  return request({
    url: '/mall-admin/productAttribute/delete',
    method: 'post',
    data: data
  })
}

export function createProductAttr(data) {
  return request({
    url: '/mall-admin/productAttribute/create',
    method: 'post',
    data: data
  })
}

export function updateProductAttr(id, data) {
  return request({
    url: '/mall-admin/productAttribute/update/' + id,
    method: 'post',
    data: data
  })
}
export function getProductAttr(id) {
  return request({
    url: '/mall-admin/productAttribute/' + id,
    method: 'get'
  })
}

export function getProductAttrInfo(productCategoryId) {
  return request({
    url: '/mall-admin/productAttribute/attrInfo/' + productCategoryId,
    method: 'get'
  })
}
