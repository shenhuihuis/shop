import Taro, { Component } from '@tarojs/taro'
import { View ,Text} from '@tarojs/components'
import './index.less'
import $http from '@public/server'
import {previewImage} from "@public/utils"
class AppealDetails extends Component {
    config = {
        navigationBarTitleText: '申诉详情',
        navigationBarBackgroundColor: '#319F5F',
        navigationBarTextStyle:'white'
    }
    constructor(props) {
        super(props);  
        this.state = { 
            details:{}
        }
    }
    componentDidMount(){
        this.init()
    }
    init = () =>{
        let params=this.$router.params;
        if(params.id){
            $http.get("account/order/appeal/info",{id:this.$router.params.id}).then(e=>{
                this.setState({
                    details:e
                })
            })
        }else{
            $http.get("account/track/appeal/info",{id:this.$router.params.logid}).then(e=>{
                this.setState({
                    details:e
                })
            })
        }
    }
    cancel=(id)=>{
        if(this.$router.params.id){
            $http.post("account/order/appeal/cancel",{id:id}).then(e=>{
                Taro.redirectTo({
                    url:"/pages/appealRecord/index?index=0"
                })
            })
        }else{
            $http.post("account/track/appeal/cancel",{id:id}).then(e=>{
                Taro.redirectTo({
                    url:"/pages/appealRecord/index?index=1"
                })
            })
        }
    }
    previewImage=(current)=>{
        Taro.previewImage({
            current: current, // 当前显示图片的http链接
            urls: this.state.details.imgs // 需要预览的图片http链接列表
        })
    }
    render() { 
        let details=this.state.details;
        return ( 
            <View className='appealDetails'>
                <View className='tp'>
                    <View className='type'>{details.status==4?"已取消":(details.status==1?"待处理":(details.status==3?"已处理":'已拒绝'))}</View>
                    <View className='say'>{details.status==1 ? "申诉提交成功，请等待平台处理":""}</View>
                </View>
                {
                   details.status==3 && 
                   <View className='li'>
                        <View className='label'>退款金额</View>
                        <Text>{details.price || details.money || 0}</Text>
                    </View>
                }
                <View className='li'>
                    <View className='label'>订单编号</View>
                    <Text>{details.order_no}</Text>
                </View>
                <View className='li'>
                    <View className='label'>申请时间</View>
                    <Text>{details.created_at}</Text>
                </View>
                <View className='smli'>
                    <View className='label'>详细描述</View>
                    <View className='txt'>{details.info}</View>
                </View>
               {details.do_note && <View className='smli'>
                    <View className='label'>处理反馈</View>
                    <View className='txt'>{details.do_note}</View>
                </View>}
                <View className='imglist'>
                  { details.imgs.map(ele=>{
                       return (
                        <Image src={ele} mode='aspectFill' onTap={this.previewImage.bind(this,ele)}></Image>
                       )
                   })}
                </View>
                {
                    details.status==1 && <View className='bton'>
                        <View className='sub' onTap={this.cancel.bind(this,details.id)}>撤销申请</View>
                    </View>
                }
            </View>
        );
    }
}
 
export default AppealDetails;