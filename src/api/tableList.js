import request from '@/utils/request'

export function fetchTableList(query) {
  return request({
    url: '/table/traderIdentityVerification',
    method: 'post',
    params: query
  })
}
