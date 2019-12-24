import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import "./index.less"
import $http from "@public/server"
import { AtActionSheet, AtActionSheetItem } from "taro-ui"
class Company extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type:props.type,
            Imgurl: {
                imgs1: '',
                imgs4: '',
                imgs2: []
            },
            imgs2: [], //相关许可证件
            imgs1: [null], //营业执照	
            imgs4: [null], //开户卡 
            reg: {
                company_title:{zero: '请填写企业名称' },
                real_name: { zero: '请填写您的姓名' },
                fields: { zero: '请填写熟悉领域' },
                company_tax	:{zero: '请填写统一社会信用代码' },
                company_address: { zero: '请填写供应商联系地址' },
                bank_name: { zero: '请填写开户银行' },
                bank_user: { zero: '请填写持卡人姓名' },
                bank_id: { zero: '请填写银行卡号' },
            },
            form: {
                company_title:'',
                tel: props.tel,
                real_name: '',
                fields: '',
                company_tax: '',
                company_address:'',
                bank_id: '',
                bank_user: '',
                bank_name: '',
            },  
        }
    }
    componentWillMount () {

    }
    bindValue = (key, e) => {
        this.setState(preState => {
            preState.form[key] = e.detail.value;
        });
    }
    del = (key, index, path) => {
        this.setState(preState => {
            let imgs=preState.Imgurl[path],keys=preState[key];
            if(key=="imgs2"){
                imgs.splice(index,1);
                keys.splice(index,1);
            }else{
                imgs=null;
                keys=[null]
            }
            preState.Imgurl[path]=imgs
            preState[key]=keys;
        });
    }
    success=(key, index, path,res)=>{
            Taro.showLoading({ title: '正在上传中' });
            let file=res.tempFiles,_this=this, token = wx.getStorageSync("token")

            wx.uploadFile({
                url: process.env.HOST + 'uploads', //里面填写你的上传图片服务器API接口的路径 
                filePath: file[0].path, //要上传文件资源的路径 String类型 
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
                                if(key=="imgs2"){
                                    if(file[0].type=="file"){
                                        preState.Imgurl[path] = preState.Imgurl[path].concat("pdf");
                                    }
                                    else{
                                        preState.Imgurl[path] = preState.Imgurl[path].concat(file[0].path);
                                    }
                                    preState[key]=preState[key].concat(data.data[0].id);
                                }else{
                                    preState.Imgurl[path] = file[0].path;
                                    preState[key][index] = data.data[0].id;
                                }
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
    changeAvatar = (key, index, path) => {
        let _this = this;
        if (key == "imgs2") {
                wx.chooseMessageFile({
                    type: "file",
                    count: 1,
                    success: (res) => {
                        _this.success(key, index, path, res)
                    }
                })
            }else{
                wx.chooseImage({
                    count: 1,// 默认9
                    sizeType: ['compressed'],// 可以指定是原图还是压缩图，默认二者都有
                    success: (res) => {
                        _this.success(key, index, path, res)
                    }
                })
        }
    }
    onSubmit = (e) => {
        const type = this.state.type; //3 商品 5物流
        let form=this.state.form,reg=this.state.reg;
        for(let val in reg){
            if (!form[val]) {
                Taro.showToast({
                    title: reg[val].zero,
                    icon: 'none',
                    duration: 1000
                });
                return false;
            }
        };
        if (this.state.imgs4[0] == null) {
            Taro.showToast({
              title: "请上传开户许可证",
              icon: 'none',
              duration: 1000
            });
            return false;
        }
        if (this.state.imgs1[0] == null) {
            Taro.showToast({
              title: "请上传营业执照",
              icon: 'none',
              duration: 1000
            });
            return false;
          }
          if (this.state.imgs2[0] == null) {
            Taro.showToast({
              title: "请上传相关许可证",
              icon: 'none',
              duration: 1000
            });
            return false;
          }
          form.tel=form.tel.toString();
          form.imgs2=this.state.imgs2
          form.imgs1=this.state.imgs1
          form.imgs4=this.state.imgs4
          form.type=this.state.type;
          Taro.showLoading({
            mask:true,
            title:"供应商入驻信息正在提交"
         })
          $http.post("account/supplier",form).then(e=>{
            Taro.redirectTo({
               url:"/pages/settledIn/index"
            })
            Taro.hideLoading()
          })
    }
    render() {
        return (
            <View className='form'>
                <View className='formson'>
                    <View className='li'>
                        <View className='label'>企业名称</View>
                        <Input placeholder='请填写企业名称'  type='text'  onChange={this.bindValue.bind(this, "company_title")} value={this.state.form.company_title}></Input>
                    </View>
                    <View className='li'>
                        <View className='label'>联系人</View>
                        <Input placeholder='请输入联系人'  type='text'  onChange={this.bindValue.bind(this, "real_name")} value={this.state.form.real_name}></Input>
                    </View>
                    <View className='li'>
                        <View className='label'>联系电话</View>
                        <Input placeholder='请输入联系电话' type='text' value={this.state.form.tel} disabled></Input>
                    </View>
                    <View className='htit'>熟悉领域</View>
                    <Input className='txt' placeholder='请填写您的经营范围或熟悉领域等 …' onChange={this.bindValue.bind(this, "fields")} value={this.state.form.fields}></Input>
                </View>
                <View className='h2'>资质证照</View>
                <View className='formson'>
                    <View className='li'>
                        <View className='label'>税号</View>
                        <Input placeholder='请填写统一社会信用代码'  type='text' onChange={this.bindValue.bind(this, "company_tax")} value={this.state.form.company_tax}></Input>
                    </View>
                    <View className='li'>
                        <View className='label'>地址</View>
                        <Input placeholder='请填写供应商联系地址'  type='text' onChange={this.bindValue.bind(this, "company_address")} value={this.state.form.company_address}></Input>
                    </View>
                    <View className='li'>
                        <View className='label'>开户行</View>
                        <Input placeholder='请填写开户行银行'  type='text' onChange={this.bindValue.bind(this, "bank_name")} value={this.state.form.bank_name}></Input>
                    </View>
                    <View className='li'>
                        <View className='label'>持卡人</View>
                        <Input placeholder='请填写开户人姓名'  type='text'  onChange={this.bindValue.bind(this, "bank_user")} value={this.state.form.bank_user}></Input>
                    </View>
                    <View className='li'>
                        <View className='label'>银行卡号</View>
                        <Input placeholder='请填写银行卡号'  type='text' type='text' onChange={this.bindValue.bind(this, "bank_id")} value={this.state.form.bank_id}></Input>
                    </View>
                    <View className='smli'>
                        <View className='tit'>开户许可证</View>
                        <View className="imgbox">
                        {this.state.imgs4[0] == null ? <View className="imgs" onTap={this.changeAvatar.bind(this, "imgs4", 0, "imgs4")}>上传开户许可证</View> : <View className="imgsbefor">
                            <View class='at-icon at-icon-close-circle close'  onTap={this.del.bind(this, "imgs4", 0, "imgs4")}></View>
                            <Image mode="aspectFill" src={this.state.Imgurl.imgs4}></Image>
                        </View>}
                    </View>
                    </View>
                    <View className='smli'>
                        <View className='tit'>营业执照</View>
                        <View className="imgbox">
                            {this.state.imgs1[0] == null ? <View className="imgs" onTap={this.changeAvatar.bind(this, "imgs1", 0, "imgs1")}>上传银行卡照片</View> : <View className="imgsbefor">
                                <View class='at-icon at-icon-close-circle close'  onTap={this.del.bind(this, "imgs1", 0, "imgs1")}></View>
                                <Image mode="aspectFill" src={this.state.Imgurl.imgs1}></Image>
                            </View>}
                        </View>
                    </View>
                    <View className='smli'>
                        <View className='tit'>相关许可证</View>
                        <View className="imgbox">
                        {
                            this.state.Imgurl.imgs2.map((ele,index)=>{
                                return (
                                    <View className="imgsbefor">
                                        <View class='at-icon at-icon-close-circle close'  onTap={this.del.bind(this, "imgs2", index, "imgs2")}></View>
                                         {
                                             ele=="pdf"?<View className='pdf'></View>:<Image mode="aspectFill" src={ele}></Image>
                                         }
                                        
                                    </View>
                                )
                            })
                        }
                        {this.state.imgs2.length<6 && <View className='imgs' onTap={this.changeAvatar.bind(this,"imgs2", 0, "imgs2")}>上传相关许可证</View>}
                        
                        </View>
                    </View>
                </View>
                
                <View className='bton'>
                    <View className='sub' onTap={this.onSubmit.bind(this)}>确认提交</View>
                </View>

            </View>
        );
    }
}

export default Company;