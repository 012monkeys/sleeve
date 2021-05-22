import {
  config
} from '../config/config.js'
import {
  promise
} from './util.js'

class Http {
  static async request({
    url,
    data,
    method
  }) {
    return await promise(wx.request)({
      url: `${config.apiBaseUrl}${url}`,
      data,
      method,
      header: {
        appkey: config.appkey
      }
    })
  }

  static _request({
    url,
    data,
    callback,
    method
  }) {
    method = method || 'GET'
    wx.request({
      url: `${config.apiBaseUrl}${url}`,
      data,
      method,
      header: {
        appkey: config.appkey
      },
      success(res) {
        callback(res.data)
      }
    })
  }
}

export {
  Http
}