import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import Navs from "./../../components/nav"
import './index.less'
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            
        }
    }
    config = {
        navigationBarTitleText: '个人中心'
    }
    render() { 
        return (
            <View className='center'>
                <View className='tp'>
                    <View className='lf'>
                        <View className='hello'>Hi~，长颈鹿</View> 
                       {
                           // <View className='tosee'>去认证</View>
                            <View className='issee'>已认证</View>
                        }
                    </View>
                    <Image></Image>
                </View>
                <View className='bnav'>
                    <View className='va'>商品订单</View>
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
                    <View className='li'>
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