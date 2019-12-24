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
            showTop:false,
            nav:[
                {tit:'默认',checked:true},
                {tit:'价格',checked:false,order:false},
                {tit:'销量',checked:false},
                {tit:'新品',checked:false}
            ],
            list:[],
            loading:false,
            carnum:0,
            count:null,        //总数量
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
            preState.form.category_id=this.$router.params.category_id
        })
        this.getCar();
       
    }
    getCar=()=>{
        $http.get("cart").then(e => {
            this.setState({
                carnum:e.length
            })
        })
    }
    componentDidMount(){
        this.getList()
    }
    onScroll=()=>{
        if(this.state.list.length>=this.state.count) return false;
        else{
            Taro.showLoading({
                title:"正在加载中",
                mask:true
            })
            let page=this.state.form.page;
            page=page+1
            this.setState((preState) => {
                preState.form.page=page;
            })
            setTimeout(e=>{
                this.getList()
            },500)
        }
    }
    went = (e) =>{      //去商品详情
        Taro.navigateTo({url:"/pages/details/index?id="+e})
    }
    onPullDownRefresh(){
        this.setState((preState) => {
            preState.scrollTop=0;
            preState.form.page=1;
            preState.list=[]    
            preState.loading=false;
        })
        setTimeout(e=>{
            this.getList()
            Taro.stopPullDownRefresh()
        },500)
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
            form:form,
            list:[],
            loading:false
        })
        Taro.showLoading({
            title:"正在加载中",
            mask:true
        })
        setTimeout(e=>{
            this.getList();
        },500)
    }
    getList = () =>{
        let list=this.state.list;
        let form=this.state.form;
        for(let val in form){
            if(form[val]==undefined || form[val]==null){
                delete form[val]
            }
        }
        $http.get("product",form).then(e=>{
            this.setState({
                loading:true,
                count:e.count,
                list:list.concat(e.list)
            })

            Taro.hideLoading()
        })
    }
    seach = (e) =>{
        let form=this.state.form;
        this.setState((preState) => {
           preState.scrollTop=0;
           preState.form.page=1;
           preState.loading=false;
           preState.list=[]
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
    scrolling=(e)=>{
       let top=e.detail.scrollTop,bool;
       if(top>400){
            bool=true;
       }else{
            bool=false;
       }
       this.setState({
            scrollTop:top,
            showTop:bool
       })
    }
    toTop=(e)=>{
        e.stopPropagation() 
        this.setState({
            scrollTop: 0
        })
    }
    tocar = () =>{
        Taro.navigateTo({url:"/pages/carlist/index"})
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
                {this.showTop && <View className='toTop' onTap={this.toTop.bind(this)}></View>}
                <View className='tp'>
                    <View class='find'>
                        <Input type='text' placeholder='输入商品名称' confirm-type='search' onConfirm={this.seach.bind(this)} value={this.state.form.search}/>
                        <View className='ico' onTap={this.tocar.bind(this)}>
                            {this.state.carnum>0 && <View className='num'>{this.state.carnum}</View>}
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
                {this.state.loading && (this.state.count>0 && list.length>0?<ScrollView enableBackToTop="true" className='list' scrollY  style={hei} lowerThreshold={30}  onScrolltolower={this.onScroll} onScroll={this.scrolling} scrollTop={this.state.scrollTop} ref='lists'>
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
                    </ScrollView>:<View className='nobg'>暂无商品</View>)
                }
            </View>
        );
    }
}
 
export default List;