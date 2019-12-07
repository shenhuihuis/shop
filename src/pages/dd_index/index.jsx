import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import "./index.less";
import $http from '@public/server'
class Add_list extends Component {
    config = {
        navigationBarTitleText: '供应商详情'
    }
    constructor(props) {
        super(props);
        this.state = {
            nav: [
                { tit: '默认', checked: true },
                { tit: '价格', checked: false, order: false },
                { tit: '销量', checked: false },
                { tit: '新品', checked: false }
            ],
            form: {
                page: 1,
                limit: 10,
                price: 1,            //价格 1降下 2生序
                sell: false,         //销量排行
                new: false,          //新品
                supplier_id: this.$router.params.supplier_id
            },
            count: 0,        //总数量
            list: [],
            company:{}
        }
    }
    componentWillMount() {
        this.getList()
        $http.get("supplier/info",{id:this.state.form.supplier_id}).then(e=>{
            this.setState({
                company:e
            })
        })
    }
    went = (e) =>{      //去商品详情
        Taro.navigateTo({url:"/pages/details/index?id="+e})
    }
    collected = (id) => {
        let is_favorite = this.state.company.is_favorite,
            url = is_favorite ? "account/favorite/supplier/del" : "account/favorite/supplier";
        $http.post(url, { supplier_id:id}).then(e => {
            this.setState((preState) => {
                preState.company.is_favorite = !is_favorite;
            })
            Taro.showToast({
                title: is_favorite ? "已取消收藏" : "加入收藏",
                icon: 'none'
            })
        })
    }
    want = (id) =>{
        Taro.navigateTo({url:'/pages/demand_details/index?supplier_id='+id})
    }
    getList = () => {
        $http.get("product", this.state.form).then(e => {
            this.setState({
                count: e.count,
                list: e.list
            })
        })
    }
    onScroll = () => {

    }
    ck = (index) => {
        let nav = this.state.nav, form = this.state.form;
        form.page = 1;
        if (nav[index].checked && index == 1) {
            nav[index].order = !nav[index].order
            form.price = nav[index].order ? 2 : 1;
        } else if (nav[index].checked) {
            return false;
        } else {
            nav.map(e => {
                e.checked = false
            })
            form.price = 1;
            nav[1].order = false;
            nav[index].checked = true;
            form.sell = nav[2].checked ? true : false;
            form.new = nav[3].checked ? true : false;
        }
        this.setState({
            nav: nav,
            form: form
        })
        this.getList();
    }
    render() {
        let hei;
        wx.getSystemInfo({
            success: function (res) {
                let height = (res.windowHeight * (750 / res.windowWidth)); //将高度乘以换算后的该设备的rpx与px的比例
                hei = { height: height - 258 + 'rpx' }
            }
        })
        let list = this.state.list
        return (
            <View className='dd_index'>
                <View className='tp'>
                    <View className='lf'>
                        <Image src={this.company.img}  mode='aspectFill'></Image>
                        <View className='cter'>
                            <View className='name'>{this.state.company.uname}</View>
                            <View className='i' onTap={this.want.bind(this,this.state.form.supplier_id)}>详细资料</View>
                        </View>
                    </View>
                    <View className={`btn ${this.state.company.is_favorite ? "btned" : ""}`} onTap={this.collected.bind(this, this.state.form.supplier_id)}>{this.state.company.is_favorite?"已收藏":"收藏"}</View>
                </View>
                <View className='navs'>
                    {
                        this.state.nav.map((e, index) => {
                            return <View key={index} className={`a ${e.checked ? "active" : ""}`} onClick={this.ck.bind(this, index)}>
                                {e.tit}
                                {
                                    index == 1 && <View className='tab'>
                                        <View className={`up ${e.order ? "uact" : ""}`}></View>
                                        <View className={`down ${!e.order ? "uact" : ""}`}></View>
                                    </View>
                                }
                            </View>
                        })
                    }
                </View>
                {   
                    this.state.count > 0 && list.length > 0 ? <ScrollView className='list' scrollY scrollWithAnimation style={hei} lowerThreshold={30} onScroll={this.onScroll} scrollTop={this.state.scrollTop}>
                        {
                            list.map(element => {
                                return (
                                    <View className='li' key={element.id}  onTap={this.went.bind(this,element.id)}>
                                        <Image mode='aspectFill' src={element.img}></Image>
                                        <View className='tit'>{element.title}</View>
                                        <View className='bot'>
                                            <View className='money'>
                                                <small>¥</small>{element.price || 0}
                                            </View>
                                            <View className='span'>销量：{element.sell_count || 0}</View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView> : <View className='nobg'>暂无商品</View>
                }
            </View>
        );
    }
}

export default Add_list;