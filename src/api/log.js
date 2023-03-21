import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/admin/logs',
    method: 'get',
    params: params
  })
}
