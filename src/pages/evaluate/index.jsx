import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import "./index.less"
class Add_list extends Component {
    config = {
        navigationBarTitleText: '评价列表'
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
                    <View className='had'>
                        <Image></Image>
                    </View>
                    <View className='rt'>
                        <View className='tp'>
                            <View className='lf'>
                                <View className='name'>马冬梅</View>
                                <View className='time'>2019.10.12 12：30</View>
                            </View>
                            <View className='sex'>
                                <View className='i'></View>
                                <View className='i'></View>
                                <View className='i'></View>
                                <View className='i'></View>
                                <View className='i curi'></View>
                            </View>
                        </View>
                        <View className='say'>芒果非常新鲜，一箱5斤。大多都是7成熟，和苹果在一起放了两天几乎就熟透了，汁水多很甜。比超市的新鲜而且便宜。</View>
                    </View>
                </View>
                <View className='li'>
                    <View className='had'>
                        <Image></Image>
                    </View>
                    <View className='rt'>
                        <View className='tp'>
                            <View className='lf'>
                                <View className='name'>马冬梅</View>
                                <View className='time'>2019.10.12 12：30</View>
                            </View>
                            <View className='sex'>
                                <View className='i'></View>
                                <View className='i'></View>
                                <View className='i'></View>
                                <View className='i'></View>
                                <View className='i curi'></View>
                            </View>
                        </View>
                        <View className='say'>芒果非常新鲜，一箱5斤。大多都是7成熟，和苹果在一起放了两天几乎就熟透了，汁水多很甜。比超市的新鲜而且便宜。</View>
                        <View className='pic'>
                            <Image></Image>
                            <Image></Image>
                            <Image></Image>
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}

export default Add_list;