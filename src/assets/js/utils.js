export const promisify = (func, ctx) => {
    // 返回一个新的function
    return function () {
      // 初始化this作用域
      var ctx = ctx || this;
      // 新方法返回的promise
      return new Promise((resolve, reject) => {
        // 调用原来的非promise方法func，绑定作用域，传参，以及callback（callback为func的最后一个参数）
        func.call(ctx, ...arguments, function () {
          // 将回调函数中的的第一个参数error单独取出
          var args = Array.prototype.map.call(arguments, item => item);
          var err = args.shift();
          // 判断是否有error
          if (err) {
            reject(err)
          } else {
            // 没有error则将后续参数resolve出来
            args = args.length > 1 ? args : args[0];
            resolve(args);
          }
        });
      })
    };
  };
   
  export const promiseImage = (url) => {
    return new Promise(function (resolve, reject) {
      resolve(url)
    })
  }
  export const isChinese = (str) => {
    if (escape(str).indexOf("%u") < 0) return false
    return true
  }
   
  export const handleName = (str) => {
    let res = emoj2str(str)
    if (isChinese(res)) {
      res = res.length > 4 ? res.slice(0, 4) + '...' : res
    } else {
      res = res.length > 7 ? res.slice(0, 7) + '...' : res
    }
    return res
  }
   
  export const emoj2str = (str) => {
    return unescape(escape(str).replace(/\%uD.{3}/g, ''))
  }
  /*获取当前页url*/
  export const getCurrentPageUrl = () => {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length - 1]
    let url = currentPage.route
    return url
  }
   
  export const formatTime = date => {
    let dates=new Date(date)
    const year = dates.getFullYear()
    const month = dates.getMonth() + 1
    const day = dates.getDate()
    const hour = dates.getHours()
    const minute = dates.getMinutes()
    const second = dates.getSeconds()
   
    //return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
    return [year, month, day].map(formatNumber).join('/')
  }
   
  export const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  export const logError = (name, action, info) => {
    if (!info) {
      info = 'empty'
    }
    try {
      let deviceInfo = wx.getSystemInfoSync()
      var device = JSON.stringify(deviceInfo)
    } catch (e) {
      console.error('not support getSystemInfoSync api', err.message)
    }
    let time = formatTime(new Date())
    console.error(time, name, action, info, device)
    // if (typeof action !== 'object') {
    // fundebug.notify(name, action, info)
    // }
    // fundebug.notifyError(info, { name, action, device, time })
    if (typeof info === 'object') {
      info = JSON.stringify(info)
    }
  }

  export const orderStatus= (code)=>{
      const statusList=[
        { type:1, tit:"待处理" },
        { type:2, tit:"待支付" },
        { type:3, tit:"待审核" },
        { type:4, tit:"待发货" },
        { type:5,tit:'部分发货'},
        { type:6, tit:"待收货" },
        { type:7, tit:"已完成" },
        { type:8, tit:"已取消" }
      ]
      return statusList.filter(ele=>{
        return ele.type==code
      })[0].tit
  }

  export const trackStatus= (code)=>{
    const statusList=[
      { type:1, tit:"待处理" },
      { type:2, tit:"待付款" },
      { type:3, tit:"待付款" },   //待审核
      { type:4, tit:"待运输" },   //待分配
      { type:5,tit:'待运输'},
      { type:6, tit:"运输中" },
      { type:7, tit:"已完成" },
      { type:8, tit:"已取消" }
    ]
    return statusList.filter(ele=>{
      return ele.type==code
    })[0].tit
}