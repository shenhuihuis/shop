import Taro, { Component } from '@tarojs/taro'
import { View ,Text} from '@tarojs/components'
import './index.less'
import $http from  "@public/server";
import  ico1 from "./../../assets/img/oico1.png"; //待处理
import  ico2 from "./../../assets/img/oico2.png"; //待支付
import  ico3 from "./../../assets/img/oico3.png"; //待发货
import  ico4 from "./../../assets/img/oico4.png"; //部分待发货
import  ico5 from "./../../assets/img/oico5.png"; //待收货
import  ico6 from "./../../assets/img/oico6.png"; //已完成
import  ico7 from "./../../assets/img/oico7.png"; //已取消
import { orderStatus } from "@public/utils"
class List extends Component {
    config = {
        navigationBarTitleText: '订单详情',
        navigationBarBackgroundColor: '#319F5F',
        navigationBarTextStyle:'white'
    }
    constructor(props) {
        super(props);
        this.state = {  
            details:{},
        }
    }
    componentWillMount(){
        $http.get("account/order/info",{id:this.$router.params.id}).then(e=>{
             this.setState({
                 details:e
             })
        })
    }
    went=(url)=>{
        Taro.navigateTo({
            url:url
        })
    }
    notify=(id)=>{
        $http.post("account/order/notify",{id:id}).then(e=>{
            Taro.showToast({
                title:"提醒发货成功",
                icon:"success"
            })
        })
    }
    orderok=(id)=>{           //确认收货
        $http.post("account/order/ok",{id:id}).then(e=>{
            Taro.showToast({
                title:"收货成功",
                icon:"success"
            })
        })
    }

    del=(id)=>{   //删除订单
        $http.post("account/order/del",{id:id}).then(e=>{
            Taro.showToast({
                title:"已删除订单",
                icon:"success"
            })
        })
    }
    render() { 
        let details=this.state.details;
        let ico=[ico1,ico2,ico3,ico4,ico5,ico6,ico7]
        return (
            <View className='order_details'>
                <View className='tp'>
                    <View className='type'>订单{orderStatus(details.status || 2)}</View>
                    <Image src={ico[details.status-1]}></Image>
                </View>
                <View className='main'>
                    <View className='conbox address'>
                        <View className='where'>{details.address}</View>
                        <View className='what'>
                            <Text>{details.contact}</Text>
                            <Text>{details.tel}</Text>
                        </View>
                    </View>
                    <View className='conbox cterbox'>
                        <View className='name'>
                            <View className='n'>{details.supplier_title}</View>
                        </View>
                       {
                           details.product.map((ele,index)=>{
                               return (
                                <View className='cter' key={ele.id}>
                                    <Image src={ele.img[0]} mode='aspectFill'></Image>
                                    <View className='rt'>
                                        <View className='tit'>{ele.title}</View>
                                        <View className='ico'>{ele.spec_title}</View>
                                        <View className='num'>
                                            ¥{ele.price} <Text>X{ele.num}</Text>
                                        </View>
                                    </View>
                                    <View className='appealbtn'  onTap={this.went.bind(this,"/pages/appeal/index?id="+details.id+"&index="+index)}>申诉</View>
                                </View>
                               )
                           })
                       }
                        <View className='li'>
                            <View className='label'>商品金额</View>
                            <Text>¥{details.money}</Text>
                        </View>
                        <View className='li'>
                            <View className='label'>运费</View>
                            <Text>{details.track_fee==0?"免运费":details.track_fee}</Text>
                        </View>
                        <View className='li smli'>
                            <View className='label'>备注</View>
                            <Text>{details.note}</Text>
                        </View>
                        <View className='last'>
                           <View className='tlaop'> 
                                <View className='how'>共{details.product.length}件</View>
                                <View className='money'>合计：<Text>¥{details.money+details.track_fee}</Text></View>
                           </View>
                        {/*   <View className='has'>不含运费</View>*/}
                        </View>
                    </View>
                    <View className='conbox info'>
                        <View className='tit'>订单信息</View>
                        <View className='p'>
                            <View className='label'>订单编号:</View>
                            {details.no}
                        </View>
                        <View className='p'>
                            <View className='label'>下单时间:</View>
                            {details.created_at}
                        </View>
                        {
                            details.status>=3 && details.status!=7 &&<View className='p'>
                            <View className='label'>支付时间:</View>
                                {details.pay_at}
                            </View>
                        }
                        {
                            details.status>=5 && details.status!=7 &&<View className='p'>
                            <View className='label'>发货时间:</View>
                                {details.track_at}
                            </View>
                        }
                        {
                            details.status>=6 && details.status!=7 &&<View className='p'>
                            <View className='label'>确认收货时间:</View>
                                {details.end_at_real}
                            </View>
                        }
                    </View>
                </View>
                <View className='sbtn'>
                    { details.status<2 && <View className='smbtn'  onTap={this.went.bind(this,"/pages/qxorder/index?id="+details.id)}>取消订单</View> }
                    { details.status==2 && <View className='smbtn'>支付</View> }
                    { details.status==4 && <View className='smbtn' onTap={this.notify.bind(this,details.id)}>提醒发货</View> }
                    { details.status==5 && <View className='smbtn'>查看物流</View> }
                    { (details.status>=5 || details.status<7) && <View className='smbtn' onTap={this.orderok.bind(this,details.id)}>确认收货</View> }
                    { details.status==7 && <View className='smbtn'>待评价</View> }
                    { details.status>=8 && <View className='smbtn'  onTap={this.del.bind(this,details.id)}>删除订单</View> }
                </View>
            </View>
        );
    }
}
 
export default List;