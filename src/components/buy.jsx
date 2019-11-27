import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInputNumber } from 'taro-ui'
import "../assets/css/buy.less"
export default class buyput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 1
        }
    }
    close=(e)=>{
        this.props.handClose(false)
    }
    render() {
        return (
            <View className='fixedbox' catchtouchmove>
                <View className='putbox'>
                    <View className='tp'>
                        <View className='pic'>
                            <Image></Image>
                        </View>
                        <View className='money'>¥49.9</View>
                        <View className='close' onClick={this.close.bind(this,false)}></View>
                    </View>
                    <View className='li'>
                        <View className='tit'>规格维度1</View>
                        <View className='dl'>
                            <View className='dd'>规格1</View>
                            <View className='dd'>规格1</View>
                        </View>
                    </View>
                    <View className='nums'>
                        <View className='span'>数量</View>
                        <View className='ck'>
                            <AtInputNumber width={76} min={0}  step={1} value={this.state.value}/>
                        </View>
                    </View>
                    <View className='sub'>确定 </View>
                </View>
            </View>
        )
    }
}
