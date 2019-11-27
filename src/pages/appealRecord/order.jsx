import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import "./index.less"
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <View className='record'>
                <View className='li'>
                    <View className='tp'>
                        <View className='name'>订单号：875768339913</View>
                        <View className='status'>待处理</View>
                    </View>
                    <View className='cter'>
                        <Image></Image>
                        <View className='rt'>
                            <View className='tit'>越南进口高乐蜜芒果5斤装 单果200克起 香甜爽口细腻多汁</View>
                            <View className='ico'>规格3；规格A</View>
                            <View className='num'>
                                ¥49.9 <Text>X10</Text>
                            </View>
                        </View>
                    </View>
                    <View className='bot'>
                        <View className='btn'>
                            <View className='a'>撤销申请</View>
                        </View>
                    </View>
                </View>
                <View className='li'>
                    <View className='tp'>
                        <View className='name'>订单号：875768339913</View>
                        <View className='status'>待处理</View>
                    </View>
                    <View className='cter'>
                        <Image></Image>
                        <View className='rt'>
                            <View className='tit'>越南进口高乐蜜芒果5斤装 单果200克起 香甜爽口细腻多汁</View>
                            <View className='ico'>规格3；规格A</View>
                            <View className='num'>
                                ¥49.9 <Text>X10</Text>
                            </View>
                        </View>
                    </View>
                    <View className='bot'>
                        <View className='btn'>
                            <View className='a'>撤销申请</View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default Order;