import request from '@/utils/request'
export function fetchList(parentId, params) {
  return request({
    url: '/mall-admin/productCategory/list/' + parentId,
    method: 'get',
    params: params
  })
}
export function deleteProductCate(id) {
  return request({
    url: '/mall-admin/productCategory/delete/' + id,
    method: 'post'
  })
}

export function createProductCate(data) {
  return request({
    url: '/mall-admin/productCategory/create',
    method: 'post',
    data: data
  })
}

export function updateProductCate(id, data) {
  return request({
    url: '/mall-admin/productCategory/update/' + id,
    method: 'post',
    data: data
  })
}

export function getProductCate(id) {
  return request({
    url: '/mall-admin/productCategory/' + id,
    method: 'get'
  })
}

export function updateShowStatus(data) {
  return request({
    url: '/mall-admin/productCategory/update/showStatus',
    method: 'post',
    data: data
  })
}

export function updateNavStatus(data) {
  return request({
    url: '/mall-admin/productCategory/update/navStatus',
    method: 'post',
    data: data
  })
}

export function fetchListWithChildren() {
  return request({
    url: '/mall-admin/productCategory/list/withChildren',
    method: 'get'
  })
}
