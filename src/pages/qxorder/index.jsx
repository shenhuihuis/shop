import Taro, { Component } from '@tarojs/taro'
import { View ,Text ,Textarea} from '@tarojs/components'
import './index.less'
import $http from '@public/server'
class Qx extends Component {
    config = {
        navigationBarTitleText: '取消订单'
    }
    constructor(props) {
        super(props);
        this.state = {
            txt:''
        }
    }
    sub=()=>{
        if(!this.state.txt){
            Taro.showToast({
                title:"请填写取消原因",
                icon:'none'
            })
            return false;
        }
        let params=this.$router.params;
        if(params.id){
            $http.post("account/order/cancel",{
                id:params.id*1,
                content:this.state.txt
            }).then(e=>{
                Taro.showToast({
                    title:"已取消订单",
                    icon:"success"
                })
                Taro.navigateBack({
                    delta:1
                })
            })
        }else{
            $http.post("account/track/order/cancel",{
                id:params.logid*1,
                content:this.state.txt
            }).then(e=>{
                Taro.showToast({
                    title:"已取消订单",
                    icon:"success"
                })
                Taro.navigateBack({
                    delta:1
                })
            })
        }
    }
    bindValue=(e)=>{
        this.setState({
            txt:e.detail.value
        })
    }
    render() { 
        return ( 
            <View className='qx'>
                <Textarea placeholder='请填写取消原因...' onInput={this.bindValue.bind(this)} value={this.state.txt}></Textarea>
                <View className='bton'>
                    <View className='sub' onTap={this.sub.bind(this)}>确认取消</View> 
                </View>
            </View>
        );
    }
}
 
export default Qx;