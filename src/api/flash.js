import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url: '/mall-admin/flash/list',
    method: 'get',
    params: params
  })
}
export function updateStatus(id, params) {
  return request({
    url: '/mall-admin/flash/update/status/' + id,
    method: 'post',
    params: params
  })
}
export function deleteFlash(id) {
  return request({
    url: '/mall-admin/flash/delete/' + id,
    method: 'post'
  })
}
export function createFlash(data) {
  return request({
    url: '/mall-admin/flash/create',
    method: 'post',
    data: data
  })
}
export function updateFlash(id, data) {
  return request({
    url: '/mall-admin/flash/update/' + id,
    method: 'post',
    data: data
  })
}
