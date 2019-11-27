import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import "./index.less"
class Hotline extends Component {
    config = {
        navigationBarTitleText: '投诉与建议'
    }
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentWillMount () {

    }
    render() {
        return (
            <View className='hotline'>
                <Textarea placeholder='对我们的商品、服务，您有什么建议吗？您还想要在我们平台上买到什么？请告诉我们…'></Textarea>
                <View className='imgbox'>
                    <View className='imgs'></View>
                    <View className='imgsbefor'>
                        <View class='close'></View>
                        <Image></Image>
                    </View>
                </View>
                <View className='bton'>
                    <View className='sub'>确认提交</View>
                </View>
            </View>
        );
    }
}

export default Hotline;