import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import Navs from "./../../components/nav"
import './index.less'
import {getGlobalData} from "@public/global_data"
import $http from "@public/server"
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            user:{},
            phone:'',
            current:1
        }
    }
    config = {
        navigationBarTitleText: '认证'
    }
    componentDidMount() { 
        this.setState({
          user:JSON.parse(Taro.getStorageSync("user")) || JSON.parse(getGlobalData("user"))  //用户信息
        })
    }
    getPhoneNumber=(e)=>{
        $http.post("wechat/tel",{data:e.detail.encryptedData,iv:e.detail.iv}).then(e=>{
            this.setState({
                phone:e.phoneNumber
            })
        })
    }
    handPhone=(e)=>{
        this.setState({
            phone:e.detail.value
        })
    }
    navCk=(index)=>{
        this.setState({
            current:index
        })
    }
    sub=(e)=>{      //下一步
       // 1、若该手机号码被业务员提交过且审核失败，或从未被提交过，则进入下一步         0 2
       // 2、若该手机号码被业务员提交过且处于审核中，则提示用户认证信息待审核          1
       // 3、若该手机号码被业务员提交过且审核通过，则提示用户认证成功                3
       if (!this.state.phone) {
            Taro.showToast({
                title: "请输入手机号",
                icon: 'none',
                duration: 1000
            })
            return false;
        }
        if (!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.state.phone)) {
            Taro.showToast({
                title: "请输入正确的手机号",
                icon: 'none',
                duration: 1000
            })
            return false;
        }
       const status=this.state.user.status;
       if(status==0 || status==2){
           Taro.redirectTo({url:"/pages/attes_ing/index?type="+this.state.current+"&phone"+this.state.phone})     //1 是个人认证  2是企业认证
       }else{
           Taro.showToast({
            title: status==1?"认证信息审核中":"已认证成功",
            icon: 'none',
            duration: 2000
          })
       }
    }
    render() { 
        return (
            <View className='toattes'>
                <View className='navs'>
                    <View  className={`li ${this.state.current==1?"act":""}`} onTap={this.navCk.bind(this,1)}>认证个人</View>
                    <View className={`li ${this.state.current==2?"act":""}`} onTap={this.navCk.bind(this,2)}>认证企业</View>
                </View>
                <View className='txtbox'>
                    <Input placeholder='请输入手机号码' value={this.state.phone} onChange={this.handPhone.bind(this)}></Input>
                   { !this.state.phone && <Button className='send' open-type="getPhoneNumber" ongetphonenumber={this.getPhoneNumber.bind(this)}>快速获取</Button>}
                </View>
                <View className='bton'>
                    <View className='sub' onTap={this.sub.bind(this)}>验证</View>
                </View>
            </View>
        );
    }
}
 
export default Order;