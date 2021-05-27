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

const combination = function (arr, size) {
  var r = [];
  function _(t, a, n) {
      if (n === 0) {
          r[r.length] = t;
          return;
      }
      for (var i = 0, l = a.length - n; i <= l; i++) {
          var b = t.slice();
          b.push(a[i]);
          _(b, a.slice(i + 1), n - 1);
      }
  }
  _([], arr, size);
  return r;
}



const promisic = function (func) {
  return function (params = {}) {
      return new Promise((resolve, reject) => {
          const args = Object.assign(params, {
              success: (res) => {
                  resolve(res);
              },
              fail: (error) => {
                  reject(error);
              }
          });
          func(args);
      });
  };
};


export  {
  promise,
  combination,
  promisic
}