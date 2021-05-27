// components/spu-proview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object
  },
  observers: {
    data: function(data){ // 切割服务器返回的标签字符串为数组
      if(!data) {
        return
      }
      if(!data.tags) {
        return
      }
      const tags = data.tags.split('$')
      this.setData({
        tags
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    tags: [],
    w:0,
    h:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onImgLoad(event) { // 计算图片的宽高比
      const {width, height} = event.detail
      // width 170
      let scale = Math.floor(height/width)
      this.setData({
        w: width,
        h: (width * scale)
      })

    },
    onItemTap(event) { // 点击商品,跳转到商品详情页
      const pid = event.currentTarget.dataset.pid
      wx.navigateTo({
        url: `/pages/detail/detail?pid=${pid}`,
      })
    }
  }
})