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
        $http.post("account/order/cancel",{
            id:this.$router.params.id*1,
            content:this.state.txt
        }).then(e=>{
            Taro.navigateBack({
                delta:1
            })
        })
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