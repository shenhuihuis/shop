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
            <View className='log'>
                <View className='li'>
                    <View className='tp'>
                        <View className='name'>订单号：20192839138743912</View>
                        <View className='status over'>待处理</View>
                    </View>
                    <View className='cter'>
                        <View className='lf'>
                        </View>
                        <View className='rt'>
                            <View className='address'>
                                <View className='ico1'></View>
                                <View className='out'>
                                    <View className='info'>杭州市西湖区三墩镇亲亲家园7幢2234</View>
                                    <View className='t'>
                                        <Text>西索</Text>
                                        <Text>13566678889</Text>
                                    </View>
                                </View>
                            </View>
                            <View className='address'>
                                <View className='ico3'></View>
                                <View className='out'>
                                    <View className='info'>杭州市西湖区三墩镇亲亲家园7幢2234</View>
                                    <View className='t'>
                                        <Text>西索</Text>
                                        <Text>13566678889</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='btn'>
                        <View className='a'>撤销申请</View>
                        <View className='a'>申诉详情</View>
                    </View>
                </View>
            </View>
        );
    }
}

export default Order;