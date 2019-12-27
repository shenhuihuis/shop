import Taro from '@tarojs/taro'
import { HTTP_STATUS } from './code'   
import { logError } from './utils'
import { setGlobalData,getGlobalData} from "./global_data"
export default {
  baseOptions(params, method = 'GET') {
    let { url, data } = params
    let token = Taro.getStorageSync("token") || getGlobalData("token");
    let contentType = 'application/x-www-form-urlencoded'
    contentType = params.contentType || contentType
    const option = {
      isShowLoading: false,
      loadingText: '正在加载',
      url:  process.env.HOST+ url,
      data: data,
      method: method,
      dataType: 'json',
      header: { 'content-type': contentType, Authorization: `Bearer ${token}` },
      success(res) {
        if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
          return logError('api', '请求资源不存在')
        } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
          return logError('api', '服务端出现了问题')
        } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
          return logError('api', '没有权限访问')
        } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
          return res.data
        }
      },
      error(e) {
        logError('api', '请求接口出现问题', e)
      }
    }
    return new Promise(function (resolve, reject) {
      Taro.request(option).then(e=>{
        console.log(e.data)
        console.log(data)
        console.log(url)
        if(e.data.code==1000){
          resolve(e.data.data)
        }
        else if(e.data.code==1014){
          Taro.removeStorageSync("token")
          Taro.reLaunch({url:"/pages/index/index"})
          return false;
        }
        else{
          Taro.showToast({
            title: e.data.msg,
            icon: 'none',
            duration: 1000
          })
          setTimeout(function () {
            Taro.hideLoading()
         }, 2000)
          reject()
        }
    })
    })
  },
  get(url, data = '') {
    let option = { url, data }
    return this.baseOptions(option)
  },
  post: function (url, data, contentType='application/json') {
    let params = { url, data, contentType }
    return this.baseOptions(params, 'POST')
  }
}