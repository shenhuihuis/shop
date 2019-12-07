import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import "./index.less"
import { getGlobalData } from '@public/global_data'
class About extends Component {
    config = {
        navigationBarTitleText: '关于我们'
    }
    constructor(props) {
        super(props);
        this.state = {
            tel:getGlobalData("tel")
        }
    }
    componentWillMount () {
        
    }
    call = () => {  //联系客服
        wx.makePhoneCall({
            phoneNumber: getGlobalData("tel"),
            success: function () {
                console.log("拨打电话成功！")
            },
            fail: function () {
                console.log("拨打电话失败！")
            }
        })
    }
    went=(e)=>{
        Taro.navigateTo({url:e})
    }
    render() {
        return (
            <View className='about'>
                <View className='logo'>小程序名称</View>
                <View className='ul'>
                    <View className='li' onTap={this.went.bind(this,"/pages/page/index?type=0")}>企业介绍</View>
                    <View className='li' onTap={this.went.bind(this,"/pages/page/index?type=1")}>平台权益介绍</View>
                    <View className='li' onTap={this.went.bind(this,"/pages/hotline/index")}>投诉与建议</View>
                    <View className='li' onTap={this.call.bind(this)}>
                    联系我们
                        <Text>{this.state.tel}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default About;