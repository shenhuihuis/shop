import Taro, { Component } from '@tarojs/taro'
import { View, Text ,ScrollView} from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './index.less'
import $http from "@public/server"
// 1 OrderProductStatusTodo 待处理
// 2 OrderProductStatusToPay 待支付
// 3 OrderProductStatusToAudit 待审核
// 4 OrderProductStatusToTrack 待发货
// 5 OrderProductStatusToGet 待收货
// 6 OrderProductStatusOK 完成
// 7 OrderProductStatusCancel 取消
import { orderStatus } from "@public/utils"
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: [{ title: '全部',status:0},{ title: '待处理' ,status:1}, { title: '待付款' ,status:2},{ title: '待发货',status:4 },{ title: '待收货' ,status:6}, { title: '已完成',status:7},{ title: '已取消',status:8}],
            current: 0,
            form:{
                page:1,
                limit:10,
                status:0
            },
            load:false,
            list:[],
            scrollTop:0,
            count:null
        }
    }
    config = {
        navigationBarTitleText: '商品订单',
        enablePullDownRefresh: true, 
        onReachBottomDistance:50
    }
    onPullDownRefresh(){
       this.rest()
    }
    onScroll=()=>{
        if(this.state.list.length>=this.state.count) return false;
        else{
            Taro.showLoading({
                title:"正在加载中",
                mask:true
            })
            let page=this.state.form.page;
            page=page+1
            this.setState((preState) => {
                preState.form.page=page;
            })
            setTimeout(e=>{
                this.getList()
            },200)
        }
    }
    handleClick = (value) => {
        if(value==this.state.current) return false;
        this.setState(preState=>{
            preState.current=value;
            preState.list=[];
            preState.count=null;
            preState.form.page=1;
            preState.load=false;
            preState.form.status=this.state.tabList[value].status;
            preState.scrollTop=0;
        })
        setTimeout(e=>{
            this.getList()
        },500)        
    }
    rest = () => {
        this.setState((preState) => {
            preState.load=false;
            preState.scrollTop=0;
            preState.count=null;
            preState.form.page=1;
            preState.list=[]    
        })
       setTimeout(e=>{
            this.getList()
            Taro.stopPullDownRefresh()
       },500)
    }
    componentWillMount=()=>{
        this.getList();
    }
    notify=(id)=>{
        $http.post("account/order/notify",{id:id}).then(e=>{
            Taro.showToast({
                title:"提醒发货成功",
                icon:"success"
            })
        })
    }
    pay=(id)=>{
        $http.post("account/order/pay",{id:id}).then(e=>{
          
            wx.requestPayment({
                timeStamp: e.timeStamp,
                nonceStr: e.nonceStr,
                package: e.package,
                signType: 'MD5',
                paySign: e.paySign,
                success:(res)=>{
                    Taro.showToast({
                        title:"支付成功",
                        icon:"success"
                    })
                    this.rest()
                   // this.handleClick(this.state.current)
                }
            })
           
        })
    }
    orderok=(id,index)=>{           //确认收货
        $http.post("account/order/ok",{id:id}).then(e=>{
            Taro.showToast({
                title:"收货成功",
                icon:"success"
            })
            this.rest()
        })
    }

    del=(id,index)=>{   //删除订单
        $http.post("account/order/del",{id:id}).then(e=>{
            Taro.showToast({
                title:"已删除订单",
                icon:"success"
            })
            this.rest()
        })
    }
    getList=()=>{
        Taro.showLoading({
            title:"正在加载中",
            mask:true
        })
        $http.get("account/order",this.state.form).then(e=>{
            this.setState({
                count:e.count,
                list:this.state.list.concat(e.list),
                load:true
            })
            Taro.hideLoading()
        })
    }
    went=(url,e)=>{
        e.stopPropagation()
        Taro.navigateTo({
            url:url
        })
    }
    render() {
        const tabList = this.state.tabList;
        let list=this.state.list;
        let hei;
        wx.getSystemInfo({
            success:function (res) {
                let height = (res.windowHeight * (750 / res.windowWidth)); //将高度乘以换算后的该设备的rpx与px的比例
                hei={height:height-98 +'rpx'}
            }
        })
        return (
            <View className='orderlist'>
                <AtTabs current={this.state.current}  scroll  tabList={tabList} onClick={this.handleClick.bind(this)}>
                   { tabList.map((e,index)=>{
                        return (
                            <AtTabsPane current={this.state.current} index={index} key={e.title}>
                                {
                                    
                                    this.state.load && (this.state.count>0 && list.length>0?
                                    <ScrollView className='list' scrollY scrollWithAnimation style={hei} lowerThreshold={30}  onScrolltolower={this.onScroll} scrollTop={this.state.scrollTop}>
                                        {
                                            list.map((ele,index)=>{
                                                return (
                                                    <View className='li' key={ele.id}>
                                                        <View  onTap={this.went.bind(this,'/pages/order_detalis/index?id='+ele.id)}>
                                                            <View className='tp'>
                                                                <View className='name'>{ele.supplier_title}</View>
                                                                <View className='status'>{orderStatus(ele.status)}</View>
                                                            </View>
                                                            {
                                                                ele.product.map(element=>{
                                                                    return (
                                                                        <View className='cter' key={element.product_id}>
                                                                            <Image src={element.img[0]} mode='aspectFill'></Image>
                                                                            <View className='rt'>
                                                                                <View className='tit'>{element.title}</View>
                                                                                <View className='ico'>{element.spec_title}</View>
                                                                                <View className='num'>
                                                                                    ¥{element.price} <Text>X{element.num}</Text>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    )
                                                                })
                                                            }
                                                        </View>
                                                        <View className='bot'>
                                                            <View className='lf'>{ele.status==3 ? "付款信息待审核":''}{ele.status==5 ? "部分发货":''}</View>
                                                            <View className='btn'>
                                                                { ele.status<=2 && <View className='a' onTap={this.went.bind(this,"/pages/qxorder/index?id="+ele.id)}>取消订单</View> }
                                                                { (ele.status==2 && ele.pay_type<=1) &&  <View className='a' onTap={this.pay.bind(this,ele.id)}>支付</View> }
                                                                { (ele.status==2 && ele.pay_type>=2) &&  <View className='a' onTap={this.went.bind(this,"/pages/logupload/index?id="+ele.id)}>上传凭证</View> }
                                                                { ele.status==4 && <View className='a' onTap={this.notify.bind(this,ele.id,index)}>提醒发货</View> }
                                                                { (ele.status>=5 && ele.status<8) && <View className='a' onTap={this.went.bind(this,"/pages/seelog/index?len="+ele.product.length+"&id="+ele.id)}>查看物流</View> }
                                                                { (ele.status>=5 && ele.status<7) && <View className='a' onTap={this.orderok.bind(this,ele.id,index)}>确认收货</View> }
                                                                {(ele.status==7 && !ele.is_comment) && <View className='a' onTap={this.went.bind(this,"/pages/evaluateing/index?id="+ele.id)}>评价</View> }
                                                                { ele.status>=8 && <View className='a' onTap={this.del.bind(this,ele.id,index)}>删除订单</View> }
                                                            </View>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }
                                    </ScrollView>:<View className='nobg'>这里什么也没有，去逛逛～</View>)
                                }
                            </AtTabsPane>
                        )
                   })}
                </AtTabs>
            </View>
        );
    }
}

export default Order;