import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './index.less'
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: [{ title: '全部' }, { title: '待处理' }, { title: '待付款' }, { title: '待运输' }, { title: '运输中' }, { title: '已完成' }],
            current: 0
        }
    }
    config = {
        navigationBarTitleText: '物流订单'
    }
    onScroll = () => {

    }
    handleClick = (value) => {
        this.setState({
            current: value
        })
    }
    render() {
        const tabList = this.state.tabList
        let hei;
        wx.getSystemInfo({
            success: function (res) {
                let height = (res.windowHeight * (750 / res.windowWidth)); //将高度乘以换算后的该设备的rpx与px的比例
                hei = { height: height - 98 + 'rpx' }
            }
        })
        return (
            <View className='orderlist'>
                <AtTabs current={this.state.current} scroll tabList={tabList} onClick={this.handleClick.bind(this)}>
                    {tabList.map((e, index) => {
                        return (
                            <AtTabsPane current={this.state.current} index={index}>
                                {/*<View className='nobg'>这里什么也没有，去逛逛～</View>*/}
                                <ScrollView className='list' scrollY scrollWithAnimation style={hei} lowerThreshold={30} onScroll={this.onScroll}>
                                    <View className='li'>
                                        <View className='tp'>
                                            <View className='name'>订单号：20192839138743912</View>
                                            <View className='status'>待处理</View>
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
                                            <View className='a'>取消订单</View>
                                            <View className='a'>支付</View>
                                        </View>
                                    </View>
                                </ScrollView>
                            </AtTabsPane>
                        )
                    })}
                </AtTabs>
            </View>
        );
    }
}

export default Order;