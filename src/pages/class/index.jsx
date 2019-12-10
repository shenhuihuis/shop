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
            category:[]
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
    componentWillMount(){
        $http.get("product/category").then(e=>{
            e.map(ele=>{
                ele.title=ele.Title;
            })
            this.setState({                
                category:e
            })
        })
    }
    went=(id)=>{
        Taro.navigateTo({url:'/pages/list/index?category_id='+id})
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
                                <AtTabsPane tabDirection='vertical' current={this.state.current} index={index}>
                                    <View className='ul'>
                                        {
                                            element.list.map(ele=>{
                                                return (
                                                    <View className='li' key={ele.ID} onTap={this.went.bind(this,ele.ID)}> 
                                                        <Image src={ele.img}></Image>
                                                        <View className='tit'>{ele.Title}</View>
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