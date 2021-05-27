import {
  Http
} from '../utils/http'
import { Paging } from '../utils/paging'

class SpuPaging {
  static getLatestPaging() {
    return new Paging({
      url: 'spu/latest'
    }, 6)
  }
  static getDetail(pid) {
    return Http.request({
      url:`spu/id/${pid}/detail`
    })
  }
}
export {
  SpuPaging
}