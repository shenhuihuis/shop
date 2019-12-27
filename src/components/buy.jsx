import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInputNumber } from 'taro-ui'
import "../assets/css/buy.less"
import $http from "@public/server"
import {setGlobalData , getGlobalData } from "@public/global_data";
export default class buyput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type:null,
            num:1,
            value: 1,
            specs:[],        //整理后规格
            key: [],        // key1
            current:null,    //纬度一选中标题 对应 key1   
            active:null      //纬度二选中索引  对应key2
        }
    }
    componentWillMount(props) {
        let specs = this.props.info.specs, arr = {}
        specs.map(function (item) {
            if (arr[item.key1]) {
                arr[item.key1].push(item);
            } else {
                arr[item.key1] = [];
                arr[item.key1].push(item);
            }
        })
        let key = Object.keys(arr).map((keys) => {
            return keys
        })
        this.setState({
            specs:arr,
            key: key,
            num:this.props.info.num || 1,
            type:this.props.info.type,
            value:this.props.info.num,
           // current:key[0]
        })
        setTimeout(e=>{
            this.cueet(key[0])
            this.cueetChild(0)
        },200)
    }
    buy = (e) =>{            //加入购物车
        let active=this.state.active;
        let status=Taro.getStorageSync("status");
        if(status!=3){
            Taro.showToast({
                title: "您尚未认证成功",
                icon: 'none',
                duration: 1000
            })
            return false;
        }
        let key=this.state.specs[this.state.current][active]
        if(key.stock<this.state.num){
            Taro.showToast({
                title: "库存不足起订量",
                icon: 'none',
                duration: 1000
            })
            return false;
        }
        if(active==null) return false;
        else{
           if(this.state.type==1){
                let data={
                    product_id:this.props.info.id,
                    spec_id:key.id,
                    num:this.state.value*1
                }
                $http.post("cart",data).then(e=>{
                    Taro.showToast({
                        title: "已加入购物车",
                        icon: 'success',
                        duration: 1000
                    })
                    this.setState({
                        current:null,
                        active:null,
                        value:1
                    })
                    this.close(false)
                })
           }else{
            setGlobalData("product",{
                product_id:this.props.info.id,
                key:key,
                price:parseFloat(key.price),
                num:this.state.value*1,
                uname:this.props.info.uname,
                title:this.props.info.title
            })
            this.close(false)
            Taro.navigateTo({url:'/pages/order/index'})
           }
        }
    }
    handleChange = (e) =>{
        this.setState({
            value:e
        })
    }
    close = (e) => {
        this.props.handClose(false)
    }
    cueet = (e) =>{
        let num=this.state.num;
        this.setState({
            current:e,
            active:0,
            value:num
        })
    }
    cueetChild = (e) =>{
        let num=this.state.num;
        this.setState({
            active:e,
            value:num
        })
        
    }
    render() {
        let key2=this.state.active!=null && this.state.specs[this.state.current][this.state.active],
            num=this.state.num;
        return (
            <View className='fixedbox' catchtouchmove>
                <View className='putbox'>
                    <View className='tp'>
                        <View className='pic'>
                            <Image src={key2.img} mode='aspectFill'></Image>
                        </View>
                        {
                            this.state.active!=null ? <View className='money'>¥{parseFloat(key2.price)}</View>:
                            <View className='money'>¥{this.props.info.price}</View>
                        }
                        <View className='close' onClick={this.close.bind(this, false)}></View>
                    </View>
                    <View className='li'>
                        <View className='dl'>
                            {
                                this.state.key.map(ele=>{
                                    return (
                                        <View className='dd' key={ele.id} className={`dd ${this.state.current==ele?"act":""}`} onTap={this.cueet.bind(this,ele)}>{ele}</View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    {
                        this.state.current &&  <View className='li'>
                            <View className='dl'>
                                {
                                    this.state.specs[this.state.current].map((ele,index)=>{
                                        return (
                                            <View className='dd' key={ele.id} className={`dd ${this.state.active==index?"act":""}`} onTap={this.cueetChild.bind(this,index)}>{ele.key2}</View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    }
                    <View className='nums'>
                        <View className='span'>数量</View>
                        <View className='ck'>
                            <AtInputNumber  disabled={this.state.active==null} width={76} min={num} step={1} max={key2.stock} value={this.state.value} onChange={this.handleChange.bind(this)}/>
                        </View>
                    </View>
                    <View className='sub' onTap={this.buy.bind(this)}>确定</View>
                </View>
            </View>
        )
    }
}
