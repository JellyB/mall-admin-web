import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url: '/mall-admin/couponHistory/list',
    method: 'get',
    params: params
  })
}
