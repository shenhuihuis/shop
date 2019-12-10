import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import './index.less'
import Navs from "./../../components/nav"
import txt from "./../../assets/img/hangpin@2x.png"
import BUY from '../../components/buy'
import $http from "@public/server"
import {setGlobalData,getGlobalData} from "@public/global_data"
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      banner: [],
      list:[],
      user:{}
    }
  }
  config = {
    navigationBarTitleText: '首页'
  }
 
  componentWillMount() {
    let _this=this;
    Taro.checkSession({
      success(){
        _this.init()
        
        return Taro.getStorageSync("token");
        
      },
      fail() {
        return Taro.login().then(response => {
          if (response.code) {
            $http.post("wechat/login", { code: response.code }).then(e => {
              Taro.setStorageSync("token",e.token)
              $http.get("account").then(user=>{
                Taro.setStorageSync("user",JSON.stringify(user))
                setGlobalData("user",JSON.stringify(user))
              })
              _this.init()
            })
          } else {

          }
        }).catch(err => {
          Taro.showToast({
            title: '发生错误，请重试!',
            icon: 'none'
          })
        })
      }
    })

  }
  toList= (e) =>{      //去商品列表
    Taro.navigateTo({url:"/pages/list/index"})
  }
  went = (e) =>{      //去商品详情
    Taro.navigateTo({url:"/pages/details/index?id="+e})
  }
  seach = (e) =>{   //搜索
    let sname=e.detail.value;
    Taro.navigateTo({url:"/pages/list/index?sname="+sname})
  }
  componentDidMount() { 
   
  }
  buycar =(id)=>{
    $http.get("product/info",{id:id}).then(e=>{
      this.setState({
        details:e
      })
      this.put(true)
    })
  }
  put = (e) => {      //弹出购买
    this.setState({
      isOpened: e
    })
  }
  init = () => {
    $http.get("banner").then(e => {
      this.setState({
        banner: e
      })
    })
    $http.get("product",{sell:true}).then(e=>{
      this.setState({
        list:e.list
      })
    })
    $http.get("app").then(e=>{
        setGlobalData("tel",e.tell)
    })
    this.setState({
      user:JSON.parse(Taro.getStorageSync("user")) || JSON.parse(getGlobalData("user")) //用户信息
    })
  }
  toDd=(e)=>{     //物流   0前往认证 
    let status=this.state.user.status;
    if(status==0){
      wx.showModal({
        title: '',
        cancelText:'联系平台',
        confirmText:'立即认证',
        content: '您还未通过企业认证，无法进行下单等操作，可拨打平台服务电话或在个人中心进行认证',
        success (res) {
          if (res.confirm) {      //前往认证
              Taro.navigateTo({url:'/pages/toattes/index'})
          } else if (res.cancel) {
             console.log('用户点击取消')
          }
        }
      })
    }
    if(status==3){
      Taro.navigateTo({url:'/pages/logistics/index'})
    }
  }
  render() {
    let isOpened = this.state.isOpened,  //是否开启购物车
        list=this.state.list,         //商品列表
        details=this.state.details;   //商品详情
    const banner = this.state.banner;  //banner
    return (
      <View className={'index'}>
        <View className='find'>
          <i></i>
          <Input type='text' placeholder='输入商品名称'  confirm-type='search' onConfirm={this.seach.bind(this)}  />
        </View>
        {
          this.state.banner.length > 0 &&
          <View className='banner'>
            <Swiper indicatorColor='#999' indicatorActiveColor='#333' circular autoplay>
              {
                banner.map(e => {
                  return (
                    <SwiperItem key={e.id}>
                      <Image mode="widthFix" src={e.img}></Image>
                    </SwiperItem>
                  )
                })
              }
            </Swiper>
          </View>
        }
        <View className='navbar'>
          <View className='li' onTap={this.toList.bind(this)}>
            <View className='tit'>找商品</View>
            <View className='say'>不用下楼这里啥都有</View>
            <View className='i'></View>
          </View>
          <View className='li' onTap={this.toDd.bind(this)}>
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
             {
               list.map(element=>{
                 return (
                  <View className='li'  key={element.id}>
                    <Image mode='aspectFill' src={element.img}  onTap={this.went.bind(this,element.id)}></Image>
                    <View className='tit'>{element.title}</View>
                    <View className='bot'>
                      <View className='lf'>
                        <View className='money'><small>¥</small>{element.price || 0}</View>
                        <View className='how'>销量：{element.sell_count || 0}</View>
                      </View>
                      <View className='buy' onTap={this.buycar.bind(this,element.id)}></View>
                    </View>
                  </View>
                 )
               })
             }
          </View>
          {isOpened && <BUY handClose={this.put.bind(this)} info={{specs:details.specs,price:details.price,type:1,id:details.id,num:details.num_start}} />}
        </View>
        <Navs index='0'></Navs>
      </View>
    )
  }
}
