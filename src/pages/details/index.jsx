import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import './index.less'
import $http from "@public/server"
import { formatTime } from "@public/utils"
import WxParse from './../../components/wxParse/wxParse'
import BUY from '../../components/buy'
import { getGlobalData } from '@public/global_data'
class Demand_Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 0, //1加入购物车  2立即购买
            isOpened: false,
            details: {},
        }
    }
    config = {
        navigationBarTitleText: '商品详情'
    }
    componentWillMount() {
       // let arr = [{ id: 14, img: [], key1: "红色", key2: "64g", price: 22, stock: 22 }, { id: 14, img: [], key1: "红色", key2: "128g", price: 22, stock: 22 }, { id: 14, img: [], key1: "绿色", key2: "64g", price: 22, stock: 22 }, { id: 14, img: [], key1: "绿色", key2: "128g", price: 22, stock: 22 }]
        $http.get("product/info", { id: this.$router.params.id || 1}).then(e => {
         //   e.specs = arr
            this.setState({
                details: e,
            })
            WxParse.wxParse('article', 'html', e.content, this.$scope, 5)
        })
    }
    put = (e, type) => {      //弹出购买
        this.setState({
            isOpened: e,
            type: type
        })
    }
    want =(supplier_id)=>{
        Taro.navigateTo({'url':'/pages/dd_index/index?supplier_id='+supplier_id})
    }
    see =(id) =>{
        Taro.navigateTo({'url':'/pages/evaluate/index?id='+id})
    }
    collected = (id) => {
        let is_favorite = this.state.details.is_favorite,
            url = is_favorite ? "account/favorite/product/del" : "account/favorite/product";
        $http.post(url, { product_id: id ,spec_id:this.state.details.specs[0].id}).then(e => {
            this.setState((preState) => {
                preState.details.is_favorite = !is_favorite;
            })
            Taro.showToast({
                title: is_favorite ? "已取消收藏" : "加入收藏",
                icon: 'none'
            })
        })
    }
    call = () => {  //联系客服
        wx.makePhoneCall({
            phoneNumber: getGlobalData("tel"),
            success: function () {
                console.log("拨打电话成功！")
            },
            fail: function () {
                console.log("拨打电话失败！")
            }
        })
    }
    render() {
        let details = this.state.details, isOpened = this.state.isOpened;
    
        return (
            <View className='details'>
                <View className='banner'>
                    <Swiper indicatorColor='#999' indicatorActiveColor='#333' circular autoplay >
                        {
                            details.imgs.map(e => {
                                return (
                                    <SwiperItem key={e}>
                                        <Image mode="widthFix" src={e}></Image>
                                    </SwiperItem>
                                )
                            })
                        }
                    </Swiper>
                </View>
                <View className='combox'>
                    <View className='tit' >{details.title}</View>
                    <View className='price'>
                        <View className='money'>¥ <Text>{details.price}</Text></View>
                        <View className='xl'>销量：{details.sell_count}</View>
                    </View>
                    <View className='cter'>
                        <View className='htit'>商品评价({details.comment_count})</View>
                        <View className='rt' onTap={this.see.bind(this,details.id)}>查看全部评价</View>
                    </View>
                    {
                        details.comment.map(e => {
                            return (
                                <View className='answer' key={e.created_at}>
                                    <View className='top'>
                                        <View className='lf'>
                                            <Image mode='aspectFill' src={e.account.img}></Image>
                                            <View className='bname'>
                                                <View className='name'>{e.account.name}</View>
                                                <View className='time'>{e.created_at}</View>
                                            </View>
                                        </View>
                                        <View className='sex'>
                                            {
                                                [1,2,3,4,5].map(element=>{
                                                    return (
                                                        <View key={element} className={`i ${element<=e.star?"curi":""}`}></View>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                    <View className='say'>{e.content}</View>
                                </View>
                            )
                        })
                    }
                    <View class='gys'  onTap={this.want.bind(this,details.supplier.id)}>
                        <Image mode='aspectFill' src={details.supplier.img}></Image>
                        <View className='gystit'>{details.supplier.uname}</View>
                    </View>
                    <View className='h2'>宝贝详情</View>
                    <View className='brown'>
                        <View className='dd'>原产地：{details.origin}</View>
                        <View className='dd'>储存条件：{details.stockpile}度</View>
                        <View className='dd'>生产日期：{formatTime(details.produce_at)}</View>
                        <View className='dd'>保质期：{details.best_before}</View>
                    </View>
                    {<View className='de_say'> <import src='../../components/wxParse/wxParse.wxml' /><template is='wxParse' data='{{wxParseData:article.nodes}}' /></View>}
                </View>
                <View className='sbtn'>
                    <View className='btn'>
                        <View className='a' onTap={this.want.bind(this,details.supplier.id)}>供应商</View>
                        <View className='a' onTap={this.call.bind(this)}>客服</View>
                        <View onTap={this.collected.bind(this, details.id)}  className={`a ${this.state.details.is_favorite ? "liked":""}`}>{details.is_favorite?"已收藏":"收藏"}</View>
                    </View>
                    <View className='subbtn'>
                        <View className='a' onTap={this.put.bind(this, true, 1)}>加入购物车</View>
                        <View className='a' onTap={this.put.bind(this, true,2)}>立即购买</View>
                    </View>
                </View>
                {isOpened && <BUY handClose={this.put.bind(this)} info={{ specs: details.specs, price: details.price, type: this.state.type, id: details.id, num: details.num_start,uname:details.supplier.uname,title:details.title}} />}
            </View>
        );
    }
}

export default Demand_Details;