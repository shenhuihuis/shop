import Taro, { Component } from '@tarojs/taro'
import { View ,Text} from '@tarojs/components'
import './index.less'
class Delist extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <View className='delist'>
                <View className='li'>
                    <View className='lf'>
                        <Image></Image>
                        <View className='tit'>供应商名称</View>
                    </View>
                    <View className='cancel'>取消收藏</View>
                </View>
                <View className='li'>
                    <View className='lf'>
                        <Image></Image>
                        <View className='tit'>供应商名称</View>
                    </View>
                    <View className='cancel'>取消收藏</View>
                </View>
                <View className='li'>
                    <View className='lf'>
                        <Image></Image>
                        <View className='tit'>供应商名称</View>
                    </View>
                    <View className='cancel'>取消收藏</View>
                </View>
                <View className='li'>
                    <View className='lf'>
                        <Image></Image>
                        <View className='tit'>供应商名称</View>
                    </View>
                    <View className='cancel'>取消收藏</View>
                </View>
            </View>
        );
    }
}
 
export default Delist;