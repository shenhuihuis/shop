import Taro, { Component } from '@tarojs/taro'
import { View ,ScrollView} from '@tarojs/components'
import './index.less'
import $http from "@public/server"
class List extends Component {
    config = {
        navigationBarTitleText: '商品',
        enablePullDownRefresh: true, 
        onReachBottomDistance:50
    }
    constructor(props) {
        super(props);
        this.state = {  
            scrollTop:0,
            nav:[
                {tit:'默认',checked:true},
                {tit:'价格',checked:false,order:false},
                {tit:'销量',checked:false},
                {tit:'新品',checked:false}
            ],
            list:[],
            count:0,        //总数量
            form:{
                page:1,
                limit:10,
                search:'',          //搜索名
                price:1,            //价格 1降下 2生序
                sell:false,         //销量排行
                new:false,          //新品
                supplier_id:null
            }
        }
    }
    componentWillMount(){
        this.setState((preState)=>{
            preState.form.search=this.$router.params.sname;
        })
        
       
    }
    componentDidMount(){
        this.getList()
    }
    onScroll=()=>{

    }
    went = (e) =>{      //去商品详情
        Taro.navigateTo({url:"/pages/details/index?id="+e})
    }
    onPullDownRefresh(){
        this.setState((preState) => {
            preState.scrollTop=0;
            preState.form.page=1;
            preState.list=[]    
        })
        this.getList()
        Taro.stopPullDownRefresh()
    }
    ck=(index)=>{
        let nav=this.state.nav,form=this.state.form;
        form.page=1;
        if(nav[index].checked && index==1){
             nav[index].order=!nav[index].order
             form.price=nav[index].order?2:1;
        }else if(nav[index].checked){
            return false;
        }else{
            nav.map(e=>{
                e.checked=false
            })
            form.price=1;
            nav[1].order=false;
            nav[index].checked=true;
            form.sell=nav[2].checked?true:false;
            form.new=nav[3].checked?true:false;
        }
        this.setState({
            nav:nav,
            form:form
        })
        this.getList();
    }
    getList = () =>{
        $http.get("product",this.state.form).then(e=>{
            this.setState({
                count:e.count,
                list:e.list
            })
        })
    }
    seach = (e) =>{
        let form=this.state.form;
        this.setState((preState) => {
           preState.scrollTop=0;
           preState.form.page=1;
           preState.form.search=e.detail.value
        })
        Taro.showLoading({
            title: '搜索中',
        })
        setTimeout(e=>{
            Taro.hideLoading()
            this.getList();
        },1000)
       
    }
    render() { 
        let hei,list=this.state.list;
        wx.getSystemInfo({
            success:function (res) {
                let height = (res.windowHeight * (750 / res.windowWidth)); //将高度乘以换算后的该设备的rpx与px的比例
                hei={height:height-172 +'rpx'}
            }
        })
        return (
            <View classsName='contair'>
                <View className='tp'>
                    <View class='find'>
                        <Input type='text' placeholder='输入商品名称' confirm-type='search' onConfirm={this.seach.bind(this)} value={this.state.form.search}/>
                        <View className='ico'>
                            <View className='num'>3</View>
                        </View>
                    </View>
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
                {this.state.count>0 && list.length>0?<ScrollView className='list' scrollY scrollWithAnimation style={hei} lowerThreshold={30}  onScroll={this.onScroll} scrollTop={this.state.scrollTop}>
                        {
                            list.map(element=>{
                                return(
                                    <View className='li' key={element.id}  onTap={this.went.bind(this,element.id)}>
                                        <Image mode='aspectFill' src={element.img}></Image>
                                        <View className='tit'>{element.title}</View>
                                        <View className='bot'>
                                            <View className='money'> 
                                                <small>¥</small>{element.price || 0}
                                            </View>
                                            <View className='span'>销量：{element.sell_count || 0}</View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>:<View className='nobg'>暂无商品</View>
                }
            </View>
        );
    }
}
 
export default List;