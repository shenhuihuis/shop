import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import './index.less'
import Navs from "./../../components/nav"
import txt from "./../../assets/img/hangpin@2x.png"
import BUY from '../../components/buy'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
    }
  }
  config = {
    navigationBarTitleText: '首页'
  }
  put = (e) => {      //弹出购买
    this.setState({
      isOpened: e
    })
  }
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  render() {
    let isOpened=this.state.isOpened
    return (
      <View className={'index'}>
        <View class='find'>
          <i></i>
          <input type='text' placeholder='输入商品名称' />
        </View>
        <View className='banner'>
          <Swiper indicatorColor='#999' indicatorActiveColor='#333' circular autoplay>
            <SwiperItem>
              <Image mode="widthFix"></Image>
            </SwiperItem>
          </Swiper>
        </View>
        <View className='navbar'>
          <View className='li'>
            <View className='tit'>找商品</View>
            <View className='say'>不用下楼这里啥都有</View>
            <View className='i'></View>
          </View>
          <View className='li'>
            <View className='tit'>找物流</View>
            <View className='say'>不用出门直接送到家</View>
            <View className='i'></View>
          </View>
        </View>
        <View className='list'>
          <View className='h2'>
            <Image src={txt}></Image>
          </View>
          <View className='ul'>
            <View className='li'>
              <Image></Image>
              <View className='tit'>徐香猕猴桃1箱10斤单果70-90g当季包邮应季果整箱10斤包鲜果现摘现采</View>
              <View className='bot'>
                <View className='lf'>
                  <View className='money'><small>¥</small>49.9</View>
                  <View className='how'>销量：1039</View>
                </View>
                <View className='buy' onClick={this.put.bind(this, true)}></View>
              </View>
            </View>
            <View className='li'>
              <Image></Image>
              <View className='tit'>徐香猕猴桃1箱10斤单果70-90g当季包邮应季果整箱10斤包鲜果现摘现采</View>
              <View className='bot'>
                <View className='lf'>
                  <View className='money'><small>¥</small>49.9</View>
                  <View className='how'>销量：1039</View>
                </View>
                <View className='buy' onClick={this.put.bind(this, true)}></View>
              </View>
            </View>
          </View>
          {isOpened && <BUY handClose={this.put.bind(this)} />}
        </View>
        <Navs index='0'></Navs>
      </View>
    )
  }
}
