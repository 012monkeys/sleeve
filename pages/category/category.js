// pages/category/category.js
import {
  getWindowHeightRpx
} from '../../utils/system'

import {
  Categories
} from '../../models/categories'

import {
  SpuListType
} from "../../core/enum";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roots: null, // 所有的分类
    currentSubs: null, // 当下的分类
    segHeight: 0,
    defaultRootId: 2,
    currentBannerImg: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this.initCategoryData()
    await this.setDynamicSegmentHeight()

  },
  async initCategoryData() {
    const categories = new Categories()
    this.data.categories = categories
    await categories.getAll()
    const roots = categories.getRoots()
    const defaultRoot = this.getDefaultRoot(roots) // 查找默认的默认选中的选项卡
    const currentSubs = categories.getSubs(defaultRoot.id) // 二级分类
    console.log(roots)
    console.log(currentSubs)

    this.setData({
      roots,
      currentSubs,
      currentBannerImg: defaultRoot.img
    })

  },

  getDefaultRoot(roots) { // 设置默认选中的选项卡
    let defaultRoot = roots.find(r => r.id === this.data.defaultRootId)
    if (!defaultRoot) {
      defaultRoot = roots[0]
    }
    return defaultRoot
  },

  async setDynamicSegmentHeight() { // 设置选项卡的高度
    const windowHeightRpx = await getWindowHeightRpx()
    const h = windowHeightRpx - 60 - 20 - 2
    this.setData({
      segHeight: h
    })
  },

  onGotoSearch() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  onSegChange(event) { // 点击不同商品类型切换显示
    const rootId = event.detail.activeKey // l-segment 内置的一个属性key
    const currentSubs = this.data.categories.getSubs(rootId)
    const currentRoot = this.data.categories.getRoot(rootId)

    this.setData({
      currentSubs,
      currentBannerImg: currentRoot.img
    })
  },
  onJumpToSpuList(event) { //  点击二级分类, 跳转到指定页面
    const cid = event.detail.cid
    wx.navigateTo({
      url: `/pages/spu-list/spu-list?cid=${cid}&type=${SpuListType.SUB_CATEGORY}`
    })


  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})