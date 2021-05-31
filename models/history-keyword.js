class HistoryKeyword {

  static MAX_ITEM_COUNT = 3
  static key = 'keyword'
  items = []

  constructor() {
    
    // 单例模式, 保证全局只有一个实例对象
    if (typeof HistoryKeyword.instance === 'object') {
      return HistoryKeyword.instance
    }
    HistoryKeyword.instance = this
    this.keywords = this._getLocalKeywords()
    return this
  }
  save(keyword) {

    // keyword 存不存在
    const item = this.items.find((i) => {
      return i === keyword
    })
    if (item) {
      return
    }

    // 判断数组长度
    if (this.items.length >= HistoryKeyword.MAX_ITEM_COUNT) {
      this.items.pop()
    }
    this.items.unshift(keyword)
    this._refreshLocal()
  }

  get() {
    return this.items
  }

  clear() {
    this.items = []
    this._refreshLocal()
  }

  _refreshLocal() {
    wx.setStorageSync(HistoryKeyword.key, this.items)
  }
  _getLocalKeywords() {
    const items = wx.getStorageSync(HistoryKeyword.KEY)
    if (!items) {
      wx.setStorageSync(HistoryKeyword.key, [])
      return []
    }
    return items
  }
}

export {
  HistoryKeyword
}