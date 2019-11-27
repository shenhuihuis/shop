import Taro, { Component } from '@tarojs/taro'
import { View ,Text} from '@tarojs/components'
import './index.less'
class Appeal extends Component {
    config = {
        navigationBarTitleText: '申诉'
    }
    constructor(props) {
        super(props);
        this.state = { 


        }
    }
    render() { 
        return ( 
            <View className='appeal'>
                <View className='conbox cterbox'>
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
                        <View className='label'>联系人</View>
                        <Input placeholder='填写联系人姓名'></Input>
                    </View>
                    <View className='li'>
                        <View className='label'>联系方式</View>
                        <Input placeholder='请填写联系人电话'></Input>
                    </View>
                    <View className='smli'>
                        <View className='label'>详细描述</View>
                        <Input placeholder='补充详细信息…'></Input>
                    </View>
                </View>
                <View className='conbox imgput'>
                    <View className='smli'>
                        <View className='label'>上传图片</View>
                        <View className='imgbox'>
                            <View className='imgs'></View>
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
 
export default Appeal;