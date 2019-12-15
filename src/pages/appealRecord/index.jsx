import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import "./index.less"
import Order from "./order"
import Log from "./log"
import $http from '@public/server'
class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            load: false,
            list: [],
            scrollTop: 0,
            count: null,
            form: {
                page: 1,
                limit: 10
            }
        }
    }
    config = {
        navigationBarTitleText: '申诉记录',
        enablePullDownRefresh: true,
        onReachBottomDistance: 50
    }
    componentWillMount() {
        this.getList(0)
    }
    secked = (index) => {
        if (this.state.current == index && this.state.count) return false
        Taro.showLoading({
            title: "正在加载中",
            icon: 'none'
        })
        this.setState(prestate => {
            prestate.form.page = 1;
            prestate.scrollTop = 0;
            prestate.list = [];
            prestate.load = false;
            prestate.current = index;
        })
        setTimeout(e => {
            this.getList(index)
        }, 500)
    }
    onPullDownRefresh() {
        this.setState((preState) => {
            preState.scrollTop = 0;
            preState.form.page = 1;
            preState.list = []
            preState.loading = false;
        })
        setTimeout(e => {
            this.getList(this.state.current)
            Taro.stopPullDownRefresh()
        }, 500)
    }
    onScroll = () => {
        if (this.state.list.length >= this.state.count) return false;
        else {
            let page = this.state.form.page;
            page = page + 1
            this.setState((preState) => {
                preState.form.page = page;
            })
            setTimeout(e => {
                this.getList(this.state.current)
            }, 500)
        }
    }
    went=(id)=>{
        Taro.navigateTo({
            url:"/pages/appealDetails/index?id="+id +"&index=0"
        })
    }
    getList = (index) => {
        let url = ["account/order/appeal", "account/track/appeal"];
        $http.get(url[index], this.state.form).then(e => {
            this.setState({
                count: e.count,
                list: this.state.list.concat(e.list),
                load: true,
            })
            Taro.hideLoading()
        })
    }
    render() {
        return (
            <View className='recordList'>
                <View className='navs'>
                    {<View className={`a ${this.state.current == 0 ? "active" : ""}`} onTap={this.secked.bind(this, 0)}>商品申诉记录</View>}
                    {<View className={`a ${this.state.current == 1 ? "active" : ""}`} onTap={this.secked.bind(this, 1)}>物流申诉记录</View>}
                </View>
                {this.state.load && <ScrollView className='relist' scrollY scrollWithAnimation lowerThreshold={30} onScrolltolower={this.onScroll} scrollTop={this.state.scrollTop}>
                    {

                        (this.state.list.length == 0) ? <View className='nobg'></View> : (this.state.current == 0 ?
                            <View className='record'>
                                {
                                    this.state.list.map(ele => {
                                        return (
                                            <View className='li' key={ele.id} onTap={this.went.bind(this, ele.id)}>
                                                <View className='tp'>
                                                    <View className='name'>订单号：{ele.order_no}</View>
                                                    <View className='status'>{ele.status == 1 ? "待处理" : "已处理"}</View>
                                                </View>
                                                <View className='cter'>
                                                    <Image src={ele.img} mode='aspectFill'></Image>
                                                    <View className='rt'>
                                                        <View className='tit'>{ele.product_title}</View>
                                                        <View className='ico'>{ele.spec_title}</View>
                                                        <View className='num'>
                                                            ¥{ele.price} <Text>X{ele.num}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View className='bot'>
                                                    <View className='btn'>
                                                        <View className='a'>{ele.status == 1 ? "撤销申诉" : "申诉详情"}</View>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            : <Log list={this.state.list} />)
                    }
                </ScrollView>}
            </View>
        )
    }
}

export default Record;