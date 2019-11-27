import Taro, { Component } from '@tarojs/taro'
import { View ,Text} from '@tarojs/components'
import './index.less'

import  ico1 from "./../../assets/img/oico1.png"; //待处理
import  ico2 from "./../../assets/img/oico2.png"; //待支付
import  ico3 from "./../../assets/img/oico3.png"; //待发货
import  ico4 from "./../../assets/img/oico4.png"; //部分待发货
import  ico5 from "./../../assets/img/oico5.png"; //待收货
import  ico6 from "./../../assets/img/oico6.png"; //已完成
import  ico7 from "./../../assets/img/oico7.png"; //已取消
class List extends Component {
    config = {
        navigationBarTitleText: '订单详情',
        navigationBarBackgroundColor: '#319F5F',
        navigationBarTextStyle:'white'
    }
    constructor(props) {
        super(props);
        this.state = {  
          
        }
    }
    onScroll=()=>{

    }
    render() { 
        return (
            <View className='order_details'>
                <View className='tp'>
                    <View className='type'>订单待处理</View>
                    <Image src={ico1}></Image>
                </View>
                <View className='main'>
                    <View className='conbox postadd'>
                        <View className='type'>运输方式</View>
                        <View className='cter'>
                            <View className='lf'>
                            </View>
                            <View className='rt'>
                                <View className='address'>
                                    <View className='ico1'></View>
                                    <View className='out'>
                                        <View className='addinfo'>杭州市西湖区三墩镇亲亲家园7幢2234</View>
                                        <View className='t'>
                                            <Text>西索</Text>
                                            <Text>13566678889</Text>
                                        </View>
                                    </View>
                                </View>
                                <View className='address'>
                                    <View className='ico3'></View>
                                    <View className='out'>
                                        <View className='addinfo'>杭州市西湖区三墩镇亲亲家园7幢2234</View>
                                        <View className='t'>
                                            <Text>西索</Text>
                                            <Text>13566678889</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='conbox cterbox'>
                        <View className='li'>
                            <View className='label'>联系人</View>
                            <Text>王小明</Text>
                        </View>
                        <View className='li'>
                            <View className='label'>联系方式</View>
                            <Text>18299987776</Text>
                        </View>
                        <View className='li'>
                            <View className='label'>发货时间</View>
                            <Text>2019.11.07</Text>
                        </View>
                        <View className='li'>
                            <View className='label'>到货时间</View>
                            <Text>2019.11.08</Text>
                        </View>
                        <View className='li'>
                            <View className='label'>物品重量</View>
                            <Text>30kg</Text>
                        </View>
                        <View className='li'>
                            <View className='label'>物品体积</View>
                            <Text>XXX</Text>
                        </View>
                        <View className='li'>
                            <View className='label'>温区选择</View>
                            <Text>常温</Text>
                        </View>
                    </View>
                    <View className='conbox sayabout'>
                        <View className='htit'>物品描述</View>
                        <View className='say'>这里是物品的详细描述，这里是物品的详细描述，这里是物品的详细描述，这里是物品的详细描述，</View>
                        <View className='htit'>物品图片</View>
                        <View className='imglist'>
                            <Image></Image>
                        </View>
                        <View className='li'>
                            <View className='label'>备注</View>
                            <Text>请小心运输谢谢。</Text>
                        </View>
                    </View>
                    <View className='conbox info'>
                        <View className='tit'>订单信息</View>
                        <View className='p'>
                            <View className='label'>订单编号:</View>
                            20191017339477500
                        </View>
                        <View className='p'>
                            <View className='label'>下单时间:</View>
                            2019.10.16 20:16
                        </View>
                    </View>
                </View>
                <View className='sbtn'>
                    <View className='smbtn'>取消订单</View>
                </View>
            </View>
        );
    }
}
 
export default List;