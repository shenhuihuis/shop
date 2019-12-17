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
        Taro.redirectTo({url:'/pages/attes_ing/index?phone='+info.tel+"&type="+info.type})
    }
    componentWillMount() {
        $http.get("account/audit").then(e => {
            e.status=JSON.parse(getGlobalData("user")).status;
            this.setState({
                info: e
            })
        })
    }
    render() {
        let info = this.state.info
        return (
            <View className='attes'>
                <View className='tp'>
                    <View  className={`ico ${info.status==1?"ingico":""}}`}>{info.status==1?"认证资料审核中":'认证资料失败'}</View>
                    <View className='say'>{info.note}</View>
                </View>
                <View className='list'>
                    {info.type == 2 && <View className='li'>
                        <View className='tit'>企业名称</View>
                        <View className='span'>{info.company_title}</View>
                    </View>}
                    {info.type == 2 && <View className='li'>
                        <View className='tit'>税号</View>
                        <View className='span'>{info.company_taxcompany_tax}</View>
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
                </View>
                <View className='list'>
                    {info.type == 2 && <View className='smli'>
                        <View className='tit'>营业执照</View>
                        <View className='imgbox'>
                            <Image mode='aspectFill' src={info.imgs1[0]}></Image>
                        </View>
                    </View>
                    }
                    <View className='smli'>
                        <View className='tit'>身份证正、反面</View>
                        <View className='imgbox'>
                            {info.imgs3.map(ele => {
                                return (
                                    <Image mode='aspectFill' src={ele.url}></Image>
                                )
                            })}
                        </View>
                    </View>
                    {
                        info.type == 2 && <View className='smli'>
                            <View className='tit'>相关许可证</View>
                            <View className='imgbox'>
                            <Image mode='aspectFill' src={info.imgs2[0]}></Image>
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