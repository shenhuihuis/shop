import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import Navs from "./../../components/nav"
import './index.less'
import $http from "@public/server"
import {setGlobalData} from "@public/global_data"
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {      
            status:0,
            uname:Taro.getStorageSync("name"),
            img:Taro.getStorageSync("avatarUrl")
        }
    }
    config = {
        navigationBarTitleText: '个人中心'
    }
    componentDidShow(){
        
        Taro.hideHomeButton()
        if(Taro.getStorageSync("status")!=3){
            $http.get("account").then(user=>{
                Taro.setStorageSync("status",user.status);
                this.setState({
                    status:user.status
                })
            })
        }else{
            this.setState({
                status:3
            })
        }
    }
    bindGetUserInfo = (e) => {
        if (e.detail.encryptedData) {
          wx.getUserInfo({
            success: res => {
              let data = JSON.parse(res.rawData)
              console.log(res)
              $http.post("wechat/base",{
                data:res.encryptedData,
                iv:res.iv
              }).then(e=>{
                Taro.setStorageSync("name",data.nickName)
                Taro.setStorageSync("avatarUrl",data.avatarUrl)
                this.setState({
                    uname:data.nickName,
                    img:data.avatarUrl
                })
              })
            }
          })
        }
    }
    went=(e)=>{
        Taro.navigateTo({url:e})
    }
    render() { 
        let status=this.state.status;
        return (
            <View className='center'>
                <View className='tp'>
                    <View className='lf'>
                        <View className='hello'>Hi~，{this.state.uname || "Stranger"}</View> 
                        { status==0 ? <View className='tosee' onTap={this.went.bind(this,"/pages/toattes/index")}>去认证</View>:<View  className={`tosee ${status==3?"issee":""}`}  onTap={this.went.bind(this,"/pages/attes/index")}>{status==1?"审核中":(status==2?"认证失败":'已认证')}</View>}
                    </View>
                   { this.state.uname?<Image src={this.state.img}></Image>:
                   <View className='had'>
                        <Button open-type="getUserInfo" ongetuserinfo={this.bindGetUserInfo.bind(this)} class='log'>点击授权</Button>
                   </View>}
                </View>
                <View className='bnav'>
                    <View className='va' onTap={this.went.bind(this,"/pages/orderlist/index")}>商品订单</View>
                    <View className='va'  onTap={this.went.bind(this,"/pages/loglist/index")}>物流订单</View>
                </View>
                <View className='ul'>
                    <View className='li'>
                        <View className='tit' onTap={this.went.bind(this,'/pages/collect/index')}>我的收藏</View>
                    </View>
                    <View className='li'>
                        <View className='tit'  onTap={this.went.bind(this,'/pages/add_list/index')}>收货地址</View>
                    </View>
                  {/*  <View className='li'>
                        <View className='tit' onTap={this.went.bind(this,'/pages/settledIn/index')}>供应商入驻</View>
        </View>*/}
                    <View className='li' onTap={this.went.bind(this,"/pages/appealRecord/index")}>
                        <View className='tit'>申诉记录</View>
                    </View>
                    <View className='li' onTap={this.went.bind(this,"/pages/about/index")}>
                        <View className='tit'>关于我们</View>
                    </View>
                    <View className='li'>
                        <button open-type="contact" session-from="weapp" class='tit'>客服</button>
                    </View>
                </View>
                 <Navs index='3'></Navs>
            </View>
        );
    }
}
 
export default Order;