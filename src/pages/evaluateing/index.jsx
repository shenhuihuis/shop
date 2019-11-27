import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import "./index.less"
class Evalutaing extends Component {
    config = {
        navigationBarTitleText: '评价'
    }
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <View className='list'>
                <View className='li'>
                    <View className='tp'>
                        <Image></Image>
                        <View className='name'>越南进口高乐蜜芒果5斤装 单果200克起 香甜爽口细腻多汁</View>
                    </View>
                    <View className='sex'>
                        <View className='i act'></View>
                        <View className='i'></View>
                        <View className='i'></View>
                        <View className='i'></View>
                        <View className='i'></View>
                    </View>
                    <Textarea placeholder='评价内容…'></Textarea>
                    <View className='imgbox'>
                        <View className='imgs'>上传图片</View>
                        <View className='imgsbefor'>
                            <View class='close'></View>
                            <Image></Image>
                        </View>
                    </View>
                </View>
                <View className='bton'>
                    <View className='sub'>确认提交</View>
                </View>
            </View>
        );
    }
}

export default Evalutaing;