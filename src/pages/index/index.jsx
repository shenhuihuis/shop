import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import './index.less'
import Navs from "./../../components/nav"
import txt from "./../../assets/img/hangpin@2x.png"
import BUY from '../../components/buy'
import $http from "@public/server"
import { setGlobalData, getGlobalData } from "@public/global_data"
import { AtModal, AtModalContent, AtModalAction } from "taro-ui";
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTop:false,      //回到顶部
      isOpened: false,    //购物车是否打开
      banner: [],
      list: [],
      count:null,
      status: 0,
      isLog: false,
      page:1,
      isshow:false    //联系
    }
  }
  config = {
    navigationBarTitleText: '首页',
  }
  
  componentWillMount() {
    // Taro.getSetting().then(res => {
    //   if(Object.keys(res.authSetting).length === 0 || !res.authSetting['scope.userInfo']){ // 用户信息无授权
    //     Taro.reLaunch({url:"/pages/log/index"})
    //   }else{ // 用户允许授权获取用户信息
    //     // 隐藏授权按钮
    //     // 获取用户信息
    //     this.getIndex()
    //   }
    // })
    // .catch(err => console.log(err))x
    this.getIndex()
  }
  toTop=()=>{
    wx.pageScrollTo({
      scrollTop: 0
    })
  }
  getIndex(){
    if (!Taro.getStorageSync("token")) {
      this.login()
    } else {
      this.init()
    }
  }
  login = () => {
    let _this = this;
    Taro.login().then(response => {
      if (response.code) {
        $http.post("wechat/login", { code: response.code }).then(e => {
          Taro.setStorageSync("token", e.token)
          _this.init()
        })
      } else {

      }
    })
  }
  toLink=(callback)=>{
    let status = this.state.status;
    if (status == 0) {
      this.setState({
        isshow:true
      })
      return false;
    }
    else if(status==3){
      callback()
    }
    else{
      Taro.navigateTo({ url: '/pages/attes/index' })
      return false
    }
  }
  toList = (e) => {      //去商品列表
    this.toLink(()=>{
      Taro.navigateTo({ url: "/pages/list/index" })
    })
  }
  went = (e) => {      //去商品详情
    this.toLink(()=>{
      Taro.navigateTo({ url: "/pages/details/index?id=" + e })
    })
  }
  seach = (e) => {   //搜索
    this.toLink(()=>{
      let sname = e.detail.value;
      Taro.navigateTo({ url: "/pages/list/index?sname=" + sname })
    })
  }
  buycar = (id) => {
    this.toLink(()=>{
      $http.get("product/info", { id: id }).then(e => {
        this.setState({
          details: e
        })
        this.put(true)
      })
    })
  }
  onPageScroll(e){
    let top=e.scrollTop,bool;
    if(top>400){
         bool=true;
    }else{
         bool=false;
    }
    this.setState({
         showTop:bool
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
    $http.get("app").then(e => {
      setGlobalData("tel", e.tell)
    })
    this.getList();
    $http.get("account").then(user => {
      this.setState({
        status:user.status,
        isLog: true
      })
      Taro.setStorageSync("status",user.status)
    })
    // $http.get("cart").then(e => {
    //   setGlobalData("car",e.length)
    // })
  }
  onReachBottom(){
    if(this.state.list.length>=this.state.count) return false;
    else{
        Taro.showLoading({
            title:"正在加载中",
            mask:true
        })
        let page=this.state.page;
        page=page+1
        this.setState((preState) => {
            preState.page=page;
            preState.showTop=true;
        })
        setTimeout(e=>{
            this.getList()
        },500)
    }
  }
  getList=()=>{
    let list=this.state.list;
    $http.get("product", { is_flag: true, limit: 10,page:this.state.page }).then(e => {
      this.setState({
        count:e.count,
        list: list.concat(e.list)
      })
      Taro.hideLoading()
    })
  }
  toDd = (e) => {     //物流   0前往认证 
   this.toLink(()=>{
    Taro.navigateTo({ url: '/pages/logistics/index' })
   })
  }
  handleConfirm=()=>{
    Taro.navigateTo({ url: '/pages/toattes/index'})
  }
  handleClose=()=>{
    this.setState({
      isshow:false
    })
  }
  render() {
    let isOpened = this.state.isOpened,  //是否开启购物车
      list = this.state.list,         //商品列表
      details = this.state.details;   //商品详情
    const banner = this.state.banner;  //banner
    return (
      <View className='index'>
      <AtModal isOpened={this.state.isshow} className='indexMol'>
         <View className='close'  onTap={this.handleClose.bind(this)}></View>
        <AtModalContent className='messcode'>您还未通过企业认证，无法进行下单等操作，可拨打平台服务电话或在个人中心进行认证</AtModalContent>
        <AtModalAction> <Button  open-type="contact" session-from="weapp" >联系平台</Button><Button className='gre' onTap={ this.handleConfirm.bind(this) }>立即认证</Button> </AtModalAction>
      </AtModal>
        {this.state.isLog && <View class='log'>
         {this.state.showTop && <View className='toTop' onTap={this.toTop.bind(this)}></View>}
          <View className='find'>
            <i></i>
            <Input type='text' placeholder='输入商品名称' confirm-type='search' onConfirm={this.seach.bind(this)} />
          </View>
          {
            this.state.banner.length > 0 &&
            <View className='banner'>
              <Swiper indicatorColor='#999' indicatorActiveColor='#333' circular autoplay>
                {
                  banner.map(e => {
                    return (
                      <SwiperItem key={e.id} onTap={this.went.bind(this, e.link*1)}>
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
                list.map(element => {
                  return (
                    <View className='li' key={element.id}>
                      <Image mode='aspectFill' src={element.img} onTap={this.went.bind(this, element.id)}></Image>
                      <View className='tit'>{element.title}</View>
                      <View className='bot'>
                        <View className='lf'>
                         {this.state.status==3?<View className='money'>
                            <small>¥</small>{element.price}
                          </View>:<View className='money'>***</View>}
                          <View className='how'>销量：{element.sell_count || 0}</View>
                        </View>
                        <View className='buy' onTap={this.buycar.bind(this, element.id)}></View>
                      </View>
                    </View>
                  )
                })
              }
            </View>
            {isOpened && <BUY handClose={this.put.bind(this)} info={{ specs: details.specs, price: details.price, type: 1, id: details.id, num: details.num_start }} />}
          </View>
          <Navs index='0'></Navs>
        </View>}
      </View>
    )
  }
}
