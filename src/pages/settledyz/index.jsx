import Taro, { Component } from '@tarojs/taro'
import { View ,Text} from '@tarojs/components'
import './index.less'
import $http from "@public/server"
class Settleyz extends Component {
    config = {
        navigationBarTitleText: '供应商入驻',

    }
    constructor(props) {
        super(props);
        this.state = { 
            phone:''

        }
    }
    componentDidMount() { 
        
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
    sub=(e)=>{      //下一步

        if (!this.state.phone) {
             Taro.showToast({
                 title: "请输入手机号",
                 icon: 'none',
                 duration: 1000
             })
             return false;
         }
         if (!/^1[3456789]\d{9}$/.test(this.state.phone)) {
             Taro.showToast({
                 title: "请输入正确的手机号",
                 icon: 'none',
                 duration: 1000
             })
             return false;
         }
         Taro.redirectTo({url:'/pages/settledform/index?tel='+this.state.phone+"&type="+this.$router.params.type})
         
     }
    render() { 
        return ( 
            <View className='settleyz'>
                <View className='form'>
                    <View className='inpt'>
                        <Input placeholder='请输入手机号码' value={this.state.phone} onChange={this.handPhone.bind(this)} ></Input>
                        {!this.state.phone && <Button className="send" open-type="getPhoneNumber" ongetphonenumber={this.getPhoneNumber.bind(this)}>快速获取</Button>}
                    </View>
                    {this.state.phone ? <View className='sub' onTap={this.sub.bind(this)}>验证</View>:<View className='sub error'>验证</View>}
                </View>
            </View>
        );
    }
}
 
export default Settleyz;   