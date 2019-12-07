import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import "./index.less"
import $http from "@public/server"
class Hotline extends Component {
    config = {
        navigationBarTitleText: '投诉与建议'
    }
    constructor(props) {
        super(props);
        this.state = {
            path:[],
            imgs:[],
            content:''
        }
    }
    componentWillMount () {

    }
    del=(index)=>{
        let path=this.state.path,imgs=this.state.imgs;
        path.splice(index,1)
        imgs.splice(index,1)
        this.setState((preState)=>{
            preState.path=path;
            preState.imgs=imgs
        })
    }
    sub=(e)=>{
        if(!this.state.content){
            Taro.showToast({
                title: "请填写投诉理由或者建议",
                icon: 'none',
                mask:true
            })
            return false;
        }
        $http.post("issues",{
            imgs:this.state.imgs,
            content:this.state.content
        }).then(e=>{
            Taro.showToast({
                title: "感谢您的反馈",
                icon: 'success',
                mask:true
            })
            Taro.redirectTo({
                url:"/pages/about/index"
            })
        })
    }
    changeAvatar = (e) => {
        let token = Taro.getStorageSync("token"), _this = this;
        let path=_this.state.path;
        wx.chooseImage({
            count: 1,// 默认9
            sizeType: ['compressed'],// 可以指定是原图还是压缩图，默认二者都有
            success: function (res) {
                Taro.showLoading({ title: '正在上传中', })
                var tempFilePaths = res.tempFilePaths;
                wx.uploadFile({
                    url: process.env.HOST + 'uploads', //里面填写你的上传图片服务器API接口的路径 
                    filePath: tempFilePaths[0],//要上传文件资源的路径 String类型 
                    name: 'file',//按个人情况修改，文件对应的 key,开发者在服务器端通过这个 key 可以获取到文件二进制内容，(后台接口规定的关于图片的请求参数)
                    header: {
                        "Content-Type": "multipart/form-data",//记得设置
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
                                })
                                _this.setState((preState) => {
                                   preState.path=preState.path.concat(tempFilePaths[0])
                                   preState.imgs=preState.imgs.concat(data.data[0].id)
                                })
                            } else {
                                Taro.showToast({
                                    title: data.msg,
                                    icon: 'none',
                                    duration: 1000
                                })
                            }
                        }
                        wx.hideLoading()
                    }
                })

            }
        })
    }
    bindValue=(e)=>{
        console.log(e)
        this.setState({
            content: e.detail.value
        })
    }
    render() {
        return (
            <View className='hotline'>
                <Textarea placeholder='对我们的商品、服务，您有什么建议吗？您还想要在我们平台上买到什么？请告诉我们…' onInput={this.bindValue.bind(this)} value={this.state.content}></Textarea>
                <View className='imgbox'>
                    {
                        this.state.path.map((ele,index)=>{
                            return (
                                <View className='imgsbefor' key={ele} >
                                    <View class='at-icon at-icon-close-circle close' onTap={this.del.bind(this,index)}></View>
                                    <Image src={ele}  mode='aspectFill'></Image>
                                </View>
                            )
                        })
                    }
                    {this.state.imgs.length<3 && <View className='imgs' onTap={this.changeAvatar.bind(this)}></View>}
                  
                </View>
                <View className='bton'>
                    <View className='sub' onTap={this.sub.bind(this)}>确认提交</View>
                </View>
            </View>
        );
    }
}

export default Hotline;