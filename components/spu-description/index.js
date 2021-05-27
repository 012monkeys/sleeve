// components/spu-description/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    tags: Array
  },


  observers:{
    // 切割spu里的字符串, 变为数组返回
    'spu':function (spu) {
      if(!spu){
        return
      }
      if(!spu.tags){
        return
      }
      const tags = spu.tags.split('$')
      this.setData({
        tags
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
