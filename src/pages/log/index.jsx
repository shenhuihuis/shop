import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import './index.less'
import $http from "@public/server"

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    }
  }
  config = {
    navigationBarTitleText: '',
    navigationBarBackgroundColor: '#5ECC96',
    navigationBarTextStyle: 'white'
  }

  componentWillMount() {
   
  }
  bindGetUserInfo = (e) => {
    if (e.detail.encryptedData) {
      wx.getUserInfo({
        success: res => {
          let data = JSON.parse(res.rawData)
          Taro.setStorageSync("name",data.nickName)
          Taro.setStorageSync("avatarUrl",data.avatarUrl)
          this.login()
        }
      })
    }
  }
  login = () => {
    let _this = this;
    Taro.login().then(response => {
      if (response.code) {
        $http.post("wechat/login", { code: response.code }).then(e => {
          Taro.setStorageSync("token", e.token)
          Taro.reLaunch({url:'/pages/index/index'})
        })
      } else {

      }
    })
  }
  render() {
    return (
      <View className='log'>
         <View className='bot'>
            <View className='tit'>开启新的商流体验</View>
            <Button open-type="getUserInfo" ongetuserinfo={this.bindGetUserInfo.bind(this)}>授权</Button>
         </View>
      </View>
    )
  }
}
