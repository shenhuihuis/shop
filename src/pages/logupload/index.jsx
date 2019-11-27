import Taro, { Component } from '@tarojs/taro'
import { View ,Text} from '@tarojs/components'
import './index.less'
class AppealDetails extends Component {
    config = {
        navigationBarTitleText: '上传支付凭证',

    }
    constructor(props) {
        super(props);
        this.state = { 


        }
    }
    render() { 
        return ( 
            <View className='logupload'>
                <View className='main'>
                    <View className='upload'>
                        {/*<View className='img'>
                             <View className='close'></View>
                            <Image></Image>
                        </View>*/}
                        <View className='btn'>请上传支付凭证</View>
                    </View>
                    <View className='li'>
                        <View className='label'>收款账号</View>
                        <Text>6681020995603232</Text>
                    </View>
                    <View className='smli'>
                        <View className='label'>支付说明</View>
                        <Text>这里是一些支付说明</Text>
                    </View>
                </View>
                <View className='bton'>
                    <View className='sub'>确认上传</View>
                </View>
            </View>
        );
    }
}
 
export default AppealDetails;