import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    startTime: Mock.mock('@date'),
    endTime: Mock.mock('@date'),
    idCard: '@cname',
    'tel|1': ['13531544954', '13632250649', '15820292420', '15999905612'],
    idCardNo: Mock.Random.id(),
    idCardPic: Mock.Random.image('360x200', '#FFC0CB', 'ID Card'),
    busiLicNum: Mock.Random.id(),
    busiLicName: '@increment',
    busiLicPic: Mock.Random.image('360x200', '#D1EEEE', 'Business Licence'),
    'status|1': ['未处理', '生效中', '已拒绝', '已过期'],
    reviewer: '@cname(3)'
  }))
}

export default {
  getTraderList: config => {
    const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  }
}
