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
            user:{}
        }
    }
    config = {
        navigationBarTitleText: '个人中心'
    }
    componentWillMount(){
        $http.get("account").then(user=>{
            Taro.setStorageSync("user",JSON.stringify(user))
            setGlobalData("user",JSON.stringify(user))
            this.setState({
                user:user
            })
       })
    }
    went=(e)=>{
        Taro.navigateTo({url:e})
    }
    render() { 
        let user=this.state.user;
        return (
            <View className='center'>
                <View className='tp'>
                    <View className='lf'>
                        <View className='hello'>Hi~，{user.uname || "先生"}</View> 
                        {    
                            user.status==3 ? <View className='issee'>已认证</View> :<View className='tosee'>{["去认证","审核中","认证失败"][user.status]}</View>
                        }
                    </View>
                    <Image></Image>
                </View>
                <View className='bnav'>
                    <View className='va' onTap={this.went.bind(this,"/pages/orderlist/index")}>商品订单</View>
                    <View className='va'>物流订单</View>
                </View>
                <View className='ul'>
                    <View className='li'>
                        <View className='tit'>我的收藏</View>
                    </View>
                    <View className='li'>
                        <View className='tit'>收货地址</View>
                    </View>
                    <View className='li'>
                        <View className='tit'>供应商入驻</View>
                    </View>
                    <View className='li' onTap={this.went.bind(this,"/pages/appealRecord/index")}>
                        <View className='tit'>申诉记录</View>
                    </View>
                    <View className='li' onTap={this.went.bind(this,"/pages/about/index")}>
                        <View className='tit'>关于我们</View>
                    </View>
                    <View className='li'>
                        <View className='tit'>客服</View>
                    </View>
                </View>
                 <Navs index='3'></Navs>
            </View>
        );
    }
}
 
export default Order;