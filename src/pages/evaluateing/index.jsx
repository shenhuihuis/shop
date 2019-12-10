import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import "./index.less"
import $http from '@public/server'
class Evalutaing extends Component {
    config = {
        navigationBarTitleText: '评价'
    }
    constructor(props) {
        super(props);
        this.state = {
            details:{}
        }
    }
    componentWillMount(){
        $http.get("account/order/info",{id:this.$router.params.id}).then(e=>{
            e.product.map(ele=>{
                ele.path=[];
                ele.imgs=[];
                ele.content=''
                ele.star=0;
            })
            this.setState({
                details:e
            })
        })
    }
    del=(index,ind)=>{
        let path=this.state.details.product[ind].path,imgs=this.state.details.product[ind].imgs;
        path.splice(index,1)
        imgs.splice(index,1)
        this.setState((preState)=>{
            preState.details.product[index].path=path;
            preState.details.product[index].imgs=imgs;
        })
    }
    changeAvatar = (index) => {
        let token = Taro.getStorageSync("token"), _this = this;
        let path=_this.state.details.product[index].path;
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
                                   preState.details.product[index].path=preState.details.product[index].path.concat(tempFilePaths[0])
                                   preState.details.product[index].imgs=preState.details.product[index].imgs.concat(data.data[0].id)
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
    toStar=(number,index)=>{
        console.log(number)
        this.setState(preState=>{
            preState.details.product[index].star=number;
        })
    }
    bindValue=(index,e)=>{
        this.setState(preState=>{
            preState.details.product[index].content=e.detail.value
        })
    }
    sub=()=>{
        let form=this.state.details;
        let newform=[]
        form.product.map(ele=>{
            newform.push(
                {
                    product_id:ele.product_id,
                    spec_id:ele.spec_id,
                    star:ele.star,
                    content:ele.content,
                    imgs:ele.imgs
                }
            )
        })
        Taro.showLoading({
            mask:true,
            title:"正在提交评论",
            icon:"none"
        })
        $http.post("account/order/comment",{id:this.$router.params.id*1,comment:newform}).then(e=>{
            Taro.redirectTo({
                url:"/pages/orderlist/index"
            })
            Taro.hideLoading()
        })
    }
    render() {
        let details=this.state.details;
        return (
            <View className='list'>
                {
                    details.product.map((ele,ind)=>{
                        return (
                            <View className='li' key={ele.product_id}>
                                <View className='tp'>
                                    <Image src={ele.img[0]} mode='aspectFill'></Image>
                                    <View className='name'>{ele.title}</View>
                                </View>
                                <View className='sex'>
                                    {
                                        [1,2,3,4,5].map(element=>{
                                            return (
                                                <View className={`i ${element<=ele.star?"act":""}`}  onTap={this.toStar.bind(this,element,ind)}></View>
                                            )
                                        })
                                    }
                                </View>
                                <Textarea placeholder='评价内容…' onInput={this.bindValue.bind(this,ind)}></Textarea>
                                <View className='imgbox'>
                                        {
                                            ele.path.map((ele,index)=>{
                                                return (
                                                    <View className='imgsbefor' key={ele} >
                                                        <View class='at-icon at-icon-close-circle close' onTap={this.del.bind(this,index,ind)}></View>
                                                        <Image src={ele}  mode='aspectFill'></Image>
                                                    </View>
                                                )
                                            })
                                        }
                                        {ele.imgs.length<3 && <View className='imgs' onTap={this.changeAvatar.bind(this,ind)}></View>}
                                    </View>
                            </View>
                        )
                    })
                }
                <View className='bton'>
                    <View className='sub' onTap={this.sub.bind(this)}>确认提交</View>
                </View>
            </View>
        );
    }
}

export default Evalutaing;