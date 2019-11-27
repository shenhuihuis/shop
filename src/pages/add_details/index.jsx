import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input} from '@tarojs/components'
import './index.less'
import {AtSwitch } from 'taro-ui'
class DeAdd extends Component {
    config = {
        navigationBarTitleText: '我的地址'
    }
    constructor(props) {
        super(props);
        this.state = {
            value:false
        }
    }
    onTimeChange=()=>{

    }
    handleChange=()=>{
        
    }
    render() {
        return (
            <View className='index'>
                <View className='form'>
                    <View className='li'>
                        <View className='label'>联系人</View>
                        <Input placeholder='请输入联系人姓名'></Input>
                    </View>
                    <View className='li'>
                        <View className='label'>联系方式</View>
                        <Input placeholder='请输入联系电话'></Input>
                    </View>
                    <View className='li'>
                        <View className='label'>所在地区</View>
                        <View className='pickers'>
                            <Picker mode='multiSelector' onChange={this.onTimeChange} range={[['a', 'b'], ['c', 'd']]}>
                                <View className='picker'>
                                    请选择{this.state.timeSel}
                                </View>
                            </Picker>
                        </View>
                    </View>
                    <View className='li'>
                        <View className='label'>联系人</View>
                        <Input placeholder='请输入联系人姓名'></Input>
                    </View>
                    <View className='li'>
                        <View className='label'>设为默认</View>
                        <View className='radbox'>
                            <AtSwitch checked={this.state.value} onChange={this.handleChange} color='#319F5F'/>
                        </View>
                    </View>
                </View>
                <View className='bton'>
                  { /* <View className='sub'>确认</View> */}
                  <View className='del'>删除地址</View>
                  <View className='add'>保存地址</View>
                </View>
            </View>

        );  
    }
}

export default DeAdd;