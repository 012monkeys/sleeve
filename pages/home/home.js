// pages/home/home.js
import {
  Theme
} from '../../model/theme'
import {
  Banner
} from '../../model/banner'
import {
  Category
} from '../../model/category'
import {
  Activity
} from '../../model/activity'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeA: null,
    themeE: null,
    bannerB: null,
    grid: [],
    ActivityD: null,
    themeESpu: null,
    bannerG: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.initAllData()
  },

  async initBottomSpuList() {
    
  },
  async initAllData() {
    const theme = new Theme()
    await theme.getThemes()

    const bannerB = await Banner.getHomeLocationB()
    const themeA = theme.getHomeLocationA()
    const themeE = theme.getHomeLocationE()
    let themeESpu = []
    if (themeE.online) {
      const data = await Theme.getHomeLocationESpu()
      if (data) {
        themeESpu = data.spu_list.slice(0, 8)
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

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})