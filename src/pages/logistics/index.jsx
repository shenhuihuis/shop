import Taro, { Component } from '@tarojs/taro'
import { View ,Text} from '@tarojs/components'
import './index.less'
class Logistics extends Component {
    config = {
        navigationBarTitleText: '找物流',
        navigationBarBackgroundColor: '#319F5F',
        navigationBarTextStyle:'white'
    }
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
     
    }
    render() { 
        
        return ( 
            <View className='logistics'>
                <View className='tp'> 
                    <View className='tit'>
                        找物流
                       <Text>不用出门直接送到家</Text> 
                    </View>
                    <View className='cbox'>
                        <View className='btn'>填写物流需求</View>
                    </View>
                </View>
                <View className='htit'>优质供应商</View>
                <View className='list'>
                    <View className='li'>
                         <View className='lf'>
                            <Image></Image>
                            <View className='name'>供应商名称</View>
                        </View>
                        <View className='see'>查看详情</View>
                    </View>
                </View>
            </View>
        );
    }
}
 
export default Logistics;