import Taro, { Component } from '@tarojs/taro'
import { View ,Text} from '@tarojs/components'
import './index.less'
class AppealDetails extends Component {
    config = {
        navigationBarTitleText: '申诉详情',
        navigationBarBackgroundColor: '#319F5F',
        navigationBarTextStyle:'white'
    }
    constructor(props) {
        super(props);
        this.state = { 


        }
    }
    render() { 
        return ( 
            <View className='appealDetails'>
                <View className='tp'>
                    <View className='type'>待处理</View>
                    <View className='say'>申诉提交成功，请等待平台处理</View>
                </View>
                <View className='li'>
                    <View className='label'>订单编号</View>
                    <Text>201938376646388</Text>
                </View>
                <View className='li'>
                    <View className='label'>申请时间</View>
                    <Text>2019.10.23 10:20</Text>
                </View>
                <View className='smli'>
                    <View className='label'>详细描述</View>
                    <View className='txt'>发货商品有破损，发货商品有破损，发货商品发货商品有破损。</View>
                </View>
                <View className='imglist'>
                    <Image></Image>
                    <Image></Image>
                </View>
                <View className='bton'>
                    <View className='sub'>撤销申请</View>
                </View>
            </View>
        );
    }
}
 
export default AppealDetails;