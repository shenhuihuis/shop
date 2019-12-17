import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import './index.less'
import ColList from "./col_list"
// import DList from "./delist"
import $http from "@public/server"
class Collect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav: [
                { tit: '商品', url: 'account/favorite/product' },
                { tit: '商品供应商', url: 'account/favorite/supplier' },
                { tit: '物流供应商', url: 'account/favorite/supplier' },
            ],
            form: {
                page: 1,
                limit: 4,
                type: null
            },
            current: 0,
            loading: false,
            count: null,
            list: [],
            scrollTop: 0
        }
    }
    config = {
        navigationBarTitleText: '我的收藏',
        enablePullDownRefresh: true,
        onReachBottomDistance: 50
    }
    componentDidMount() {
        this.getList(0)
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
            let current = this.state.current
            setTimeout(e => {
                this.getList(current)
            }, 500)
        }
    }
    onPullDownRefresh() {
        this.setState(preState => {
            preState.loading = false;
            preState.scrollTop = 0;
            preState.form.page = 1;
            preState.list = []
            preState.load = false;
        })
        setTimeout(e => {
            this.getList(this.state.current)
            Taro.stopPullDownRefresh()
        }, 500)
    }
    hatePro = (ele, index, e) => {
        e.stopPropagation()
        let list = this.state.list;
        $http.post("account/favorite/product/del", {
            product_id: ele.product_id,
            spec_id: ele.spec_id
        }).then(e => {
            list.splice(index, 1);
            this.setState({
                list: list
            })
        })
    }
    hate = (ele, index, e) => {
        e.stopPropagation()
        let list = this.state.list;
        $http.post("account/favorite/supplier/del", {
            supplier_id: ele.product_id,
        }).then(e => {
            list.splice(index, 1);
            this.setState({
                list: list
            })
        })
    }
    want = (id) => {
        Taro.navigateTo({ url: "/pages/details/index?id=" + id })
    }
    went = (id) => {
        Taro.navigateTo({ url: "/pages/demand_details/index?id=" + id })
    }
    getList = (type) => {         //0 收藏商品  //1商品供应商   //
        let url = this.state.nav[type].url;
        let form = this.state.form;
        form.type = type == 1 ? 2 : (type == 2 ? 1 : null)
        $http.get(url, form).then(e => {
            let list = this.state.list.concat(e.list)
            this.setState({
                count: e.count,
                list: list,
                loading: true
            })
            Taro.hideLoading()
        })
    }
    ck = (index) => {
        let nav = this.state.nav;
        if (index == this.state.current) {
            return false;
        }
        this.setState(preState => {
            preState.current = index,
                preState.list = [],
                preState.form.page = 1,
                preState.loading = false,
                preState.scrollTop = 0
        })
        setTimeout(e => {
            this.getList(index)
        }, 300)
    }
    render() {
        let hei,list=this.state.list;
        wx.getSystemInfo({
            success: function (res) {
                let height = (res.windowHeight * (750 / res.windowWidth)); //将高度乘以换算后的该设备的rpx与px的比例
                hei = { height: height - 84 + 'rpx' }
            }
        })
        return (
            <View classsName='contair'>
                <View className='navs'>
                    {
                        this.state.nav.map((e, index) => {
                            return <View key={index} className={`a ${this.state.current == index ? "active" : ""}`} onClick={this.ck.bind(this, index)}>
                                {e.tit}
                            </View>
                        })
                    }
                </View>

                {this.state.loading && (this.state.count > 0 && list.length > 0 ? <ScrollView className='list' scrollY scrollWithAnimation style={hei} lowerThreshold={30} onScrolltolower={this.onScroll} scrollTop={this.state.scrollTop}>
                    {
                        this.state.current == 0 ?  <View className='col_list'>
                            {
                                list.length==0?<View className='nobg'></View>:
                                list.map((ele,index)=>{
                                    return (
                                    <View className='li' key={ele.id} onTap={this.want.bind(this,ele.product_id)}>
                                        <Image src={ele.img}  mode='aspectFill'></Image>
                                        <View className='tit'>{ele.title}</View>
                                        <View className='bot'>
                                            <View className='lf'>
                                                <View className='money'> 
                                                    <small>¥</small>{ele.price || 0}
                                                </View>
                                                <View className='span'>销量：{ele.sell_count || 0}</View>
                                            </View>
                                            <View className='like' onTap={this.hatePro.bind(this,ele,index)}></View>
                                        </View>
                                    </View>
                                    )
                                })
                            }
                        </View>
                            : <View className='main'>
                                {<View className='delist'>
                                    {
                                        list.map((ele, index) => {
                                            return (
                                                <View className='li' onTap={this.went.bind(this, ele.id)}>
                                                    <View className='lf'>
                                                        <Image src={ele.img} mode='aspectFill'></Image>
                                                        <View className='tit'>{ele.uname}</View>
                                                    </View>
                                                    <View className='cancel' onTap={this.hate.bind(this, ele, index)}>取消收藏</View>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                                }
                            </View>

                    }
                </ScrollView> : <View className='nobg'></View>)}
            </View>
        );
    }
}

export default Collect;