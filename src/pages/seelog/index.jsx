import Taro, { Component } from '@tarojs/taro'
import { View, Text, Textarea } from '@tarojs/components'
import './index.less'
import $http from '@public/server'
class Seelog extends Component {
    config = {
        navigationBarTitleText: '物流'
    }
    constructor(props) {
        super(props);
        this.state = {
            track: {},
            len: this.$router.params.len * 1
        }
    }
    componentWillMount() {
        $http.get("account/order/track", { id: this.$router.params.id * 1 }).then(e => {
            this.setState({
                track: e.list
            })
        })
    }
    render() {
        let track = this.state.track, status = this.state.status;
        return (
            <View className='seelog'>
                {len >= 2 ? <View className='list'>
                    {track.map((ele, index) => {
                        return (
                            <View className='conbox cterbox' key={ele.no}>
                                <View className='name'>发货单{index + 1}</View>
                                <View className='li'>
                                    <View className='label'>物流公司</View>
                                    <Text>{ele.track_company}</Text>
                                </View>
                                <View className='li'>
                                    <View className='label'>物流单号</View>
                                    <Text>{ele.track_no}</Text>
                                </View>
                                {
                                    ele.product.map(element => {
                                        return (
                                            <View className='cter' key={element.num}>
                                                <Image mode='aspectFill' src={element.img[0]}></Image>
                                                <View className='rt'>
                                                    <View className='tit'>{element.title}</View>
                                                    <View className='ico'>{element.spec_title}</View>
                                                    <View className='num'>
                                                        ¥{element.money} <Text>X{element.num}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                    }
                </View> : <View className='conbox cterbox'>
                      {track[0].track_company && <View className='li'>
                            <View className='label'>物流公司</View>
                            <Text>{track[0].track_company}</Text>
                        </View>}
                        <View className='li'>
                            <View className='label'>物流单号</View>
                            <Text>{track[0].track_no}</Text>
                        </View>
                    </View>}
            </View>
        );
    }
}

export default Seelog;