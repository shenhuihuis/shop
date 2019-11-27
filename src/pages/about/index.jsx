import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import "./index.less"
class About extends Component {
    config = {
        navigationBarTitleText: '关于我们'
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
            <View className='about'>
                <View className='logo'>小程序名称</View>
                <View className='ul'>
                    <View className='li'>企业介绍</View>
                    <View className='li'>平台权益介绍</View>
                    <View className='li'>投诉与建议</View>
                    <View className='li'>
                    联系我们
                        <Text>400-888-9999</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default About;