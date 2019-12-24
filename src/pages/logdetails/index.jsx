import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'
import $http from "@public/server";
import { trackStatus } from "@public/utils"
import ico1 from "./../../assets/img/oico1.png"; //待处理
import ico2 from "./../../assets/img/oico2.png"; //待支付
import ico3 from "./../../assets/img/oico3.png"; //待发货
import ico4 from "./../../assets/img/oico4.png"; //部分待发货
import ico5 from "./../../assets/img/oico5.png"; //待收货
import ico6 from "./../../assets/img/oico6.png"; //已完成
import ico7 from "./../../assets/img/oico7.png"; //已取消
class List extends Component {
    config = {
        navigationBarTitleText: '订单详情',
        navigationBarBackgroundColor: '#319F5F',
        navigationBarTextStyle: 'white'
    }
    constructor(props) {
        super(props);
        this.state = {
            load: false,
            details: {

            }
        }
    }
    componentDidShow() {
        this.init()
    }
    del = (id) => {   //删除订单
        $http.post("account/track/order/del", { id: id }).then(e => {
            Taro.showToast({
                title: "已删除订单",
                icon: "success"
            })
            Taro.redirectTo({url:'/pages/loglist/index'})
        })
    }
    notify = (id) => {      //提醒发货
        $http.post("account/track/order/notify", { id: id }).then(e => {
            Taro.showToast({
                title: "提醒发货成功",
                icon: "success"
            })
          
        })
    }
    orderok = (id) => {           //确认收货
        $http.post("account/track/order/ok", { id: id }).then(e => {
            Taro.showToast({
                title: "收货成功",
                icon: "success"
            })
            this.init()
        })
    }
    went = (url, e) => {
        e.stopPropagation()
        Taro.navigateTo({
            url: url
        })
    }
    init = () => {
        $http.get("account/track/order/info", { id: this.$router.params.id }).then(e => {
            e.warm = [{ title: "常温", id: 1 }, { title: "冷藏", id: 2 }, { title: "冷冻", id: 3 }].filter(ele => {
                return ele.id == e.warm_type
            })[0].title
            this.setState({
                details: e,
                load: true
            })
        })
    }
    render() {
        let ico = [ico1, ico2, ico3, ico4,ico4, ico5, ico6, ico7], details = this.state.details;
        return (
            <View className='order_details'>
                {this.state.load &&
                    <View>
                        <View className='tp'>
                            <View className='type'>订单{trackStatus(details.status)}</View>
                            <Image src={ico[details.status - 1]}></Image>
                        </View>
                        <View className='main'>
                            <View className='conbox postadd'>
                                <View className='type'>{details.track_type}</View>
                                <View className='cter'>
                                    <View className='lf'>
                                    </View>
                                    <View className='rt'>
                                        <View className='address'>
                                            <View className='ico1'></View>
                                            <View className='out'>
                                                <View className='addinfo'>{details.start_area + details.start_address}</View>
                                                <View className='t'>
                                                    <Text>{details.start_user}</Text>
                                                    <Text>{details.start_tel}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View className='address'>
                                            <View className='ico3'></View>
                                            <View className='out'>
                                                <View className='addinfo'>{details.end_area + details.end_address}</View>
                                                <View className='t'>
                                                    <Text>{details.end_user}</Text>
                                                    <Text>{details.end_tel}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View className='conbox cterbox'>
                                {details.status>1 && <View className='li'>
                                    <View className='label'>价格</View>
                                    <Text>{details.price}</Text>
                                </View>}
                                <View className='li'>
                                    <View className='label'>联系人</View>
                                    <Text>{details.contact}</Text>
                                </View>
                                <View className='li'>
                                    <View className='label'>联系方式</View>
                                    <Text>{details.tel}</Text>
                                </View>
                                <View className='li'>
                                    <View className='label'>发货时间</View>
                                    <Text>{details.start_at.slice(0,10)}</Text>
                                </View>
                                <View className='li'>
                                    <View className='label'>到货时间</View>
                                    <Text>{details.end_at.slice(0,10)}</Text>
                                </View>
                                <View className='li'>
                                    <View className='label'>物品重量</View>
                                    <Text>{details.weight}kg</Text>
                                </View>
                                <View className='li'>
                                    <View className='label'>物品体积</View>
                                    <Text>{details.size}cm³</Text>
                                </View>
                                <View className='li'>
                                    <View className='label'>温区选择</View>
                                    <Text>{details.warm}</Text>
                                </View>
                            </View>
                            <View className='conbox sayabout'>
                                <View className='htit'>物品描述</View>
                                <View className='say'>{details.product_note}</View>
                                <View className='htit'>物品图片</View>
                                <View className='imglist'>
                                    {
                                        details.imgs.map((ele, index) => {
                                            return (
                                                <View className='imgsbefor' key={ele} >
                                                    <Image src={ele} mode='aspectFill'></Image>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                                <View className='li'>
                                    <View className='label'>备注</View>
                                    <Text>{details.note}</Text>
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
                                    {details.create_at}
                                </View>
                                {details.audit_at && <View className='p'>
                                    <View className='label'>处理时间:</View>
                                    {details.audit_at}
                                </View>}
                               {details.track_at && details.status==6 && <View className='p'>
                                    <View className='label'>运输时间:</View>
                                    {details.track_at}
                                </View>}
                               {details.ok_at && <View className='p'>
                                    <View className='label'>确认收货时间:</View>
                                    {details.ok_at}
                                </View>}
                                {details.cancel_at && <View className='p'>
                                    <View className='label'>取消时间:</View>
                                    {details.cancel_at}
                                </View>}
                            </View>
                        </View>
                        <View className='sbtn'>
                            {details.status==3 ? "付款信息待审核":''}
                            {details.status==4 ? "待分配供应商":''}
                            {details.status<=2 && <View className='smbtn' onTap={this.went.bind(this, "/pages/qxorder/index?logid=" + details.id)}>取消订单</View>}
                            {details.status==2 && <View className='smbtn' onTap={this.went.bind(this, "/pages/logupload/index?logid=" + details.id)}>支付</View>}
                            {details.status==5 && <View className='smbtn' onTap={this.notify.bind(this,details.id)}>提醒运输</View>}
                            {details.status==6 && <View className='smbtn' onTap={this.orderok.bind(this,details.id)}>确认送达</View>}
                            {(details.status>=6 && details.status<8 )&& (details.is_appeal?<View className='smbtn' onTap={this.went.bind(this, "/pages/appealDetails/index?logid=" + details.appeal_id)}>申诉详情</View>:
                            <View className='smbtn' onTap={this.went.bind(this,"/pages/appeal/index?order_id="+details.id)}>申诉</View>)}
                            {details.status==8 && <View className='smbtn' onTap={this.del.bind(this,details.id)}>删除订单</View>}
                        </View>
                    </View>}
            </View>
        );
    }
}

export default List;