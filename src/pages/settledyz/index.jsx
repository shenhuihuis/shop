import Taro, { Component } from '@tarojs/taro'
import { View ,Text} from '@tarojs/components'
import './index.less'
class Settleyz extends Component {
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
            <View className='settleyz'>
                <View className='form'>
                    <View className='inpt'>
                        <Input placeholder='请输入手机号码'></Input>
                        <View className='send'>快速获取</View>
                    </View>
                    <View className='sub'>验证</View>
                </View>
            </View>
        );
    }
}
 
export default Settleyz;   