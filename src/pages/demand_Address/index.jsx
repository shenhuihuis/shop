import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import './index.less'
import { getGlobalData,setGlobalData } from '@public/global_data'
import areaJSON from "@public/area.json"
import $http from "@public/server"
class DeAdd extends Component {
    config = {
        navigationBarTitleText: '填写地址'
    }
    constructor(props) {
        super(props);
        this.state = {
            type: 2,     //1 提货地址  2 收获地址
            area: [],
            Index: [0, 0, 0],
            form: {
                province_id: '',
                city_id: '',
                district_id: '',
                address: '',
                contact: '',
                Tel: '',
            }
        }
    }
    componentWillMount() {
        let params=this.$router.params;
        let province = areaJSON.map(e => {
            return { id: e.id, title: e.title }
        })
        let start=getGlobalData("start"),end=getGlobalData("end");
        this.setState({
            type:params.type
        })
        if(!start && params.type==1 || !end && params.type==2){         //在没有设置的情况下 读取默认地址列表
            let city = this.getCity(0)
            let area = this.getArea(0, 0)
            this.setState({
                area: [province, city, area]
            })
            return false;
        }
        let JSON=params.type==1?start:end;
        if(start && params.type==1){
            this.setState(preState=>{
                 preState.form.address=JSON.start_address;
                 preState.form.contact=JSON.start_user;
                 preState.form.Tel=JSON.start_tel;
                 preState.form.province_id=JSON.start_province_id
                 preState.form.city_id=JSON.start_city_id
                 preState.form.district_id=JSON.start_district_id
                 preState.Index=JSON.Index       //省市区 下标
                 preState.area=[province,this.getCity(JSON.Index[0]),this.getArea(JSON.Index[0],JSON.Index[1])]  //省市区数组
            })
        }
        if(end && params.type==2){
            this.setState(preState=>{
                 preState.form.address=JSON.end_address;
                 preState.form.contact=JSON.end_user;
                 preState.form.Tel=JSON.end_tel;
                 preState.form.province_id=JSON.end_province_id
                 preState.form.city_id=JSON.end_city_id
                 preState.form.district_id=JSON.end_district_id
                 preState.Index=JSON.Index       //省市区 下标
                 preState.area=[province,this.getCity(JSON.Index[0]),this.getArea(JSON.Index[0],JSON.Index[1])]  //省市区数组
            })
        }
       
    }
    getCity(index) {
        return areaJSON[index].list.map(e => {
            return { id: e.id, title: e.title }
        })
    }
    getArea(index, ind) {
        return areaJSON[index].list[ind].list.map(e => {
            return { id: e.id, title: e.title }
        })
    }
    cityCk = (e) => {
        let value = e.detail.value;
        this.setState((preState) => {
            preState.form.province_id = areaJSON[value[0]].id;
            preState.form.city_id = areaJSON[value[0]].list[value[1]].id;
            preState.form.district_id = areaJSON[value[0]].list[value[1]].list[value[2]].id;
        })

    }
    onTimeChange = (e) => {
        if (e.detail.column == 0) {
            this.setState((preState) => {
                preState.Index = [e.detail.value, 0, 0]
                preState.area[1] = this.getCity(e.detail.value);
                preState.area[2] = this.getArea(e.detail.value, 0)
            })
        }
        else if (e.detail.column == 1) {
            let index = this.state.Index;
            this.setState((preState) => {
                preState.Index[1] = e.detail.value;
                preState.Index[2] = 0;
                preState.area[2] = this.getArea(index[0], e.detail.value)
            })
        } else {
            this.setState((preState) => {
                preState.Index[2] = e.detail.value;
            })
        }
    }
    potValue = (key, e) => {
        this.setState((preState) => {
            preState.form[key] = e.detail.value
        })
    }
    sub = (e) => {     
        let form = this.state.form, type = this.state.type;
        console.log(form)
        if (!form.contact) {
            Taro.showToast({
                title: "请输入联系人姓名",
                icon: 'none',
                duration: 1000
            })
            return false;
        }
        if (!form.Tel) {
            Taro.showToast({
                title: "请输入手机号",
                icon: 'none',
                duration: 1000
            })
            return false;
        }
        if (!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(form.Tel)) {
            Taro.showToast({
                title: "请输入正确的手机号",
                icon: 'none',
                duration: 1000
            })
            return false;
        }
        if (!form.address) {
            Taro.showToast({
                title: "请输入详细地址",
                icon: 'none',
                duration: 1000
            })
            return false;
        }
        if(!form.province_id){
            Taro.showToast({
                title: "请选择省市区",
                icon: 'none',
                duration: 1000
            })
            return false;
        }
        let Index=this.state.Index;
        if(type==1){
            setGlobalData("start",{
                start_province_id:form.province_id,
                start_city_id:form.city_id,
                start_district_id:form.district_id,
                start_address:form.address,
                start_user:form.contact,
                start_tel:form.Tel,
                Index:Index,
                place:areaJSON[Index[0]].title + areaJSON[Index[0]].list[Index[1]].title + areaJSON[Index[0]].list[Index[1]].list[Index[2]].title 
            })
        }else{
            setGlobalData("end",{
                end_province_id:form.province_id,
                end_city_id:form.city_id,
                end_district_id:form.district_id,
                end_address:form.address,
                end_user:form.contact,
                end_tel:form.Tel,
                Index:Index,
                place:areaJSON[Index[0]].title + areaJSON[Index[0]].list[Index[1]].title + areaJSON[Index[0]].list[Index[1]].list[Index[2]].title 
            })
        }
        wx.navigateBack({
            delta: 1
        })
        
    }
    render() {
        let Index = this.state.Index;
        return (
            <View className='index'>
                <View className='form'>
                    <View className='li'>
                        <View className='label'>联系人</View>
                        <Input placeholder='请输入联系人姓名' type='text' onChange={this.potValue.bind(this, "contact")} value={this.state.form.contact}></Input>
                    </View>
                    <View className='li'>
                        <View className='label'>联系方式</View>
                        <Input placeholder='请输入联系电话' type='number' onChange={this.potValue.bind(this, "Tel")} value={this.state.form.Tel}></Input>
                    </View>
                    <View className='li'>
                        <View className='label'>所在地区</View>
                        <View className='pickers'>
                            <Picker mode='multiSelector' onColumnchange={this.onTimeChange.bind(this)} range={this.state.area} rangeKey="title" value={this.state.Index} onChange={this.cityCk.bind(this)}>
                                <View className='picker'>
                                    {this.state.form.province_id ? areaJSON[Index[0]].title + areaJSON[Index[0]].list[Index[1]].title + areaJSON[Index[0]].list[Index[1]].list[Index[2]].title : "请选择"}
                                </View>
                            </Picker>
                        </View>
                    </View>
                    <View className='li'>
                        <View className='label'>详细地址</View>
                        <Input placeholder='请输入详细地址' type='text' onChange={this.potValue.bind(this, "address")} value={this.state.form.address}></Input>
                    </View>
                </View>
                <View className='bton'>
                    <View className='sub' onTap={this.sub.bind(this)}>确认</View>
                </View>

            </View>

        );
    }
}

export default DeAdd;