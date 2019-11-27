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
                    <View className='conbox address'>
                        <View className='where'>杭州市西湖区三墩镇尚坤生态创意园</View>
                        <View className='what'>
                            <Text>西索</Text>
                            <Text>13455567778</Text>
                        </View>
                    </View>
                    <View className='conbox cterbox'>
                        <View className='name'>
                            <View className='n'>供应商名称</View>
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
                        <View className='li'>
                            <View className='label'>商品金额</View>
                            <Text>¥49.9</Text>
                        </View>
                        <View className='li'>
                            <View className='label'>运费</View>
                            <Text>待计算</Text>
                        </View>
                        <View className='li smli'>
                            <View className='label'>备注</View>
                            <Text>填写备注信息（选填）</Text>
                        </View>
                        <View className='last'>
                           <View className='tlaop'> 
                                <View className='how'>共1件</View>
                                <View className='money'>合计：<Text>¥49.9</Text></View>
                           </View>
                           <View className='has'>不含运费</View>
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