import Taro, { Component } from '@tarojs/taro'
import { View, Text ,ScrollView} from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './index.less'
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: [{ title: '全部' }, { title: '待处理' }, { title: '待付款' },{ title: '待发货' }, { title: '待收货' }, { title: '已完成' }],
            current: 0
        }
    }
    config = {
        navigationBarTitleText: '商品订单'
    }
    onScroll=()=>{

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
            success:function (res) {
                let height = (res.windowHeight * (750 / res.windowWidth)); //将高度乘以换算后的该设备的rpx与px的比例
                hei={height:height-98 +'rpx'}
            }
        })
        return (
            <View className='orderlist'>
                <AtTabs current={this.state.current}  scroll  tabList={tabList} onClick={this.handleClick.bind(this)}>
                   { tabList.map((e,index)=>{
                        return (
                            <AtTabsPane current={this.state.current} index={index}>
                                {/*<View className='nobg'>这里什么也没有，去逛逛～</View>*/}
                                <ScrollView className='list' scrollY scrollWithAnimation style={hei} lowerThreshold={30}  onScroll={this.onScroll}>
                                    <View className='li'>
                                        <View className='tp'>
                                            <View className='name'>供应商名称</View>
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
                                            <View className='lf'>付款信息待审核</View>
                                            <View className='btn'>
                                                <View className='a'>取消订单</View>
                                                <View className='a'>支付</View>
                                            </View>
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