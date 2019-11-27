import Taro, { Component } from '@tarojs/taro'
import { View ,ScrollView} from '@tarojs/components'
import './index.less'

import List from "./col_list"
import DList from "./delist"
class Collect extends Component {
    config = {
        navigationBarTitleText: '我的收藏'
    }
    constructor(props) {
        super(props);
        this.state = {  
            nav:[
                {tit:'商品',checked:true},
                {tit:'商品供应商',checked:false},
                {tit:'物流供应商',checked:false},
            ]
        }
    }
    onScroll=()=>{

    }
    ck=(index)=>{
        let nav=this.state.nav;
        if(nav[index].checked){
           return false;
        }
        nav.map(e=>{
            e.checked=false
        })
        nav[index].checked=true;
        this.setState({
            nav:nav
        })
    }
    render() { 
        let hei;
        wx.getSystemInfo({
            success:function (res) {
                let height = (res.windowHeight * (750 / res.windowWidth)); //将高度乘以换算后的该设备的rpx与px的比例
                hei={height:height-84 +'rpx'}
            }
        })
        return (
            <View classsName='contair'>
                <View className='navs'>
                    {
                        this.state.nav.map((e,index)=>{
                            return <View key={index} className={`a ${e.checked?"active":""}`}  onClick={this.ck.bind(this,index)}>
                                {e.tit}
                            </View>
                        })
                    }
                </View>
                <ScrollView className='list' scrollY scrollWithAnimation style={hei} lowerThreshold={30}  onScroll={this.onScroll}>
                    {/*<List></List>*/}
                    <DList/>
                </ScrollView>
            </View>
        );
    }
}
 
export default Collect;