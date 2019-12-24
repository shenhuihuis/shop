import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import './index.less'
import $http from "@public/server"
import {getGlobalData,setGlobalData} from "@public/global_data"
class Order_cart extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            info:[],
            address:null,
         }
    }
    config = {
        navigationBarTitleText: '确认订单'
    }
    componentWillMount(){
        let info=getGlobalData("product");
        if(!info.address){
            $http.get("account/address/default").then(e=>{
                this.setState({
                    address:e
                })
            })
        }else{
            this.setState({
                address:info.address
            })
        }
        console.log(info)
        this.setState({
            info: info,
        })
    }
    bindValue=(index,e)=>{
        this.setState(preState=>{
             preState.info.list[index].note=e.detail.value
        })
    }
    went=(e)=>{
        Taro.navigateTo({url:'/pages/add_list/index?goLink='+"/pages/order_cart/index"})
    }
    sub=(e)=>{
        let form=this.state.info,address=this.state.address;
        if(!address){
            Taro.showToast({
                title:"请选择地址",
                icon:'none',
                duration: 1000
            })
            return false;
        }
        let data=[]
        form.list.map((ele,index)=>{
            data[index]={
                supplier_id:ele.supplier_id,
                cart_ids:ele.data.map(e=>{
                    return e.id
                }),
                note:ele.note
            }
        })
        $http.post("order",{
            address_id:address.id,
            data:data
        }).then(e=>{
            Taro.showToast({
                title: "已下单成功",
                icon: 'success',
                duration: 1000
            })
            setGlobalData("product",null)
            Taro.redirectTo({url:'/pages/orderlist/index'})
        })
    }
    render() { 
        let info=this.state.info,address=this.state.address;
        return (
            <View className='order'>
                <View className='address' onTap={this.went.bind(this)}>
                  { address?<View className='goint'>
                        <View className='tp'>{address.address_full}</View>
                        <View className='bot'>
                            <Text>{address.contact}</Text>
                            <Text>{address.tel}</Text>
                        </View>
                     </View>
                     :<View className='goint'>添加收货地址</View>
                 }
                </View>
                 {
                     info.list.map((e,index)=>{
                        return (
                            <View className='list' key={e.supplier_id}>
                                <View className='ico'>{e.supplier_title}</View>
                                {
                                    e.data.map(ele=>{
                                       return (
                                        <View className='cter' key={ele.id}>
                                            <Image src={ele.img} mode='aspectFill'></Image>
                                            <View className='rt'>
                                                <View className='tit'>{ele.title}</View>
                                                <View className='icbox'>
                                                    <View className='i'>{ele.spec_title}</View>
                                                </View>
                                                <View className='money'>
                                                    ¥{ele.price}
                                                    <Text>X{ele.num}</Text>
                                                </View>
                                            </View>
                                        </View>
                                       )
                                    })
                                }
                                <View className='bz'>
                                    <View className='label'>备注</View>
                                    <Input placeholder='填写备注信息（选填）' type='text' onChange={this.bindValue.bind(this,index)} value={e.note}></Input>
                                </View>
                            </View>
                        )
                     })
                 }
                 <View className='p'>*若订单内有不包邮的商品，则该订单需平台进行运费设置方可进行支付</View>
                <View className='sbtn'>
                    <View className='lf'>
                        合计： <text>¥{info.money}</text>
                       {/* <View className='b'>(不含运费)</View> */}
                    </View>
                    <View className='sub' onTap={this.sub.bind(this)}>提交订单</View>
                </View>
            </View>
        );
    }
}
 
export default Order_cart;