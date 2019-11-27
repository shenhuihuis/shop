import Taro, { Component } from '@tarojs/taro'
import { View ,Text} from '@tarojs/components'
import './index.less'
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <View className='col_list'>
                <View className='li'>
                    <Image></Image>
                    <View className='tit'>香甜多汁现摘现发湖北纽荷尔脐橙5斤单果5</View>
                    <View className='bot like'>
                        <View className='money'> 
                            <small>¥</small>68
                        </View>
                        <View className='span'>销量：1039</View>
                    </View>
                </View>
                <View className='li'>
                    <Image></Image>
                    <View className='tit'>橙5斤单果5</View>
                    <View className='bot'>
                        <View className='money'> 
                            <small>¥</small>68
                        </View>
                        <View className='span'>销量：1039</View>
                    </View>
                </View>
            </View>
        );
    }
}
 
export default List;