import Taro, { Component } from '@tarojs/taro'
import { View ,Text} from '@tarojs/components'
import './index.less'
import $http from '@public/server'
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            list:props.list
        }
    }
    componentDidMount(props){
      
    }
    hate=(ele,index,e)=>{
        e.stopPropagation()
        let list=this.state.list;
        $http.post("account/favorite/product/del",{
            product_id:ele.product_id,
            spec_id:ele.spec_id
        }).then(e=>{
            list=list.splice(index,0);
            this.setState({
                list:list
            })
        })
    }
    went = (id)=> {
        Taro.navigateTo({url:"/pages/details/index?id="+id})
    }
    render() { 
        return ( 
            <View className='col_list'>
               {
                   this.state.list.length==0?<View className='nobg'></View>:
                   this.state.list.map((ele,index)=>{
                       return (
                        <View className='li' key={ele.id} onTap={this.went.bind(this,ele.id)}>
                            <Image src={ele.img}  mode='aspectFill'></Image>
                            <View className='tit'>{ele.title}</View>
                            <View className='bot'>
                                <View className='lf'>
                                    <View className='money'> 
                                        <small>¥</small>{ele.price || 0}
                                    </View>
                                    <View className='span'>销量：</View>
                                </View>
                                <View className='like' onTap={this.hate.bind(this,ele,index)}></View>
                            </View>
                        </View>
                       )
                   })
               }
            </View>
        );
    }
}
 
export default List;