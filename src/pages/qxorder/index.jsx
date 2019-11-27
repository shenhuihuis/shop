import Taro, { Component } from '@tarojs/taro'
import { View ,Text ,Textarea} from '@tarojs/components'
import './index.less'
class Qx extends Component {
    config = {
        navigationBarTitleText: '取消订单'
    }
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <View className='qx'>
                <Textarea placeholder='请填写取消原因...'></Textarea>
                <View className='bton'>
                    <View className='sub'>确认取消</View> 
                </View>
            </View>
        );
    }
}
 
export default Qx;