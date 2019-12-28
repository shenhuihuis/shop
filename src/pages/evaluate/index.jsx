import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import "./index.less"
import $http from '@public/server'
import hand from "./../../assets/img/hand.png"
class Add_list extends Component {
    config = {
        navigationBarTitleText: '评价列表',
        enablePullDownRefresh: true, 
        onReachBottomDistance:50
    }
    constructor(props) {
        super(props);
        this.state = {
            count:null,
            load:false,
            list:[],
            form:{
                product_id:this.$router.params.id*1,
                page:1,
                limit:8
            }
        }
    }
    componentWillMount(){
        this.getList()
    }
    previewImage=(current,urls)=>{
        Taro.previewImage({
            current: current, // 当前显示图片的http链接
            urls:urls// 需要预览的图片http链接列表
        })
    }
    onReachBottom(){
        if(this.state.list.length>=this.state.count) return false;
        else{
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
    onPullDownRefresh(){
        this.setState((preState) => {
            preState.load=false;
            preState.form.page=1;
            preState.list=[]    
        })
        Taro.pageScrollTo({
            scrollTop: 0,
        })
        setTimeout(e=>{
            this.getList()
            Taro.stopPullDownRefresh()
        },500)
       
    }
    getList=()=>{
        Taro.showLoading({
            title:"正在加载中",
            mask:true
        })
        $http.get("product/comment",this.state.form).then(e=>{
            this.setState({
                count:e.count,
                list:this.state.list.concat(e.list),
                load:true
            })
            Taro.hideLoading()
        })
    }
    render() {
        let list=this.state.list;
        return (
            <View className='list'>
                {
                    this.state.load && (this.state.count>0 && list.length>0?
                    list.map(ele=>{
                       return(
                            <View className='li' key={ele.id}>
                                <View className='had'>
                                    <Image mode='aspectFill' src={ele.account.img  || hand}></Image>
                                </View>
                                <View className='rt'>
                                    <View className='tp'>
                                        <View className='lf'>
                                            <View className='name'>{ele.account.name}</View>
                                            <View className='time'>{ele.created_at}</View>
                                        </View>
                                        <View className='sex'>
                                            {
                                                [1,2,3,4,5].map(element=>{
                                                    return (
                                                        <View key={element} className={`i ${element<=ele.star?"curi":""}`}></View>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                    <View className='say'>{ele.content}</View>
                                    <View className='pic'>
                                       {ele.imgs.map(element=>{
                                           return(
                                                <Image mode='aspectFill' src={element} key={element} onTap={this.previewImage.bind(this,element,ele.imgs)}></Image>
                                           )
                                       })}
                                    </View>
                                </View>
                            </View>
                       )
                    })    
                    :<View className='nobg'>暂无评论</View>)
                }
            </View>
        );
    }
}

export default Add_list;