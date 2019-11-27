import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import Navs from "./../../components/nav"
import './index.less'
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            
        }
    }
    config = {
        navigationBarTitleText: '认证'
    }
    render() { 
        return (
            <View className='attes'>
                <View className='list'>
                    <View className='li'>
                        <View className='tit'>认证类型</View>
                        <View className='span'>个人</View>
                    </View>
                    <View className='li'>
                        <View className='tit'>姓名</View>
                        <View className='span'>
                            <Input placeholder='请填写您的姓名'></Input>
                        </View>
                    </View>
                    <View className='li'>
                        <View className='tit'>身份证号</View>
                        <View className='span'>
                            <Input placeholder='请填写您的身份证号'></Input>
                        </View>
                    </View>
                    <View className='li'>
                        <View className='tit'>联系电话</View>
                        <View className='span'>13455567778</View>
                    </View>
                </View>
                <View className='htit'>更多信息(选填)</View>
                <View className='list'>
                    <View className='smli'>
                        <View className='tit'>身份证正、反面</View>
                        <View className='imgbox'>
                            <View className='imgs'>上传人像面</View>
                            <View className='imgsbefor'>
                                <View class='close'></View>
                                <Image></Image>
                            </View>
                            <View className='imgs'>上传国徽面</View>
                            <View className='imgsbefor'>
                                <View class='close'></View>
                                <Image></Image>
                            </View>
                        </View>
                    </View>
                    <View className='smli'>
                        <View className='tit'>营业执照</View>
                        <View className='imgbox'>
                            <View className='imgs'>上传营业执照</View>
                            <View className='imgsbefor'>
                                <View class='close'></View>
                                <Image></Image>
                            </View>
                        </View>
                    </View>
                    <View className='smli'>
                        <View className='tit'>相关许可证</View>
                        <View className='imgbox'>
                            <View className='imgs'>上传相关许可证</View>
                            <View className='imgsbefor'>
                                <View class='close'></View>
                                <Image></Image>
                            </View>
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
 
export default Order;