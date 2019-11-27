import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker, Input } from '@tarojs/components'
import "./index.less"
import {getStore , setStore } from "./../../store"
class Demand extends Component {
    config = {
        navigationBarTitleText: '填写需求'
    }
    constructor(props) {
        super(props);
        this.state = {
            postAdd: "111",
            type:true
        }
    }
    componentWillMount () {

    }
    onSubmit = (e) => {
        console.log(e)
    }
    addDetails = (e) =>{
        Taro.navigateTo({url:"/pages/add_list/index"})
    }
    render() {
        return (
            <View className='form'>
                <View className='tp'>
                    <View className='lf'>
                    </View>
                    <View className='rt'>
                        <View className='address' onClick={this.addDetails.bind(this)}>
                            <View className='ico1'></View>
                           { !this.state.type ?<View className='ipt'>请填写提货地址</View> :
                                <View className='out'>
                                    <View className='info'>杭州市西湖区三墩镇亲亲家园7幢2234</View>
                                    <View className='t'>
                                        <Text>西索</Text>
                                        <Text>13566678889</Text>
                                    </View>
                                </View>
                            }
                        </View>
                        <View className='address'  onClick={this.addDetails.bind(this)}>
                            <View className='ico3'></View>
                            { !this.state.type ?<View className='ipt'>请填写收货地址</View> :
                                <View className='out'>
                                    <View className='info'>杭州市西湖区三墩镇亲亲家园7幢2234</View>
                                    <View className='t'>
                                        <Text>西索</Text>
                                        <Text>13566678889</Text>
                                    </View>
                                </View>
                            }
                        </View>
                    </View>
                </View>
                <View className='formson'>
                    <View className='li'>
                        <View className='label'>运输方式</View>
                        <View className='pickers'>
                            <Picker mode='multiSelector' onChange={this.onTimeChange} range={[['a', 'b'], ['c', 'd']]}>
                                <View className='picker'>
                                    请选择{this.state.timeSel}
                                </View>
                            </Picker>
                        </View>
                    </View>
                    <View className='li'>
                        <View className='label'>发货时间</View>
                        <View className='pickers'>
                            <Picker mode='time' onChange={this.onTimeChange}>
                                <View className='picker'>
                                    请选择{this.state.timeSel}
                                </View>
                            </Picker>
                        </View>
                    </View>
                    <View className='li'>
                        <View className='label'>到货时间</View>
                        <View className='pickers'>
                            <Picker mode='time' onChange={this.onTimeChange}>
                                <View className='picker'>
                                    请选择{this.state.timeSel}
                                </View>
                            </Picker>
                        </View>
                    </View>
                    <View className='li'>
                        <View className='label'>运输方式</View>
                        <Input placeholder='输入联系人姓名'  type='text'></Input>
                    </View>
                    <View className='li'>
                        <View className='label'>联系方式</View>
                        <Input placeholder='请输入联系电话'  type='text'></Input>
                    </View>
                </View>
                <View className='formson'>
                    <View className='li'>
                        <View className='label'>物品重量</View>
                        <Input placeholder='请填写物品质量' type='text'></Input>
                    </View>
                    <View className='li'>
                        <View className='label'>物品提及</View>
                        <Input placeholder='请填写物品体积' type='text'></Input>
                    </View>
                    <View className='li'>
                        <View className='label'>运输方式</View>
                        <View className='pickers'>
                            <Picker mode='selector' onChange={this.onTimeChange} range={['常温','冷藏','冷冻']}>
                                <View className='picker'>
                                    请选择{this.state.timeSel}
                                </View>
                            </Picker>
                        </View>
                    </View>
                </View>
                <View className='formson'>
                    <View className='htit'>物品描述</View>
                    <Input className='txt' placeholder='补充详细信息…'></Input>
                    <View className='htit'>物品图片</View>
                    <View className='imglist'>
                        <View className='img'>
                            <View className='close'></View>
                            <Image></Image>
                        </View>
                        <View className='img'>
                            <View className='close'></View>
                            <Image></Image>
                        </View>
                        <View className='img'>
                            <View className='close'></View>
                            <Image></Image>
                        </View>
                        <View className='add'></View>
                    </View>
                    <View className='lli'>
                        <View className='label'>备注</View>
                        <Input className='lput' placeholder='填写备注信息（选填）'  type='text'></Input>
                    </View>
                    <View className='bot'>*这里是温馨提示的内容</View>
                </View>
                
                <View className='bton'>
                    <View className='sub'>提交</View>
                </View>

            </View>
        );
    }
}

export default Demand;