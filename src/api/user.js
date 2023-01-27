import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/mall-admin/admin/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/mall-admin/admin/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/mall-admin/admin/logout',
    method: 'post'
  })
}

export function fetchList(params) {
  return request({
    url: '/mall-admin/admin/list',
    method: 'get',
    params: params
  })
}

export function createAdmin(data) {
  return request({
    url: '/mall-admin/admin/register',
    method: 'post',
    data: data
  })
}

export function updateAdmin(id, data) {
  return request({
    url: '/mall-admin/admin/update/' + id,
    method: 'post',
    data: data
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/mall-admin/admin/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function deleteAdmin(id) {
  return request({
    url: '/mall-admin/admin/delete/' + id,
    method: 'post'
  })
}

export function getRoleByAdmin(id) {
  return request({
    url: '/mall-admin/admin/role/' + id,
    method: 'get'
  })
}

export function allocRole(data) {
  return request({
    url: '/mall-admin/admin/role/update',
    method: 'post',
    data: data
  })
}
