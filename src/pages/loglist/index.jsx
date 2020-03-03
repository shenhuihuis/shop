import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './index.less'
import $http from "@public/server"
import { trackStatus } from "@public/utils"
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: [{ title: '全部',status:"1,2,3,4,5,6,7,8" }, { title: '待处理',status:1 }, { title: '待付款' ,status:"2,3"},{ title: '待运输' ,status:"4,5"}, { title: '运输中',status:6 }, { title: '已完成' ,status:7},{ title: '已取消' ,status:8}],
            current: 0,
            form: {
                page: 1,
                limit: 10,
                status:"1,2,3,4,5,6,7,8"
            },
            load: false,
            list: [],
            scrollTop: 0,
            count: null
        }
    }
    config = {
        navigationBarTitleText: '物流订单',
        enablePullDownRefresh: true,
        onReachBottomDistance: 50
    }
    onPullDownRefresh() {
       this.rest()
    }
    rest=()=>{
        this.setState((preState) => {
            preState.load = false;
            preState.scrollTop = 0;
            preState.count=null;
            preState.form.page = 1;
            preState.list = []
        })
        setTimeout(e => {
            this.getList()
            Taro.stopPullDownRefresh()
        }, 500)
    }
    onScroll = () => {
        if (this.state.list.length >= this.state.count) return false;
        else {
            Taro.showLoading({
                title:"正在加载中",
                mask:true
            })
            let page = this.state.form.page;
            page = page + 1
            this.setState((preState) => {
                preState.form.page = page;
            })
            setTimeout(e => {
                this.getList()
            }, 500)
        }
    }
    handleClick = (value) => {
        if(value==this.state.current) return false;
        this.setState(preState => {
            preState.current = value;
            preState.list = [];
            preState.form.page = 1;
            preState.load = false;
            preState.form.status = this.state.tabList[value].status;
            preState.scrollTop = 0;
        })
        setTimeout(e => {
            this.getList()
        }, 500)
    }
    componentWillMount = () => {
        this.getList();
    }
    del = (id,e) => {   //删除订单
        e.stopPropagation()
        $http.post("account/track/order/del", { id: id }).then(e => {
            Taro.showToast({
                title: "已删除订单",
                icon: "success"
            })
           // this.handleClick(this.state.current)
           this.rest()
        })
    }
    notify = (id,e) => {      //提醒发货
        e.stopPropagation()
        $http.post("account/track/order/notify", { id: id }).then(e => {
            Taro.showToast({
                title: "提醒发货成功",
                icon: "success"
            })
            
        })
    }
    orderok = (id,e) => {           //确认收货
        e.stopPropagation()
        $http.post("account/track/order/ok", { id: id }).then(e => {
            Taro.showToast({
                title: "收货成功",
                icon: "success"
            })
           // this.handleClick(this.state.current)
           this.rest()
        })
    }
    getList = () => {
        Taro.showLoading({
            title: "正在加载中",
            mask: true
        })
        $http.get("account/track/order", this.state.form).then(e => {
            this.setState({
                count: e.count,
                list:this.state.list.concat(e.list),
                load: true
            })
            Taro.hideLoading()
        })
    }
    went = (url, e) => {
        e.stopPropagation()
        Taro.navigateTo({
            url: url
        })
    }
    want =(id) =>{
        Taro.navigateTo({
            url: "/pages/logdetails/index?id="+id
        })
    }
    render() {
        const tabList = this.state.tabList;
        let list=this.state.list;
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
                            <AtTabsPane current={this.state.current} index={index} key={e.title}>
                                {this.state.load && (this.state.count > 0 && list.length > 0 ?
                                    <ScrollView className='list' scrollY scrollWithAnimation style={hei} lowerThreshold={30}  onScrolltolower={this.onScroll} scrollTop={this.state.scrollTop}>
                                        {
                                            list.map(element=>{
                                                return (
                                                    <View className='li' key={element.id} onTap={this.want.bind(this,element.id)}>
                                                        <View className='tp'>
                                                            <View className='name'>订单号：{element.no}</View>
                                                            <View className='status'>{trackStatus(element.status)}</View>
                                                        </View>
                                                        <View className='cter'>
                                                            <View className='lf'>
                                                            </View>
                                                            <View className='rt'>
                                                                <View className='address'>
                                                                    <View className='ico1'></View>
                                                                    <View className='out'>
                                                                        <View className='info'>{element.start_area + element.start_address}</View>
                                                                        <View className='t'>
                                                                            <Text>{element.start_user}</Text>
                                                                            <Text>{element.start_tel}</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                                <View className='address'>
                                                                    <View className='ico3'></View>
                                                                    <View className='out'>
                                                                        <View className='info'>{element.end_area+element.end_address}</View>
                                                                        <View className='t'>
                                                                            <Text>{element.end_user}</Text>
                                                                            <Text>{element.end_tel}</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        <View className='bot'>
                                                            <View className='lf'>{element.status==3 ? "付款信息待审核":''}{element.status==4 ? "待分配供应商":''}</View>
                                                            <View className='btn'>
                                                                {element.status<=2 && <View className='a' onTap={this.went.bind(this, "/pages/qxorder/index?logid=" + element.id)}>取消订单</View>}
                                                                {element.status==2 && <View className='a' onTap={this.went.bind(this, "/pages/logupload/index?logid=" + element.id)}>支付</View>}
                                                                {element.status==5 && <View className='a' onTap={this.notify.bind(this,element.id)}>提醒运输</View>}
                                                                {element.status==6 && <View className='a' onTap={this.orderok.bind(this,element.id)}>确认送达</View>}
                                                                {(element.status>=6 && element.status<8 )&& (element.is_appeal?<View className='a' onTap={this.went.bind(this, "/pages/appealDetails/index?logid=" + element.appeal_id)}>申诉详情</View>:
                                                                <View className='a' onTap={this.went.bind(this,"/pages/appeal/index?order_id="+element.id)}>申诉</View>)}
                                                                {element.status==8 && <View className='a' onTap={this.del.bind(this,element.id)}>删除订单</View>}
                                                            </View>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }
                                    </ScrollView> : <View className='nobg'>这里什么也没有，去逛逛～</View>)}
                            </AtTabsPane>
                        )
                    })}
                </AtTabs>
            </View>
        );
    }
}

export default Order;