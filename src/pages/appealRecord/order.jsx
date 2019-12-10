import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import "./index.less"
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:props.list
        }
    }
    went=(id)=>{
      Taro.navigateTo({
          url:"/pages/appealDetails/index?id="+id +"&index=0"
      })
    }
    render() {
        return (
            <View className='record'>
                {
                    this.state.list.map(ele=>{
                        return (
                            <View className='li' key={ele.id}  onTap={this.went.bind(this,ele.id)}>
                                <View className='tp'>
                                    <View className='name'>订单号：{ele.order_no}</View>
                                    <View className='status'>{ele.status==1?"待处理":"已处理"}</View>
                                </View>
                                <View className='cter'>
                                    <Image src={ele.img} mode='aspectFill'></Image>
                                    <View className='rt'>
                                        <View className='tit'>{ele.product_title}</View>
                                        <View className='ico'>{ele.spec_title}</View>
                                        <View className='num'>
                                            ¥{ele.price} <Text>X{ele.num}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View className='bot'>
                                    <View className='btn'>
                                        <View className='a'>{ele.status==1?"撤销申诉":"申诉详情"}</View>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        );
    }
}

export default Order;