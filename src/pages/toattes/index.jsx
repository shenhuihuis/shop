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
        navigationBarTitleText: '认证'
    }
    render() { 
        return (
            <View className='toattes'>
                <View className='navs'>
                    <View className='li act'>认证个人</View>
                    <View className='li'>认证企业</View>
                </View>
                <View className='txtbox'>
                    <Input placeholder='请输入手机号码'></Input>
                    <View className='send'>快速获取</View>
                </View>
                <View className='bton'>
                    <View className='sub'>验证</View>
                </View>
            </View>
        );
    }
}
 
export default Order;