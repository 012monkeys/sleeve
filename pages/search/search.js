// pages/search/search.js
import {
  HistoryKeyword
} from '../../models/history-keyword'
import {
  Tag
} from '../../models/tag'
import {
  Search
} from '../../models/search'
import {
  showToast
} from '../../utils/ui.js'
const history = new HistoryKeyword()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyTags: [],
    search: false,
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const historyTags = history.get()
    const hotTags = await Tag.getSearchTags()
    this.setData({
      historyTags,
      hotTags
    })
  },

  async onSearch(event) { // 点击搜索

    const keyword = event.detail.value || event.detail.name
    if (!keyword) { // keyword为空时, 返回
      showToast('输入不能为空')
      return
    }
    this.setData({
      search: true,
      loading: true
    })

    history.save(keyword) // 保存历史记录
    this.setData({
      historyTags: history.get()
    })
    const paging = Search.search(keyword) // 请求搜索结果
    const data = await paging.getMoreData()
    this.setData({
      loading: false
    })
    this.bindItems(data) // 绑定数据
  },

  onCancel() { // 取消
    this.setData({
      search: false,
      items: []
    })
  },
  bindItems(data) {
    if (data.accumulator.length !== 0) {
      this.setData({
        items: data.accumulator
      })
    }
  },
  onDeleteHistory() { // 清空缓存
    history.clear()
    this.setData({
      historyTags: history.get()
    })
  }
})