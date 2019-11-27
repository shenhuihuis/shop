import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import "./index.less"
class Add_list extends Component {
    config = {
        navigationBarTitleText: '我的地址'
    }
    constructor(props) {
        super(props);
        this.state = {
            type:0
        }
    }
    addDetails = (e) =>{
        Taro.navigateTo({url:"/pages/add_details/index"})
    }
    render() { 
        return ( 
            <View className='addlist'>
              { type == 0 ?<View className='ul'> 
                    <View className='li'  onClick={this.addDetails.bind(this)}>
                        <View className='lf'>
                            <View className='tp'>
                                <Text>默认</Text>
                                <View className='tit'>浙江省杭州市西湖区三墩镇尚坤生态创意园 B412</View>
                            </View>
                            <View className='bot'>
                                <Text>西索</Text>
                                <Text>13455567778</Text>
                            </View>
                        </View>
                        <View className='btn'></View>
                    </View>
                </View>
                :<View className='nobg'>
                    <View className='tit'>您还没有添加收货地址</View>
                    <View className='add'>去添加</View>
                </View>} 
            </View>
        );
    }
}
 
export default Add_list;