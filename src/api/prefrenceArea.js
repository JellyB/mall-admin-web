import request from '@/utils/request'
export function fetchList() {
  return request({
    url: '/mall-admin/prefrenceArea/listAll',
    method: 'get'
  })
}
