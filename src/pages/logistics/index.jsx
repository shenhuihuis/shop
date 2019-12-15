import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'
import $http from "@public/server"
class Logistics extends Component {
    config = {
        navigationBarTitleText: '找物流',
        navigationBarBackgroundColor: '#319F5F',
        navigationBarTextStyle: 'white',
        enablePullDownRefresh: true,
        onReachBottomDistance: 50
    }
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            list: [],
            count: 0,
            scrollTop:0,
            loading: false
        }
    }
    componentDidMount() {
        this.getList()
    }
    getList = () => {
        let list = this.state.list;
        $http.get("supplier", {
            type: 1,
            page: this.state.page,
            limit: 10
        }).then(e => {
            this.setState({
                list: list.concat(e.list),
                count: e.count,
                loading: true
            })
        })
    }
    onScroll() {
        if (this.state.list.length >= this.state.count) return false;
        else {
            let page = this.state.page;
            page = page + 1
            this.setState((preState) => {
                preState.page = page;
            })
            setTimeout(e => {
                this.getList()
            }, 500)
        }
    }
    onPullDownRefresh() {
        this.setState((preState) => {
            preState.page = 1;
            preState.list = []
            preState.scrollTop=0;
            preState.loading = false;
        })
        setTimeout(e => {
            this.getList()
            Taro.stopPullDownRefresh()
        }, 500)
    }
    went = (url) => {
        Taro.navigateTo({ url: url })
    }
    render() {
        let hei;
        wx.getSystemInfo({
            success:function (res) {
                let height = (res.windowHeight * (750 / res.windowWidth)); //将高度乘以换算后的该设备的rpx与px的比例
                hei={height:height-562 +'rpx'}
            }
        })
        return (
            <View className='logistics'>
                <View className='tp'>
                    <View className='tit'>
                        找物流
                       <Text>不用出门直接送到家</Text>
                    </View>
                    <View className='cbox'>
                        <View className='btn' onTap={this.went.bind(this, "/pages/demand/index")}>填写物流需求</View>
                    </View>
                </View>
                <View className='htit'>优质供应商</View>
                {
                    this.state.loading && (this.state.count == 0 ? <View className='nobg'>暂无供应商</View> :
                       <View className='list'>
                        <ScrollView  scrollY scrollWithAnimation style={hei} lowerThreshold={30} onScrolltolower={this.onScroll} scrollTop={this.state.scrollTop}>
                            {this.state.list.map(e => {
                                return (
                                    <View className='li' key={e.id}>
                                        <View className='lf'>
                                            <Image mode='aspectFill' src={e.img}></Image>
                                            <View className='name'>{e.uname}</View>
                                        </View>
                                        <View className='see' onTap={this.went.bind(this, "/pages/demand_details/index?supplier_id=" + e.id)}>查看详情</View>
                                    </View>
                                )
                            })}
                        </ScrollView></View>)
                }
            </View>
        );
    }
}

export default Logistics;