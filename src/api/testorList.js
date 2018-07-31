import request from '@/utils/request'

export function fetchTestorList(query) {
  return request({
    url: '/account/test/authorize',
    method: 'get',
    params: query
  })
}
