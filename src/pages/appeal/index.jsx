import Taro, { Component } from '@tarojs/taro'
import { View ,Text} from '@tarojs/components'
import './index.less'
import $http from '@public/server'
class Appeal extends Component {
    config = {
        navigationBarTitleText: '申诉'
    }
    constructor(props) {
        super(props);
        this.state = { 
            info:{},
            form:{
                contact:'',
                tel:'',
                info:''
            },
            order_id:null,
            path:[],
            imgs:[]
        }
    }
    componentWillMount (){
        this.init()
    }
    sub=()=>{
        let info=this.state.info,form=this.state.form;
        if(!form.contact){
            Taro.showToast({
                title:"请填写联系人姓名",
                icon:"none"
            })
            return false;
        }
        if(!form.tel){
            Taro.showToast({
                title:"请填写联系人手机号",
                icon:"none"
            })
            return false;
        }
        if(!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(form.tel)){
            Taro.showToast({
                title:"请填写正确的手机号",
                icon:"none"
            })
            return false;
        }
        if(this.state.order_id==null){
            let newform={
                order_id:this.$router.params.id * 1,
                product_id:info.product_id,
                spec_id:info.spec_id,
                num:info.num,
                contact:form.contact,
                tel:form.tel,
                info:form.info,
                imgs:this.state.imgs
            }
            
            $http.post('account/order/appeal',newform).then(e=>{
                Taro.showToast({
                    title:"申诉成功",
                    icon:"success"
                })
                Taro.redirectTo({
                    url:"/pages/order_detalis/index?id="+this.$router.params.id
                })
            })  
        }else{
            let newform={
                order_id:this.state.order_id,
                contact:form.contact,
                tel:form.tel,
                info:form.info,
                imgs:this.state.imgs
            }
            $http.post('account/track/appeal',newform).then(e=>{
                Taro.showToast({
                    title:"申诉成功",
                    icon:"success"
                })
                Taro.redirectTo({
                    url:"/pages/logdetails/index?id="+this.state.order_id
                })
            })  
        }
    }
    init=()=>{
        let params=this.$router.params;
        if(params.id){
            $http.get("account/order/info",{id:params.id}).then(e=>{
                this.setState({
                    info:e.product[params.index*1]
                })
            })
        }else{
            this.setState({
                order_id:params.order_id*1
            })
        }
    }
    bindValue=(key,e)=>{
        this.setState(prestate=>{
            prestate.form[key]=e.detail.value
        })
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
    render() { 
        let info=this.state.info
        return ( 
            <View className='appeal'>
              {this.state.order_id==null && <View className='conbox cterbox'>
                    <View className='cter'>
                        <Image src={info.img[0]} mode='aspectFill'></Image>
                        <View className='rt'>
                            <View className='tit'>{info.title}</View>
                            <View className='ico'>{info.spec_title}</View>
                            <View className='num'>
                                ¥{info.price} <Text>X{info.num}</Text>
                            </View>
                        </View>
                    </View>
                </View>}
                <View className='conbox cterbox'>
                    <View className='li'>
                        <View className='label'>联系人</View>
                        <Input placeholder='填写联系人姓名' onChange={this.bindValue.bind(this,"contact")}></Input>
                    </View>
                    <View className='li'>
                        <View className='label'>联系方式</View>
                        <Input placeholder='请填写联系人电话'  onChange={this.bindValue.bind(this,"tel")}></Input>
                    </View>
                    <View className='smli'>
                        <View className='label'>详细描述</View>
                        <Input placeholder='补充详细信息…'  onChange={this.bindValue.bind(this,"info")}></Input>
                    </View>
                </View>
                <View className='conbox imgput'>
                    <View className='smli'>
                        <View className='label'>上传图片</View>
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
                    </View>
                </View>
                <View className='bton'>
                    <View className='sub' onTap={this.sub.bind(this)}>确认提交</View>
                </View>
            </View>
        );
    }
}
 
export default Appeal;