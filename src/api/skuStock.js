import request from '@/utils/request'
export function fetchList(pid, params) {
  return request({
    url: '/mall-admin/sku/' + pid,
    method: 'get',
    params: params
  })
}

export function update(pid, data) {
  return request({
    url: '/mall-admin/sku/update/' + pid,
    method: 'post',
    data: data
  })
}
