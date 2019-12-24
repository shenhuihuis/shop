import Taro, { Component } from '@tarojs/taro'
import { View ,Text} from '@tarojs/components'
import './index.less'
class Settle extends Component {
    config = {
        navigationBarTitleText: '供应商入驻',

    }
    constructor(props) {
        super(props);
        this.state = { 


        }
    }
    went=(type,e)=>{
        e.stopPropagation()
        Taro.navigateTo({url:"/pages/settledyz/index?type="+type})
    }
    render() { 
        return ( 
            <View className='settle'>
                <View className='li' onTap={this.went.bind(this,4)}>
                    <View className='name'>商品供应商</View>
                    <View className='i'>企业</View>
                </View>
                <View className='li' onTap={this.went.bind(this,6)}>
                    <View className='name' >物流供应商</View>
                    <View className='i'>企业</View>
                </View>
                <View className='li'  onTap={this.went.bind(this,3)}>
                    <View className='name'>商品供应商</View>
                    <View className='i'>个人</View>
                </View>
                <View className='li' onTap={this.went.bind(this,5)}>
                    <View className='name' >物流供应商</View>
                    <View className='i'>个人</View>
                </View>
            </View>
        );
    }
}
 
export default Settle;