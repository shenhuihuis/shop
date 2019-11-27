import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import './index.less'
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    config = {
        navigationBarTitleText: '确认订单'
    }
    render() { 
        return (
            <View className='order'>
                <View className='address'>
                  {/* <View className='goint'>
                        <View className='tp'>杭州市西湖区三墩镇尚坤生态创意园</View>
                        <View className='bot'>
                            <Text>西索</Text>
                            <Text>13455567778</Text>
                        </View>
                     </View>*/
                     <View className='goint'>添加收货地址</View>
                 }
                </View>
                <View className='list'>
                    <View className='ico'>供应商名称</View>
                    <View className='cter'>
                        <Image></Image>
                        <View className='rt'>
                            <View className='tit'>越南进口高乐蜜芒果5斤装 单果200克起 香甜爽口细腻多汁</View>
                            <View className='icbox'>
                                <View className='i'>规格3；规格A</View>
                             </View>
                             <View className='money'>
                                ¥49.9
                                <Text>X1</Text>
                             </View>
                        </View>
                    </View>
                    <View className='bz'>
                        <View className='label'>备注</View>
                        <Input placeholder='填写备注信息（选填）'></Input>
                    </View>
                    <View className='p'>*若订单内有不包邮的商品，则该订单需平台进行运费设置方可进行支付</View>
                </View>
                <View className='sbtn'>
                    <View className='lf'>
                        合计： <text>¥49.9</text>
                        <View className='b'>(不含运费)</View>
                    </View>
                    <View className='sub'>提交订单</View>
                </View>
            </View>
        );
    }
}
 
export default Order;