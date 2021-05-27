// pages/home/home.js
import {
  Theme
} from '../../models/theme'
import {
  Banner
} from '../../models/banner'
import {
  Category
} from '../../models/category'
import {
  Activity
} from '../../models/activity'

import {
  SpuPaging
} from '../../models/spu-paging'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeA: null,
    themeE: null,
    bannerB: null,
    ActivityD: null,
    themeESpu: null,
    bannerG: null, 
    grid: [],
    loadingType: 'loading' // 是否显示load动画
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: async function (options) {
    this.initAllData()
    this.initBottomSpuList()
  },

  async initBottomSpuList() { // 获得商品列表
    const paging = SpuPaging.getLatestPaging()
    this.data.paging = paging
    const data = await paging.getMoreData() 
    if(!data) {
      return
    }
    wx.lin.renderWaterFlow(data.items)
  },
  
  async initAllData() {
    const theme = new Theme()
    await theme.getThemes()

    const bannerB = await Banner.getHomeLocationB()
    const themeA = theme.getHomeLocationA()
    const themeE = theme.getHomeLocationE()
    let themeESpu = []
    if (themeE.online) { // 主题是否在线
      const data = await Theme.getHomeLocationESpu()
      if (data) {
        themeESpu = data.spu_list.slice(0, 8) // 最多展示的数量
      }
    }
    const themeF = theme.getHomeLocationF()
    const themeH = theme.getHomeLocationH()
    const bannerG = await Banner.getHomeLocationG()
    const grid = await Category.getHomeLocationC()
    const activityD = await Activity.getHomeLocationD()
    this.setData({
      bannerB: bannerB,
      themeA,
      themeE,
      themeF,
      grid: grid,
      activityD: activityD,
      themeESpu,
      bannerG,
      themeH
    })

  },


  onPullDownRefresh: function () {

  },

  async onReachBottom() { // 到达底部的时候
    const data = await this.data.paging.getMoreData()
    if(!data) {
      return
    }
    wx.lin.renderWaterFlow(data.items)
    if(!data.moreData) {
      this.setData({
        loadingType: 'end'
      })
    }
    
  },

  onShareAppMessage: function () {

  }
})