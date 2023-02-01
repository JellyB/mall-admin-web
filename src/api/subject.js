import request from '@/utils/request'
export function fetchListAll() {
  return request({
    url: '/mall-admin/subject/listAll',
    method: 'get'
  })
}

export function fetchList(params) {
  return request({
    url: '/mall-admin/subject/list',
    method: 'get',
    params: params
  })
}
