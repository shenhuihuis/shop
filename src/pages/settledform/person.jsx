import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import "./index.less"
import {getStore , setStore } from "./../../store"
class Company extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentWillMount () {

    }
    onSubmit = (e) => {
        console.log(e)
    }
    render() {
        return (
            <View className='form'>
                <View className='formson'>
                    <View className='li'>
                        <View className='label'>姓名</View>
                        <Input placeholder='请填写您的姓名'  type='text'></Input>
                    </View>
                    <View className='li'>
                        <View className='label'>身份证号</View>
                        <Input placeholder='请填写您的身份证号吗'  type='text'></Input>
                    </View>
                    <View className='li'>
                        <View className='label'>联系电话</View>
                        <Input placeholder='请输入联系电话'  type='text'></Input>
                    </View>
                    <View className='htit'>经营范围</View>
                    <Input className='txt' placeholder='请填写企业商品经营范围…'></Input>
                </View>
                <View className='h2'>资质证照</View>
                <View className='formson'>
                    <View className='li'>
                        <View className='label'>银行卡号</View>
                        <Input placeholder='请填写银行卡号'  type='text'></Input>
                    </View>
                    <View className='li'>
                        <View className='label'>持卡人</View>
                        <Input placeholder='请填写开户人姓名'  type='text'></Input>
                    </View>
                    <View className='li'>
                        <View className='label'>开户行</View>
                        <Input placeholder='请填写开户行银行'  type='text'></Input>
                    </View>
                    <View className='smli'>
                        <View className='tit'>银行卡照片</View>
                        <View className='imgbox'>
                            <View className='imgs'>银行卡照片</View>
                            <View className='imgsbefor'>
                                <View class='close'></View>
                                <Image></Image>
                            </View>
                        </View>
                    </View>
                    <View className='smli'>
                        <View className='tit'>身份证正、反面</View>
                        <View className='imgbox'>
                            <View className='imgs longs'>上传人像面</View>
                            <View className='imgsbefor longs'>
                                <View class='close'></View>
                                <Image></Image>
                            </View>
                            <View className='imgs longs'>上传国徽面</View>
                            <View className='imgsbefor longs'>
                                <View class='close'></View>
                                <Image></Image>
                            </View>
                        </View>
                    </View>
                    <View className='smli'>
                        <View className='tit'>相关许可证</View>
                        <View className='imgbox'>
                            <View className='imgs'>相关许可证</View>
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

export default Company;