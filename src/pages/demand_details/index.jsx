import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import './index.less'
import $http from '@public/server'
import WxParse from './../../components/wxParse/wxParse'
class Demand_Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company:{}
        }
    }
    config = {
        navigationBarTitleText: '供应商详情'
    }
    componentWillMount(){
        let id=this.$router.params.supplier_id
        $http.get("supplier/info",{id:id}).then(e=>{
            this.setState({
                company:e
            })
            WxParse.wxParse('article', 'html', e.intro, this.$scope, 5)
        })
    }
    collected = (favorite_id,id) => {
        let is_favorite = this.state.company.is_favorite,
            url = is_favorite ? "account/favorite/supplier/del" : "account/favorite/supplier";
       // let ids=favorite_id==0?id:favorite_id
        $http.post(url, { supplier_id:favorite_id}).then(e => {
            this.setState((preState) => {
                preState.company.is_favorite = !is_favorite;
            })
            Taro.showToast({
                title: is_favorite ? "已取消收藏" : "加入收藏",
                icon: 'none'
            })
        })
    }
    went=(id)=>{
        Taro.navigateTo({url:'/pages/demand/index?id='+id})
    }
    render() { 
        let company=this.state.company;
        return (
            <View className='demand_details'>
                <View className='tp'>
                    <View className='imgs'>
                        <Image src={company.img}  mode='aspectFill'></Image>
                    </View>
                    <View className='cter'>
                        <View className='tit'>{company.uname}</View>
                        <View className={`say ${company.role>=5?"i":""}`}>{company.role>=5?"物流供应":"商品供应"}</View>
                    </View>
                    <View className={`btn ${company.is_favorite ? "btned" : ""}`} onTap={this.collected.bind(this, company.favorite_id,company.id)}>{company.is_favorite?"已收藏":"收藏"}</View>
                </View>
                <View className='h2'>供应商简介</View>
                {<View className='say'>
                     <import src='../../components/wxParse/wxParse.wxml' /><template is='wxParse' data='{{wxParseData:article.nodes}}' />
                </View>}
                {
                    company.role>=5 && <View className='bton' onTap={this.went.bind(this,company.id)}>
                        <View className='sub'>提交需求</View>
                    </View>
                }
            </View>
        );
    }
}
 
export default Demand_Details;