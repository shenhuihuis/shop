import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import Navs from "./../../components/nav"
import $http from "@public/server"
import './index.less'
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            current:0,
            category:[],
            status:0
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
    componentDidMount(){
        Taro.hideHomeButton()
    }
    componentDidShow(){
        $http.get("product/category").then(e=>{
            e.map(ele=>{
                ele.title=ele.title;
            })
            this.setState({                
                category:e
            })
            $http.get("account").then(user => {
                this.setState({
                  status:user.status,
                })
            })
        })
    }
    went=(id)=>{
        let status = this.state.status;
        if(status==3){
            Taro.navigateTo({url:"/pages/list/index?category_id="+id})
        }else if(status==0){
            Taro.navigateTo({ url: '/pages/toattes/index'})
        }else{
            Taro.navigateTo({ url: '/pages/attes/index' })
        }
      
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
                    tabList={this.state.category}
                    onClick={this.handleClick.bind(this)}>
                    {
                        this.state.category.map((element,index)=>{
                            return(
                                <AtTabsPane tabDirection='vertical' current={this.state.current} key={element.id}>
                                    <View className='ul'>
                                        {
                                            element.list.map(ele=>{
                                                return (
                                                    <View className='li' key={ele.id} onTap={this.went.bind(this,ele.id)}> 
                                                        <Image src={ele.img}></Image>
                                                        <View className='tit'>{ele.title}</View>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                </AtTabsPane>
                            )
                        })
                    }
                </AtTabs>
                </View>
                <Navs index='1'></Navs>
            </View>
        );
    }
}
 
export default Order;