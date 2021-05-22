const promise = function (func) { // 封装程序的request的请求, 利用代理模式, 闭包等知识
  return function(params = {}) {
    return new Promise((resolve,reject) => {
      const args = Object.assign(params, {
        success: (res) => {
          resolve(res.data)
        },
        fail: (error) => {
          reject(error)
        }
      })
      func(args)
    })
  }
}

export  {
  promise
}