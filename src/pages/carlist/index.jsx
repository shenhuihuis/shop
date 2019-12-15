import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtInputNumber } from 'taro-ui'
import Navs from "./../../components/nav"
import $http from "@public/server"
import './index.less'
import {setGlobalData} from "@public/global_data"
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            touchS: [0, 0],
            touchE: [0, 0],
            all: false,
            load:false,
            list:[],
            money:'',
            isIphoneX: false
        }
    }
    config = {
        navigationBarTitleText: '购物车'
    }

    componentDidMount(){
        let _this=this;
        wx.getSystemInfo({
            success:function (res) {
                if (res.model.indexOf('iPhone X')>=0) {
                    _this.setState({
                        isIphoneX:true
                    })
                }
            }
        })
        Taro.hideHomeButton()
        this.init();
       
    }
    init=()=>{
        $http.get("cart").then(e=>{
            e.map(ele=>{
                ele.checked=false;
                ele.data.map(element=>{
                    element.checked=false;
                    element.move=false;
                    element.min=element.num
                })
            })
            
            this.setState({
                load:true,
                list:e
            })
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
    getmoney=()=>{
        let list=this.state.list;
        let num=0;
        list.map(ele=>{
            ele.data.map(element=>{
               if(element.checked)[
                    num +=element.price*element.num
               ]
            })
        })
        
        this.setState({
            money:num
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
    touchStart = (e) => {
        let sx = e.touches[0].pageX
        let sy = e.touches[0].pageY
        this.setState({
            touchS: [sx, sy]
        })
    }
    touchMove = (e) => {
        let sx = e.touches[0].pageX;
        let sy = e.touches[0].pageY;
        this.setState({
            touchE: [sx, sy]
        })
    }
    touchEnd = (ind,index) => {
        let start = this.state.touchS;
        let end = this.state.touchE;
        let dd=this.state.list[ind].data[index];
        if (start[0] < end[0] - 50) {
            dd.move=false;
            this.setState({
                [dd]:dd
            })
        } else if (start[0] > end[0] + 50) {
            dd.move=true;
            this.setState({
                [dd]:dd
            })
        } else {
            
        }
    }
    handleChange=(ind,index,e)=>{
       
        this.setState(preState=>{
            preState.list[ind].data[index].num=e*1
        })
       setTimeout(e=>{
        this.getmoney();
       },300)
    }
    del=(ind,index)=>{
        let list=this.state.list;
        $http.post("cart/del",{
            ids:[list[ind].data[index].id]
        }).then(e=>{
            list[ind].data.splice(index,1);
            this.setState({
                list:list
            })
            Taro.showToast({
                title:"删除成功",
                icon:'success'
            })
        })
    }
    sub=(e)=>{
        let list=this.state.list;
        let info=[],money=0;
        list.map((ele,index)=>{
            ele.data.map(value=>{
                if(value.checked){
                   info[index]={
                        supplier_id:ele.supplier_id,
                        supplier_title:ele.supplier_title,
                        note:'',
                        data:ele.data.filter(val=>{
                            return val.checked
                        })
                   }
                   money +=value.num*1*value.price
                }
            })
        })
        let n=[]
        info.map(d=>{       //去除空的empty
          n.push(d)
        })
        if(n.length==0) return false;
        setGlobalData("product",{
            list:n,
            money:money
        })
        Taro.navigateTo({url:'/pages/order_cart/index'})
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
                                                    e.data.length>0 && <View className='tp' onTap={this.ckbind.bind(this, ind, -1)}>
                                                        <View className={`radio ${e.checked ? "cked" : ""}`}></View>
                                                        <View className='tit'>{e.supplier_title}</View>
                                                    </View>
                                                   }
                                                    <View className='cter'>
                                                        {
                                                            e.data.map((element, index) => {
                                                                {element}
                                                                return (
                                                                     <View className={`dd ${element.move?"focus":""}}`} key={element.id} onTouchstart={this.touchStart.bind(this)} onTouchmove={this.touchMove.bind(this)} onTouchend={this.touchEnd.bind(this, ind, index)}>
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
                                                                                        <AtInputNumber min={element.min} step={1} value={element.num}  max={element.stock}  onChange={this.handleChange.bind(this,ind,index)}/>
                                                                                    </View>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                        <View className='del' onTap={this.del.bind(this,ind,index)}>删除</View>
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                                <View className={`sbtn ${this.state.isIphoneX?'bmx':''}`} >
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