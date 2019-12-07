import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Navs from "./../../components/nav"
import './index.less'
import $http from '@public/server'

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: null,
            phone: null,
            Imgurl: {
                imgs3_0: '',
                imgs3_1: '',
                imgs1: '',
                imgs2: ''
            },
            imgs1: [null], //营业执照
            imgs2: [null],//相关许可证件
            imgs3: [null, null],//身份证正反面
            reg: {
                realname: { zero: '请填写您的姓名' },
                company_tax:{zero:'请填写税号'},
                compnay_title:{zero:'请填写企业名称'},
                china_id: { reg: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/, mess: '请填写正确的身份证号', zero: '请填写身份证号' }
            },
            person: {
                china_id: '330282199307132212',
                realname: 'huihui',
            },
            company: {
                realname: '',
                company_tax: '',
                compnay_title: ''
            }
        }
    }
    config = {
        navigationBarTitleText: '认证'
    }
    componentWillMount() {
        let params = this.$router.params;
        this.setState({
            type: params.type * 1 || 2,
            phone: params.phone || "13454752770"
        })
    }
    bindValue = (key, e) => {
        this.setState((preState) => {
            if (this.state.type == 1) {
                preState.person[key] = e.detail.value
            } else {
                preState.company[key] = e.detail.value
            }
        })
    }
    del = (key, index, path) => {
        this.setState((preState) => {
            preState.Imgurl[path] = '';
            preState[key][index] = null;
        })
    }
    changeAvatar = (key, index, path) => {
        let token = Taro.getStorageSync("token"), _this = this;
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
                                    preState.Imgurl[path] = tempFilePaths[0];
                                    preState[key][index] = data.data[0].id
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
    sub = (e) => {
        const type = this.state.type;  //1个人 2企业
        let form;
        form = type == 1 ? this.state.person : this.state.company;
        Object.keys(form).map(e => {
            if (!form[e]) {
                Taro.showToast({
                    title: this.state.reg[e].zero,
                    icon: 'none',
                    duration: 1000
                })
                return false;
            }
            if (this.state.reg[e].reg && !this.state.reg[e].reg.test(form[e])) {
                Taro.showToast({
                    title: this.state.reg[e].mess,
                    icon: 'none',
                    duration: 1000
                })
                return false;
            }
        })
        if (this.state.imgs3[0] == null || this.state.imgs3[1] == null) {
            Taro.showToast({
                title: "请上传身份证",
                icon: 'none',
                duration: 1000
            })
            return false;
        }
        if (type == 2 && this.state.imgs1[0] == null) {
            Taro.showToast({
                title: "请上传营业执照",
                icon: 'none',
                duration: 1000
            })
            return false;
        }
        if (type == 2 && this.state.imgs2[0] == null) {
            Taro.showToast({
                title: "请上传相关许可证",
                icon: 'none',
                duration: 1000
            })
            return false;
        }
        form.type=type;
        form.tel=this.state.phone;
        Taro.showLoading({ title: '正在认证',mask:true })
        $http.post("account/audit",form).then(e=>{
            Taro.showToast({
                title: "已提交认证",
                icon: 'success',
                duration: 1000
            })
            Taro.redirectTo({url:'/pages/center/index'});
            Taro.hideLoading()
        })
    }
    render() {
        let type = this.state.type
        return (
            <View className='attes'>
                <View className='list'>
                    <View className='li'>
                        <View className='tit'>认证类型</View>
                        <View className='span'>{this.state.type == 1 ? "个人" : "企业"}</View>
                    </View>
                    {
                        type == 2 &&
                        <View className='li'>
                            <View className='tit'>企业名称</View>
                            <View className='span'>
                                <Input placeholder='请填写企业名称' onChange={this.bindValue.bind(this, "compnay_title")} value={this.state.company.compnay_title} ></Input>
                            </View>
                        </View>
                    }
                    {
                        type == 2 &&
                        <View className='li'>
                            <View className='tit'>税号</View>
                            <View className='span'>
                                <Input placeholder='请填写统一社会信用代码' onChange={this.bindValue.bind(this, "company_tax")} value={this.state.company.company_tax} ></Input>
                            </View>
                        </View>
                    }
                    <View className='li'>
                        <View className='tit'>姓名</View>
                        <View className='span'>
                            {
                                type == 1 ? <Input placeholder='请填写您的姓名' onChange={this.bindValue.bind(this, "realname")} value={this.state.person.realname} ></Input> :
                                    <Input placeholder='请填写您的姓名' onChange={this.bindValue.bind(this, "realname")} value={this.state.company.realname} ></Input>
                            }
                        </View>
                    </View>
                    {type == 1 && <View className='li'>
                        <View className='tit'>身份证号</View>
                        <View className='span'>
                            <Input placeholder='请填写您的身份证号' onChange={this.bindValue.bind(this, "china_id")} value={this.state.person.china_id} ></Input>
                        </View>
                    </View>}
                    <View className='li'>
                        <View className='tit'>联系电话</View>
                        <View className='span'>{this.state.phone}</View>
                    </View>
                </View>
                <View className='htit'>更多信息(选填)</View>
                <View className='list'>
                    <View className='smli'>
                        <View className='tit'>身份证正、反面</View>
                        <View className='imgbox'>
                            {
                                this.state.imgs3[0] == null ? <View className='imgs' onTap={this.changeAvatar.bind(this, "imgs3", 0, "imgs3_0")}>上传人像面</View> :
                                    <View className='imgsbefor'>
                                        <View class='at-icon at-icon-close-circle close' onTap={this.del.bind(this, "imgs3", 0, "imgs3_0")}></View>
                                        <Image src={this.state.Imgurl.imgs3_0}  mode='aspectFill'></Image>
                                    </View>
                            }
                            {
                                this.state.imgs3[1] == null ? <View className='imgs' onTap={this.changeAvatar.bind(this, "imgs3", 1, "imgs3_1")}>上传国徽面</View> :
                                    <View className='imgsbefor'>
                                        <View class='at-icon at-icon-close-circle close' onTap={this.del.bind(this, "imgs3", 1, "imgs3_1")}></View>
                                        <Image src={this.state.Imgurl.imgs3_1}  mode='aspectFill'></Image>
                                    </View>
                            }
                        </View>
                    </View>
                    {
                        type == 2 &&
                        <View className='smli'>
                            <View className='tit'>营业执照</View>
                            <View className='imgbox'>
                                {
                                    this.state.imgs1[0] == null ? <View className='imgs' onTap={this.changeAvatar.bind(this, "imgs1", 0, "imgs1")}>上传营业执照</View> :
                                        <View className='imgsbefor'>
                                            <View class='at-icon at-icon-close-circle close' onTap={this.del.bind(this, "imgs1", 0, "imgs1")}></View>
                                            <Image mode='aspectFill'  src={this.state.Imgurl.imgs1}></Image>
                                        </View>
                                }
                            </View>
                        </View>
                    }
                    {
                        type == 2 &&
                        <View className='smli'>
                            <View className='tit'>相关许可证</View>
                            <View className='imgbox'>
                                {
                                    this.state.imgs2[0] == null ? <View className='imgs' onTap={this.changeAvatar.bind(this, "imgs2", 0, "imgs2")}>上传相关许可证</View> :
                                        <View className='imgsbefor'>
                                            <View class='at-icon at-icon-close-circle close' onTap={this.del.bind(this, "imgs2", 0, "imgs2")}></View>
                                            <Image mode='aspectFill' src={this.state.Imgurl.imgs2}></Image>
                                        </View>
                                }
                            </View>
                        </View>
                    }
                </View>
                <View className='bton'>
                    <View className='sub' onTap={this.sub.bind(this)}>确认提交</View>
                </View>
            </View>
        );
    }
}

export default Order;