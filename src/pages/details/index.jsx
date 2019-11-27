import Taro, { Component } from '@tarojs/taro'
import { View, Text,Swiper, SwiperItem} from '@tarojs/components'
import './index.less'
class Demand_Details extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    config = {
        navigationBarTitleText: '商品详情'
    }
    render() { 
        return (
            <View className='details'>
                <View className='banner'>
                    <Swiper indicatorColor='#999' indicatorActiveColor='#333' circular autoplay>
                    <SwiperItem>
                        <Image mode="widthFix"></Image>
                    </SwiperItem>
                    </Swiper>
                </View>
                <View className='combox'>
                    <View className='tit'>越南进口高乐蜜芒果5斤装 单果200克起 香甜爽口细腻多汁</View>
                    <View className='price'>
                        <View className='money'>¥ <Text>49.9</Text></View>
                        <View className='xl'>销量：3645</View>
                    </View>
                    <View className='cter'>
                        <View className='htit'>商品评价(3)</View>
                        <View className='rt'>查看全部评价</View>
                    </View>
                    <View className='answer'>
                        <View className='top'>
                            <View className='lf'>
                                <Image></Image>
                                <View className='bname'>
                                    <View className='name'>Takahashi</View>
                                    <View className='time'>2019.11.06</View>
                                </View>
                            </View>
                            <View className='sex'>
                                <View className='i'></View>
                                <View className='i'></View>
                                <View className='i'></View>
                                <View className='i'></View>
                                <View className='i curi'></View>
                            </View>
                        </View>
                        <View className='say'>芒果非常新鲜，一箱5斤。大多都是7成熟，和苹果在一起放了两天几乎就熟透了，汁水多很甜。比超市的新鲜而且便宜。下次还会…</View>
                    </View>
                    <View class='gys'>
                        <Image></Image>
                        <View className='gystit'>供应商名称</View>
                    </View>
                    <View className='h2'>宝贝详情</View>
                    <View className='brown'>
                        <View className='dd'>原产地：越南</View>
                        <View className='dd'>储存条件：25度</View>
                        <View className='dd'>生产日期：2019.11.07</View>
                        <View className='dd'>保质期：2019.12.10</View>
                    </View>
                    <View className='de_say'></View>
                </View>
                <View className='sbtn'>
                    <View className='btn'>
                        <View className='a'>供应商</View>
                        <View className='a'>客服</View>
                        <View className='a'>收藏</View>
                    </View>
                    <View className='subbtn'>
                        <View className='a'>加入购物车</View>
                        <View className='a'>立即购买</View>
                    </View>
                </View>
            </View>
        );
    }
}
 
export default Demand_Details;