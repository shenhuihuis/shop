import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import "./index.less"
import Order from "./order"
import Log from "./log"
class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    config = {
        navigationBarTitleText: '商品申诉记录'
    }
    componentDidMount(){
        wx.setNavigationBarTitle({
            title: '商品申诉记录' 
        })
    }
    render() { 
       
        return (  
            <View className='recordList'>
                {/*<Order></Order>*/}
                <Log></Log>
            </View>
        );
    }
}
 
export default Record;