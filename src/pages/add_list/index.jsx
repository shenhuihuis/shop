import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import "./index.less"
import $http from "@public/server"
import {setGlobalData,getGlobalData} from "@public/global_data"
class Add_list extends Component {
    config = {
        navigationBarTitleText: '我的地址'
    }
    constructor(props) {
        super(props);
        this.state = {
            type:0,     //0查看 1编辑 2新增
            list:[],
            load:false,
            goLink:this.$router.params.goLink
        }
    }
    componentWillMount() {
        $http.get("account/address").then(e=>{
            this.setState({
                list:e,
                load:true
            })
        })
    }
    addDetails = (e,ele) =>{
        ele.stopPropagation()
        Taro.redirectTo({url:e})
    }
    ckAdd = (ele) =>{
        let product=getGlobalData("product")
        product.address=ele;
        setGlobalData("product",product)
        Taro.redirectTo({url:this.state.goLink})
    }
    render() { 
        return ( 
            <View className='addlist'>
           { this.state.load && 
             <View className='list'>
                { this.state.list.length > 0 ?
                    <View className='main'>
                        <View className='ul'> 
                            {
                                this.state.list.map(ele=>{
                                    return (
                                        <View className='li' key={ele.id} onTap={this.ckAdd.bind(this,ele)}>
                                            <View className='lf'>
                                                <View className='tp'>
                                                    <View className='tit'>{ele.is_def&&<Text>默认</Text>}{ele.address_full}</View>
                                                </View>
                                                <View className='bot'>
                                                    <Text>{ele.contact}</Text>
                                                    <Text>{ele.tel}</Text>
                                                </View>
                                            </View>
                                            <View className='btn' onTap={this.addDetails.bind(this,"/pages/add_details/index?type=1&id="+ele.id+"&goLink="+this.state.goLink)}></View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <View className='bton'>
                            <View className='sub' onTap={this.addDetails.bind(this,"/pages/add_details/index?type=2&goLink="+this.state.goLink)}>新增地址</View>
                        </View>
                    </View>
                    :<View className='nobg'>
                        <View className='tit'>您还没有添加收货地址</View>
                        <View className='add' onTap={this.addDetails.bind(this,"/pages/add_details/index?type=2&goLink="+this.state.goLink)}>去添加</View>
                    </View>} 
                </View>}
            </View>
        );
    }
}
 
export default Add_list;