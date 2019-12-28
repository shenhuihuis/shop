import Taro, { Component } from '@tarojs/taro'
import { View ,Text} from '@tarojs/components'
import './index.less'
import $http from "@public/server"
import WxParse from './../../components/wxParse/wxParse'
class AppealDetails extends Component {
    config = {
        navigationBarTitleText: '上传支付凭证',

    }
    constructor(props) {
        super(props);
        this.state = { 
            Imgurl: {
                imgs: ''
            },
            imgs: [null], //相关许可证件
            bank:null

        }
    }
    componentDidMount(){
        $http.get("app").then(e=>{
            this.setState({
                bank:e.bank
            })
        })
        $http.get("page/pay_intro").then(e=>{
            WxParse.wxParse('article', 'html', e.content, this.$scope, 5)
        })
    }
    sub=()=>{
        let params=this.$router.params;
        if(this.state.imgs[0]==null){
            Taro.showToast({
                title:"请上传支付凭证",
                icon:"none"
            })
            return false;
        }
        if(params.logid){           //物流
            $http.post("account/track/order/pay",{
                id:params.logid*1,
                imgs:this.state.imgs
            }).then(e=>{
                Taro.showToast({
                    title:'已上传凭证',
                    icon:"success"
                })
                Taro.navigateBack({
                    delta:1
                })
            })
        }else{
            $http.post("account/order/pay_up",{
                id:params.id*1,
                imgs:this.state.imgs
            }).then(e=>{
                Taro.showToast({
                    title:'已上传凭证',
                    icon:"success"
                })
                Taro.navigateBack({
                    delta:1
                })
            })
        }
    }
    del = (key, index, path) => {
        this.setState(preState => {
            preState.Imgurl[path] = '';
            preState[key][index] = null;
        });
    };
    changeAvatar = (key, index, path) => {
        let token = wx.getStorageSync("token"),
            _this = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            success: function (res) {
                Taro.showLoading({ title: '正在上传中' });
                var tempFilePaths = res.tempFilePaths;
                wx.uploadFile({
                    url: process.env.HOST + 'uploads', //里面填写你的上传图片服务器API接口的路径 
                    filePath: tempFilePaths[0], //要上传文件资源的路径 String类型 
                    name: 'file', //按个人情况修改，文件对应的 key,开发者在服务器端通过这个 key 可以获取到文件二进制内容，(后台接口规定的关于图片的请求参数)
                    header: {
                        "Content-Type": "multipart/form-data", //记得设置
                        Authorization: `Bearer ${token}`
                    },
                    success(e) {
                        let data = JSON.parse(e.data);
                        if (e.statusCode == 200) {
                            if (data.code == 1000) {
                                Taro.showToast({
                                    title: "上传成功",
                                    icon: 'none',
                                    duration: 1000
                                });
                                _this.setState(preState => {
                                    preState.Imgurl[path] = tempFilePaths[0];
                                    preState[key][index] = data.data[0].id;
                                });
                            } else {
                                Taro.showToast({
                                    title: data.msg,
                                    icon: 'none',
                                    duration: 1000
                                });
                            }
                        }
                        wx.hideLoading();
                    }
                });
            }
        });
    }
    render() { 
        return ( 
            <View className='logupload'>
                <View className='main'>
                    <View className='upload'>
                        {this.state.imgs[0] == null ? <View className="btn" onTap={this.changeAvatar.bind(this, "imgs", 0, "imgs")}>请上传支付凭证</View> : <View className="img">
                            <View class='at-icon at-icon-close-circle close'  onTap={this.del.bind(this, "imgs", 0, "imgs")}></View>
                            <Image mode="aspectFill" src={this.state.Imgurl.imgs}></Image>
                        </View>}
                    </View>
                    <View className='li'>
                        <View className='label'>收款账号</View>
                        <Text>{this.state.bank}</Text>
                    </View>
                    <View className='smli'>
                        <View className='label'>支付说明</View>
                        <view className='p'><import src='../../components/wxParse/wxParse.wxml' /><template is='wxParse' data='{{wxParseData:article.nodes}}' /></view>
                    </View>
                </View>
                <View className='bton'>
                    <View className='sub' onTap={this.sub.bind(this)}>确认上传</View>
                </View>
            </View>
        );
    }
}
 
export default AppealDetails;