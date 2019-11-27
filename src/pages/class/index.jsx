import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import Navs from "./../../components/nav"
import './index.less'
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            current:0
        }
    }
    config = {
        navigationBarTitleText: '分类'
    }
    handleClick (value) {
        this.setState({
          current: value
        })
    }
    render() { 
        let hei;
        wx.getSystemInfo({
            success:function (res) {
                let height = (res.windowHeight * (750 / res.windowWidth)); //将高度乘以换算后的该设备的rpx与px的比例
                hei=height-118 +'rpx'
            }
        })
        return (
            <View className='classType'>
                <View className='scroll'>
                    <AtTabs
                    current={this.state.current}
                    scroll
                    height={hei}
                    tabDirection='vertical'
                    tabList={[
                        { title: '标签页1' },
                        { title: '标签页2' },
                    ]}
                    onClick={this.handleClick.bind(this)}>
                    <AtTabsPane tabDirection='vertical' current={this.state.current} index={0}>
                        <View className='ul'>
                            <View className='li'>
                                <Image></Image>
                                <View className='tit'>水果蔬菜</View>
                            </View>
                            <View className='li'>
                                    <Image></Image>
                                    <View className='tit'>水果蔬菜</View>
                            </View>
                            <View className='li'>
                                <Image></Image>
                                <View className='tit'>水果蔬菜</View>
                            </View>
                            <View className='li'>
                                <Image></Image>
                                <View className='tit'>水果蔬菜</View>
                            </View>
                        </View>
                    </AtTabsPane>
                    <AtTabsPane tabDirection='vertical' current={this.state.current} index={1}>
                        <View style='font-size:18px;text-align:center;height:100%;'>标签页二的内容</View>
                    </AtTabsPane>
                </AtTabs>
                </View>
                <Navs index='1'></Navs>
            </View>
        );
    }
}
 
export default Order;