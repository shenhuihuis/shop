import Taro, { Component } from '@tarojs/taro'
import { View ,Text} from '@tarojs/components'
import './index.less'
import $http from "@public/server"
class Logistics extends Component {
    config = {
        navigationBarTitleText: '找物流',
        navigationBarBackgroundColor: '#319F5F',
        navigationBarTextStyle:'white'
    }
    constructor(props) {
        super(props);
        this.state = { 
            page:1,
            list:[],
            count:0
         }
    }
    componentDidMount(){
        this.getList()
    }
    getList=()=>{
        $http.get("supplier",{
            type:1,
            page:this.state.page,
            limit:10
        }).then(e=>{
            this.setState({
                list:e.list,
                count:e.count
            })
        })
    }
    went=(url)=>{
        Taro.navigateTo({url:url})
    }
    render() { 
        
        return ( 
            <View className='logistics'>
                <View className='tp'> 
                    <View className='tit'>
                        找物流
                       <Text>不用出门直接送到家</Text> 
                    </View>
                    <View className='cbox'>
                        <View className='btn'  onTap={this.went.bind(this,"/pages/demand/index")}>填写物流需求</View>
                    </View>
                </View>
                <View className='htit'>优质供应商</View>
                {
                    this.state.count==0 ?<View className='nobg'>暂无供应商</View>:<View className='list'>
                       { this.state.list.map(e=>{
                            return (
                                <View className='li' key={e.id}>
                                    <View className='lf'>
                                        <Image  mode='aspectFill' src={e.img}></Image>
                                        <View className='name'>{e.uname}</View>
                                    </View>
                                    <View className='see' onTap={this.went.bind(this,"/pages/demand_details/index?id="+e.id)}>查看详情</View>
                                </View>
                            )
                        })}
                    </View>
                }
            </View>
        );
    }
}
 
export default Logistics;