import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Navs from "./../../components/nav"
import './index.less'
import $http from '@public/server'
import {getGlobalData} from "@public/global_data"
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
        }
    }
    config = {
        navigationBarTitleText: '认证信息'
    }
    went=()=>{
        let info=this.state.info;
     //   Taro.redirectTo({url:'/pages/attes_ing/index?phone='+info.tel+"&type="+info.type})
         Taro.navigateTo({ url: '/pages/toattes/index'})
    }
    componentWillMount() {
        $http.get("account/audit").then(e => {
            e.status=Taro.getStorageSync("status")
            e.img3=e.imgs3.map(ele=>{
                return ele.url
            })
            e.img4=e.imgs2.map(ele=>{
                return ele.url
            })
            e.img1=e.imgs1.map(ele=>{
                return ele.url
            })
            this.setState({
                info: e
            })
        })
    }
    previewImage=(current,urls)=>{
        Taro.previewImage({
            current: current, // 当前显示图片的http链接
            urls:urls// 需要预览的图片http链接列表
        })
    }
    render() {
        let info = this.state.info
        return (
            <View className='attes'>
                <View className='tp'>
                    {info.status==3 && <View  className='ico okyico'>认证资料成功</View>}
                    {info.status==1 && <View  className="ico ingico">认证资料审核中</View>}
                    {info.status==2 && <View  className='ico'>认证资料失败</View>}
                    {info.status==2 && <View className='say'>{info.note}</View>}
                </View>
                <View className='list'>
                    {info.type == 2 && <View className='li'>
                        <View className='tit'>企业名称</View>
                        <View className='span'>{info.company_title}</View>
                    </View>}
                    {info.type == 2 && <View className='li'>
                        <View className='tit'>税号</View>
                        <View className='span'>{info.company_tax}</View>
                    </View>}
                    <View className='li'>
                        <View className='tit'>姓名</View>
                        <View className='span'>{info.real_name}</View>
                    </View>
                    {info.type == 1 && <View className='li'>
                        <View className='tit'>身份证号</View>
                        <View className='span'>{info.china_id}</View>
                    </View>}
                    <View className='li'>
                        <View className='tit'>联系电话</View>
                        <View className='span'>{info.tel}</View>
                    </View>
                   {info.status==2 &&  <View className='li'>
                        <View className='tit'>审核失败原因</View>
                        <View className='span'>{info.reason}</View>
                    </View>}
                </View>
                <View className='list'>
                    {info.type == 2 && <View className='smli'>
                        <View className='tit'>营业执照</View>
                        <View className='imgbox' onTap={this.previewImage.bind(this,info.img1[0],info.img1)}>
                            <Image mode='aspectFill' src={info.img1[0]}></Image>
                        </View>
                    </View>
                    }
                    <View className='smli'>
                        <View className='tit'>身份证正、反面</View>
                        <View className='imgbox'>
                            {info.img3.map((ele,index) => {
                                return (
                                    <Image mode='aspectFill' src={ele} onTap={this.previewImage.bind(this,ele,info.img3)}></Image>
                                )
                            })}
                        </View>
                    </View>
                    {
                        info.type == 2 && <View className='smli'>
                            <View className='tit'>相关许可证</View>
                            <View className='imgbox'>
                                {
                                    info.imgs2.map(ele=>{
                                        return (
                                           ele.type=="application/pdf"?<View className='pdf'></View>:<Image mode='aspectFill' key={ele.id} src={ele.url} onTap={this.previewImage.bind(this,ele.url,info.img4)}></Image>
                                        )
                                    })
                                }
                               
                            </View>
                        </View>
                    }
                </View>
                {info.status==2 && <View className='bton'>
                    <View className='sub' onTap={this.went.bind(this)}>再次认证</View>
                </View>}
            </View>
        );
    }
}

export default Order;