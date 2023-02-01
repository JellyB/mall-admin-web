import request from '@/utils/request'
export function fetchList() {
  return request({
    url: '/mall-admin/companyAddress/list',
    method: 'get'
  })
}
