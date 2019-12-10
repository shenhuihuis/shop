import Taro, { Component } from '@tarojs/taro'
import { View ,Text} from '@tarojs/components'
import './index.less'
class Delist extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            list:props.list
        }
    }
    hate=(ele,index,e)=>{
        e.stopPropagation()
        let list=this.state.list;
        $http.post("account/favorite/supplier/del",{
            supplier_id:ele.product_id,
        }).then(e=>{
            list=list.splice(index,0);
            this.setState({
                list:list
            })
        })
    }
    went = (id)=> {
        Taro.navigateTo({url:"/pages/demand_details/index?id="+id})
    }
    render() { 
        return ( 
           <View className='main'>
            {this.state.list.length==0?<View className='nobg'></View>:<View className='delist'>
                    {  
                    this.state.list.map((ele,index)=>{
                        return (
                            <View className='li' onTap={this.went.bind(this,ele.id)}>
                                <View className='lf'>
                                    <Image src={ele.img}  mode='aspectFill'></Image>
                                    <View className='tit'>{ele.uname}</View>
                                </View>
                                <View className='cancel' onTap={this.hate.bind(this,ele,index)}>取消收藏</View>
                            </View>
                        )
                    })
                    }
                </View>
            }
           </View>
        );
    }
}
 
export default Delist;