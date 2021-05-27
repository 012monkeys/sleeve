// pages/detail/detail.js
import {
  SpuPaging
} from '../../models/spu-paging'
import {
  ShoppingWay
} from '../../core/enum'
import {SaleExplain} from '../../models/sale-explain'
import {getWindowHeightRpx} from '../../utils/system'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    spu: null,
    showRealm: false,
    orderWay: null,
    explain: [],
    h: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const hRpx =  await getWindowHeightRpx()
    const h = hRpx - 100 // 减去底下按钮的高度, 设置详细页的高度

    const pid = options.pid
    const spu = await SpuPaging.getDetail(pid) // 向服务器发送商品ID获得sku数据
    const explain = await SaleExplain.getFixed() //  向服务器获得商品补充说明
    this.setData({
      spu,
      explain,
      h
    })

  },

  onAddToCart() {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.CART
    })
  },
  onGotoHome() {
    wx.switchTab({
      url: '/pages/home/home'
    })
  },
  onGotoCart() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  onBuy() {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.BUY
    })
  },
  onSpecChange(event) { // realm子组件传递过来的数据
    this.setData({
      specs: event.detail
    })
  }
})