import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url: '/mall-admin/brand/list',
    method: 'get',
    params: params
  })
}
export function createBrand(data) {
  return request({
    url: '/mall-admin/brand/create',
    method: 'post',
    data: data
  })
}
export function updateShowStatus(data) {
  return request({
    url: '/mall-admin/brand/update/showStatus',
    method: 'post',
    data: data
  })
}

export function updateFactoryStatus(data) {
  return request({
    url: '/mall-admin/brand/update/factoryStatus',
    method: 'post',
    data: data
  })
}

export function deleteBrand(id) {
  return request({
    url: '/mall-admin/brand/delete/' + id,
    method: 'get'
  })
}

export function getBrand(id) {
  return request({
    url: '/mall-admin/brand/' + id,
    method: 'get'
  })
}

export function updateBrand(id, data) {
  return request({
    url: '/mall-admin/brand/update/' + id,
    method: 'post',
    data: data
  })
}

