import Taro, { Component } from '@tarojs/taro'
import { View ,Text ,Textarea} from '@tarojs/components'
import './index.less'
import  $http from '@public/server'
class Seelog extends Component {
    config = {
        navigationBarTitleText: '物流'
    }
    constructor(props) {
        super(props);
        this.state = { 
            track:{}
        }
    }
    componentWillMount(){
        $http.get("account/order/track",{id:this.$router.params.id*1}).then(e=>{
            this.setState({
                track:e
            })
        })
    }
    render() { 
        return ( 
            <View className='seelog'>
                <View className='conbox cterbox'>
                    <View className='name'>供应商名称</View>
                    <View className='li'>
                        <View className='label'>物流公司</View>
                        <Text>顺丰快递</Text>
                    </View>
                    <View className='li'>
                        <View className='label'>物流单号</View>
                        <Text>2298769040872737853</Text>
                    </View>
                    <View className='cter'>
                        <Image></Image>
                        <View className='rt'>
                            <View className='tit'>越南进口高乐蜜芒果5斤装 单果200克起 香甜爽口细腻多汁</View>
                            <View className='ico'>规格3；规格A</View>
                            <View className='num'>
                                ¥49.9 <Text>X10</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='conbox cterbox'>
                    <View className='li'>
                        <View className='label'>物流公司</View>
                        <Text>顺丰快递</Text>
                    </View>
                    <View className='li'>
                        <View className='label'>物流单号</View>
                        <Text>2298769040872737853</Text>
                    </View>
                </View>
            </View>
        );
    }
}
 
export default Seelog;