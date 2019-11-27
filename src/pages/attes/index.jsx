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
        navigationBarTitleText: '认证信息'
    }
    render() { 
        return (
            <View className='attes'>
                <View className='tp'>
                    <View className='ico ingico'>认证资料失败</View>
                    <View className='say'>这里是认证失败原因</View>
                </View>
                <View className='list'>
                    <View className='li'>
                        <View className='tit'>姓名</View>
                        <View className='span'>西索</View>
                    </View>
                    <View className='li'>
                        <View className='tit'>身份证号</View>
                        <View className='span'>320689199702048666</View>
                    </View>
                    <View className='li'>
                        <View className='tit'>联系电话</View>
                        <View className='span'>13455567778</View>
                    </View>
                </View>
                <View className='list'>
                    <View className='smli'>
                        <View className='tit'>身份证正、反面</View>
                        <View className='imgbox'>
                            <Image></Image>
                            <Image></Image>
                        </View>
                    </View>
                    <View className='smli'>
                        <View className='tit'>营业执照</View>
                        <View className='imgbox'>
                            <Image></Image>
                            <Image></Image>
                        </View>
                    </View>
                    <View className='smli'>
                        <View className='tit'>相关许可证</View>
                        <View className='imgbox'>
                            <Image></Image>
                            <Image></Image>
                        </View>
                    </View>
                </View>
                <View className='bton'>
                    <View className='sub'>再次认证</View>
                </View>
            </View>
        );
    }
}
 
export default Order;