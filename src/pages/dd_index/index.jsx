import Taro, { Component } from '@tarojs/taro'
import { View, Text,ScrollView} from '@tarojs/components'
import "./index.less"
class Add_list extends Component {
    config = {
        navigationBarTitleText: '供应商详情'
    }
    constructor(props) {
        super(props);
        this.state = {  
            nav:[
                {tit:'默认',checked:true},
                {tit:'价格',checked:false,order:false},
                {tit:'销量',checked:false},
                {tit:'新品',checked:false}
            ]
        }
    }
    onScroll=()=>{

    }
    ck=(index)=>{
        let nav=this.state.nav;
        if(nav[index].checked && index==1){
             nav[index].order=!nav[index].order
        }else if(nav[index].checked){
            return false;
        }else{
            nav.map(e=>{
                e.checked=false
            })
            nav[1].order=false;
            nav[index].checked=true;
            
        }
        this.setState({
            nav:nav
        })
    }
    render() { 
        let hei;
        wx.getSystemInfo({
            success:function (res) {
                let height = (res.windowHeight * (750 / res.windowWidth)); //将高度乘以换算后的该设备的rpx与px的比例
                hei={height:height-258 +'rpx'}
            }
        })
        return ( 
           <View className='dd_index'>
             <View className='tp'>
                <View className='lf'>
                    <Image></Image>
                    <View className='cter'>
                        <View className='name'>供应商名称</View>
                        <View className='i'>详细资料</View>
                    </View>
                </View>
                <View className='btn btned'>收藏</View>
             </View>
             <View className='navs'>
                {
                    this.state.nav.map((e,index)=>{
                        return <View key={index} className={`a ${e.checked?"active":""}`}  onClick={this.ck.bind(this,index)}>
                            {e.tit}
                            {
                                index==1 &&  <View className='tab'>
                                    <View className={`up ${e.order ? "uact":""}`}></View>
                                    <View className={`down ${!e.order? "uact":""}`}></View>
                                </View> 
                            }
                        </View>
                    })
                }
            </View>
            <ScrollView className='list' scrollY scrollWithAnimation style={hei} lowerThreshold={30}  onScroll={this.onScroll}>
                <View className='li'>
                    <Image></Image>
                    <View className='tit'>香甜多汁现摘现发湖北纽荷尔脐橙5斤单果5</View>
                    <View className='bot'>
                        <View className='money'> 
                            <small>¥</small>68
                        </View>
                        <View className='span'>销量：1039</View>
                    </View>
                </View>
                <View className='li'>
                    <Image></Image>
                    <View className='tit'>橙5斤单果5</View>
                    <View className='bot'>
                        <View className='money'> 
                            <small>¥</small>68
                        </View>
                        <View className='span'>销量：1039</View>
                    </View>
                </View>
                <View className='li'>
                    <Image></Image>
                    <View className='tit'>香甜多汁现摘现发湖北纽荷尔脐橙5斤单果5</View>
                    <View className='bot'>
                        <View className='money'> 
                            <small>¥</small>68
                        </View>
                        <View className='span'>销量：1039</View>
                    </View>
                </View>
            </ScrollView>
           </View>
        );
    }
}
 
export default Add_list;