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
    render() { 
        return ( 
            <View className='settle'>
                <View className='li'>
                    <View className='name'>商品供应商</View>
                    <View className='i'>企业</View>
                </View>
                <View className='li'>
                    <View className='name'>商品供应商</View>
                    <View className='i'>企业</View>
                </View>
                <View className='li'>
                    <View className='name'>商品供应商</View>
                    <View className='i'>个人</View>
                </View>
                <View className='li'>
                    <View className='name'>商品供应商</View>
                    <View className='i'>个人</View>
                </View>
            </View>
        );
    }
}
 
export default Settle;