import {
  Http
} from '../utils/http'

class Paging {

  start
  count
  req
  locker = false
  url
  moreData = true
  accumulator = []

  // 不关心细节, 调用接口就返回数据 
  // 反复请求上锁 
  constructor(req, count = 10, start = 0) {
    // 这些参数实例时, 保存起来
    this.start = start
    this.count = count
    this.req = req
    this.url = req.url
  }

  async getMoreData() {
    if (!this.moreData) { // 判断有没更多数据
      return
    }
    if (this._getLock) { // 判断有没上锁
      return
    }
    const data = await this._actulGetData()
    this._releaseLocker()
    return data
  }

  async _actulGetData() {
    const req = this._getCurrentReq() // 获得formatURL
    let paging = await Http.request(req)

    if (!paging) { // 直接返回
      return null
    }
    if (paging.total == 0) { // 直接返回
      return {
        empty: true,
        item: [],
        moreData: false,
        accumulator: []
      }
    }

    this.moreData = Paging._moreData(paging.total_page, paging.page)
    if (this.moreData) {
      this.start += this.count
    }
    this._accumulate(paging.items) // 把新的items压入整体数据中
    return {
      empty: false,
      items: paging.items,
      moreData: this.moreData,
      accumulator: this.accumulator
    }
  }

  _accumulate(items) {
    this.accumulator = this.accumulator.concat(items)
  }

  static _moreData(totalPage, pageNum) {
    return pageNum < totalPage - 1
  }

  _getCurrentReq() { // 判断url最后一位是否是?
    let url = this.url
    const params = `start=${this.start}&count=${this.count}`
    if (url.includes('?')) {
      url += '&' + params
      // contains
    } else {
      url += '?' + params
    }
    this.req.url = url
    return this.req
  }

  _getLocker() {
    if (this.locker) {
      return false
    }
    this.locker = true
    return true
  }

  _releaseLocker() {
    this.locker = false
  }

}

export {
  Paging
}