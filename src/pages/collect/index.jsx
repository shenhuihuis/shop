import Taro, { Component } from '@tarojs/taro'
import { View ,ScrollView} from '@tarojs/components'
import './index.less'
import List from "./col_list"
import DList from "./delist"
import $http from "@public/server"
class Collect extends Component {
    config = {
        navigationBarTitleText: '我的收藏'
    }
    constructor(props) {
        super(props);
        this.state = {  
            nav:[
                {tit:'商品',url:'account/favorite/product'},
                {tit:'商品供应商',url:'account/favorite/supplier'},
                {tit:'物流供应商',url:'account/favorite/supplier'},
            ],
            list:[],
            page:1,
            current:0,
            loading:false
        }
    }
    onScroll=()=>{

    }
    componentDidMount=()=>{
        this.init(0)
    }
    init=(type)=>{          //0 收藏商品  //1商品供应商   //
       let url=this.state.nav[type].url;
       let form={
            page:this.state.page,
            limit:10
      }
      if(type==1){
          form.type=2;
      }
      if(type==2){
          form.type=1;
      }
       $http.get(url,form).then(e=>{
           let list=this.state.list;
           list=list.concat(e.list)
           this.setState({
               list:list,
               loading:true
           })
       })
    }
    ck=(index)=>{
        let nav=this.state.nav;
        if(index==this.state.current){
           return false;
        }
        this.setState({
            current:index,
            list:[],
            page:1,
            loading:false
        })
        this.init(index)
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
                            return <View key={index} className={`a ${this.state.current==index?"active":""}`}  onClick={this.ck.bind(this,index)}>
                                {e.tit}
                            </View>
                        })
                    }
                </View>
                <ScrollView className='list' scrollY scrollWithAnimation style={hei} lowerThreshold={30}  onScroll={this.onScroll}>
                    {   
                        this.state.loading && (this.state.current==0?<List list={this.state.list}/>:<DList list={this.state.list}/>)
                        
                    }
                </ScrollView>
            </View>
        );
    }
}
 
export default Collect;