import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker, Input } from '@tarojs/components'
import "./index.less"
import $http from "@public/server"
import { getGlobalData,setGlobalData } from '@public/global_data'
class Demand extends Component {
    config = {
        navigationBarTitleText: '填写需求'
    }
    constructor(props) {
        super(props);
        this.state = {
            intext:false,
            Index:[0,0],
            reg: {
                start_province_id:{zero:'请选择提货地址'},
                end_province_id:{zero:'请选择收货地址'},
                track_type_id:{zero:'请选择物流方式'},
                start_at:{zero:'请选择发货时间'},
                end_at:{zero:'请选择到货时间'},
                contact:{zero:"请输入联系人"},
                tel:{zero:"请输入联系人电话"},
                weight:{zero:'请填写重量'},
                size:{zero:'请填写体积'},
                warm_type: { zero: '请选择温区' },  
           },
            warm_type:[{title:"常温",id:1},{title:"冷藏",id:2},{title:"冷冻",id:3},],   //温区列表
            ckWarm:'',              //温区选择结果
            category:[],        //初始运输方式
            catelist:[],        //
            imgs:[],        //上传图片保存地址
            path:[],        //上传图片路径
            form:{
                contact:'',
                tel:'',
                track_type_id:null,
                warm_type:null,
                size:null,
                weight:null,
                end_at:null,
                start_at:null,
            },
            start:null,   //提货地址
            end:null     //送货地址
        }
    }
    componentWillMount(){
        this.init()
    }
    componentDidShow () {
        this.setState({
            start:getGlobalData("start"),
            end:getGlobalData("end")
        })
    }
    init =()=>{
        $http.get("track/category").then(e=>{
            this.setState({
                category:e,
                catelist:[e,e[0].list]
            })
        })
    }
    onSubmit = (e) => {
        let start=this.state.start,end=this.state.end;
        let form=JSON.parse(JSON.stringify(this.state.form));
        if(!start || !end){
            return false;
        }
        let newform=Object.assign(form,start,end);
        let reg=this.state.reg;
        for(let val in reg){
            if(!newform[val]){
                Taro.showToast({
                    title: reg[val].zero,
                    icon: 'none',
                    duration: 1000
                })
                return false;
            }
        }
        if(!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(form.tel)){
            Taro.showToast({
                title: "请输入正确的手机号",
                icon: 'none',
                duration: 1000
            })
            return false;
        }
        delete newform.Index;
        delete newform.place;
        if(new Date(newform.end_at).getTime()<new Date(newform.start_at).getTime()){
            Taro.showToast({
                title: "到货日期不能小于发货日期",
                icon: 'none',
                duration: 1000
            })
            return false;
        }
        if(this.state.imgs.length==0){
            Taro.showToast({
                title: "请上传物品图片",
                icon: 'none',
                duration: 1000
            })
            return false;
        }
       newform.imgs=this.state.imgs;
       newform.end_at=newform.end_at+" 00:00:00"
       newform.start_at=newform.start_at+" 00:00:00"
       newform.size=newform.size*1
       newform.weight=newform.weight*1
       if(this.$router.params.id){
        newform.track_supplier_id=this.$router.params.id*1
       }
        Taro.showLoading({
            mask:true,
            title:"正在上传需求"
        })
        $http.post("track/order",newform).then(e=>{
            setGlobalData("start",null)
            setGlobalData("end",null)
            Taro.redirectTo({
                url:'/pages/loglist/index'
            })
            Taro.hideLoading()
        })
    }
    onTimeChange = (e) =>{
        let list= this.state.category;
        if (e.detail.column == 0) {
            this.setState((preState) => {
               // preState.Index = [e.detail.value, 0]
                preState.catelist[1] = list[e.detail.value].list;
            })
        }
       else {
            this.setState((preState) => {
             //   preState.Index[1] = e.detail.value[1];
            })
        }
    }
    bindValue = (key,e) =>{
        this.setState(preState=>{
            preState.form[key]=e.detail.value
        })
        
    }
    warmCk = (e) =>{
        this.setState(preState=>{
            preState.form.warm_type=this.state.warm_type[e.detail.value].id
            preState.ckWarm=this.state.warm_type[e.detail.value].title
        })
    }
    cityCk = (e) => {
        let value = e.detail.value;
        this.setState((preState) => {
            preState.Index=value
            preState.form.track_type_id=this.state.category[value[0]].list[value[1]].id
        })

    }
    addDetails = (type) =>{
        Taro.navigateTo({url:"/pages/demand_Address/index?type="+type})
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
    intxtFocus=(bool)=>{
        this.setState({
            intext:bool
        })
    }
    render() {
        let start=this.state.start,end=this.state.end
        return (
            <View className='form'>
                <View className='tp'>
                    <View className='lf'>
                    </View>
                    <View className='rt'>
                        <View className='address' onClick={this.addDetails.bind(this,1)}>
                            <View className='ico1'></View>
                           { !start ?<View className='ipt'>请填写提货地址</View> :
                                <View className='out'>
                                    <View className='info'>{start.place + start.start_address}</View>
                                    <View className='t'>
                                        <Text>{start.start_user}</Text>
                                        <Text>{start.start_tel}</Text>
                                    </View>
                                </View>
                            }
                        </View>
                        <View className='address'  onClick={this.addDetails.bind(this,2)}>
                            <View className='ico3'></View>
                            { !end ?<View className='ipt'>请填写收货地址</View> :
                                <View className='out'>
                                    <View className='info'>{end.place + end.end_address}</View>
                                    <View className='t'>
                                        <Text>{end.end_user}</Text>
                                        <Text>{end.end_tel}</Text>
                                    </View>
                                </View>
                            }
                        </View>
                    </View>
                </View>
                <View className='formson'>
                    <View className='li'>
                        <View className='label'>运输方式</View>
                        <View className='pickers'>
                            <Picker mode='multiSelector' onColumnchange={this.onTimeChange.bind(this)} rangeKey="title" value={this.state.Index}  range={this.state.catelist} onChange={this.cityCk.bind(this)}>
                                <View className='picker'>
                                    {this.state.form.track_type_id?this.state.category[this.state.Index[0]].list[this.state.Index[1]].title:<View className='brown'>请选择</View>}
                                </View>
                            </Picker>
                        </View>
                    </View>
                    <View className='li'>
                        <View className='label'>发货时间</View>
                        <View className='pickers'>
                            <Picker mode='date' onChange={this.bindValue.bind(this,"start_at")}>
                                <View className='picker'>
                                    {this.state.form.start_at || <View className='brown'>请选择</View>}
                                </View>
                            </Picker>
                        </View>
                    </View>
                    <View className='li'>
                        <View className='label'>到货时间</View>
                        <View className='pickers'>
                            <Picker mode='date' onChange={this.bindValue.bind(this,"end_at")}>
                                <View className='picker'>
                                    {this.state.form.end_at  || <View className='brown'>请选择</View>}
                                </View>
                            </Picker>
                        </View>
                    </View>
                    <View className='li'>
                        <View className='label'>联系人</View>
                        <Input placeholder='输入联系人姓名'  type='text' onChange={this.bindValue.bind(this,"contact")}></Input>
                    </View>
                    <View className='li'>
                        <View className='label'>联系方式</View>
                        <Input placeholder='请输入联系电话'  type='number' onChange={this.bindValue.bind(this,"tel")}></Input>
                    </View>
                </View>
                <View className='formson'>
                    <View className='li'>
                        <View className='label'>物品重量</View>
                        <View className='input'>
                            <Input placeholder='请填写物品质量' type='number' onChange={this.bindValue.bind(this,"weight")}></Input>
                            <View className='span'>kg*</View>
                        </View>
                    </View>
                    <View className='li'>
                        <View className='label'>物品体积</View>
                        <View className='input'>
                            <Input placeholder='请填写物品体积' type='number' onChange={this.bindValue.bind(this,"size")}></Input>
                            <View className='span'>cm³</View>
                        </View>
                    </View>
                    <View className='li'>
                        <View className='label'>温区选择</View>
                        <View className='pickers'>
                            <Picker mode='selector' onChange={this.warmCk.bind(this)} rangeKey="title" range={this.state.warm_type}>
                                <View className='picker'>
                                    {this.state.ckWarm || <View className='brown'>请选择</View>}
                                </View>
                            </Picker>
                        </View>
                    </View>
                </View>
                <View className='formson'>
                    <View className='htit'>物品描述</View>
                    {
                        this.state.intext ?  <Textarea  className='txt' placeholder='补充详细信息…' onInput={this.bindValue.bind(this,"product_note")} focus={this.state.intext} value={this.state.form.product_note} onBlur={this.intxtFocus.bind(this,false)}></Textarea>:
                        <View className='txt' onTap={this.intxtFocus.bind(this,true)}>{this.state.form.product_note || "补充详细信息…"}</View>
                    }
                    <View className='htit'>物品图片</View>
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
                        {this.state.imgs.length<6 && <View className='imgs' onTap={this.changeAvatar.bind(this)}></View>}
                    
                    </View>
                    <View className='lli'>
                        <View className='label'>备注</View>
                        <Input className='lput' placeholder='填写备注信息（选填）'  type='text' onChange={this.bindValue.bind(this,"note")}></Input>
                    </View>
                    <View className='bot'>*这里是温馨提示的内容</View>
                </View>
                
                <View className='bton'>
                    <View className='sub' onTap={this.onSubmit.bind(this)}>提交</View>
                </View>

            </View>
        );
    }
}

export default Demand;