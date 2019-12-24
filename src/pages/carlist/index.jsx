import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtInputNumber, AtSwipeAction } from 'taro-ui'
import Navs from "./../../components/nav"
import $http from "@public/server"
import './index.less'
import { setGlobalData } from "@public/global_data"
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            all: false,
            load: false,
            list: [],
            money: '',
            isIphoneX: false
        }
    }
    config = {
        navigationBarTitleText: '购物车'
    }

    componentDidMount() {
        let _this = this;
        wx.getSystemInfo({
            success: function (res) {
                if (res.model.indexOf('iPhone X') >= 0) {
                    _this.setState({
                        isIphoneX: true
                    })
                }
            }
        })
        Taro.hideHomeButton()
        this.init();
        
    }
    init = () => {
        $http.get("cart").then(e => {
            e.map(ele => {
                ele.checked = false;
                ele.data.map(element => {
                    element.checked = false;
                    element.move = false;
                })
            })

            this.setState({
                load: true,
                list: e
            })
           setTimeout(e=>{
                this.ckAll()
           },200)
        })
    }
    ckAll = () => {         //全选
        let list = this.state.list, all = this.state.all;
        all = !all;
        list.map(e => {
            e.checked = all;
            e.data.map(ele => {
                ele.checked = all
            })
        })
        this.setState({
            all: all,
            list: list
        })
        this.getmoney();
    }
    getmoney = () => {
        let list = this.state.list;
        let num = 0;
        list.map(ele => {
            ele.data.map(element => {
                if (element.checked) [
                    num += element.price * element.num
                ]
            })
        })

        this.setState({
            money: num
        })
    }
    ckbind = (ind, index) => {
        let list = this.state.list, all = this.state.all;
        if (index < 0) {            //上面
            list[ind].checked = !list[ind].checked;
            list[ind].data.map(e => {
                e.checked = list[ind].checked ? true : false
            })

        } else {
            list[ind].data[index].checked = !list[ind].data[index].checked
            let len = list[ind].data.filter(e => {
                return e.checked
            }).length
            list[ind].checked = len == list[ind].data.length ? true : false;
        }
        let len = list.filter(e => {
            return e.checked
        }).length
        all = len == list.length ? true : false
        this.setState({
            list: list,
            all: all
        })
        this.getmoney();
    }
    handleChange = (ind, index, element,e) => {
        if(!element.checked) return false;
        this.setState(preState => {
            preState.list[ind].data[index].num = e * 1
        })
        $http.post("cart",{
            product_id:element.product_id,
            spec_id:element.spec_id,
            num:e * 1
        }).then(e=>{
           
            setTimeout(e => {
                this.getmoney();
            }, 300)
        })
    }
    del = (ind, index) => {
        let list = this.state.list;
        $http.post("cart/del", {
            ids: [list[ind].data[index].id]
        }).then(e => {
            Taro.showToast({
                title: "删除成功",
                icon: 'success'
            })
            this.setState({
                all: false,
                load: false,
                list: [],
                money: '',
            })
            this.init()
        })
    }
    sub = (e) => {
        let list = this.state.list;
        let info = [], money = 0;
        list.map((ele, index) => {
            ele.data.map(value => {
                if (value.checked) {
                    info[index] = {
                        supplier_id: ele.supplier_id,
                        supplier_title: ele.supplier_title,
                        note: '',
                        data: ele.data.filter(val => {
                            return val.checked
                        })
                    }
                    money += value.num * 1 * value.price
                }
            })
        })
        let n = []
        info.map(d => {       //去除空的empty
            n.push(d)
        })
        if (n.length == 0) return false;
        setGlobalData("product", {
            list: n,
            money: money
        })
        Taro.navigateTo({ url: '/pages/order_cart/index' })
    }
    render() {
        const list = this.state.list;
        return (
            <View className='carlist'>
                {
                    this.state.load && (
                        list.length > 0 ?
                            <View className='main'>
                                <View className='list'>
                                    {
                                        list.map((e, ind) => {
                                            return (
                                                <View className='li' key={e.id}>
                                                    {
                                                        e.data.length > 0 && <View className='tp' onTap={this.ckbind.bind(this, ind, -1)}>
                                                            <View className={`radio ${e.checked ? "cked" : ""}`}></View>
                                                            <View className='tit'>{e.supplier_title}</View>
                                                        </View>
                                                    }
                                                    <View className='cter'>
                                                        {
                                                            e.data.map((element, index) => {
                                                                { element }
                                                                return (
                                                                    <AtSwipeAction onClick={this.del.bind(this, ind, index)} options={[{ text: '删除', style: { backgroundColor: '#de544c', width:"124rpx;",padding:0,justifyContent:"center",marginLeft:"10rpx"} }]}>
                                                                        <View className="dd" key={element.id}>
                                                                            <View className='conlf'>
                                                                                <View className='lf' onTap={this.ckbind.bind(this, ind, index)}>
                                                                                    <View className={`radio ${element.checked ? "cked" : ""}`}></View>
                                                                                    <Image src={element.img} mode='aspectFill'></Image>
                                                                                </View>
                                                                                <View className='cbname'>
                                                                                    <View className='tit'>{element.title}</View>
                                                                                    <View className='ibox'>
                                                                                        <View className='i'>{element.spec_title}</View>
                                                                                    </View>
                                                                                    <View className='bot'>
                                                                                        <View className='money'>¥{element.price}</View>
                                                                                        <View className='num'>
                                                                                            <AtInputNumber min={element.num_start} step={1} value={element.num} max={element.stock} onChange={this.handleChange.bind(this, ind, index,element)} />
                                                                                        </View>
                                                                                    </View>
                                                                                </View>
                                                                            </View>

                                                                        </View>
                                                                    </AtSwipeAction>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                                <View className={`sbtn ${this.state.isIphoneX ? 'bmx' : ''}`} >
                                    <View className='lf' onTap={this.ckAll.bind(this)}>
                                        <View className={`radio ${this.state.all ? "cked" : ""}`}></View>
                                        <Text>全选</Text>
                                    </View>
                                    <View className='rt'>
                                        <View className='txt'>合计： <Text>¥{this.state.money || 0}</Text></View>
                                        <View className='sub' onTap={this.sub.bind(this)}>提交订单</View>
                                    </View>
                                </View>
                            </View>
                            : <View className='nobg'>
                                您还没有加购商品哦，去逛逛～
                        </View>
                    )
                }
                <Navs index='2'></Navs>
            </View>
        );
    }
}

export default Order;