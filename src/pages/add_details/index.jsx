import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import './index.less'
import { AtSwitch } from 'taro-ui'
import areaJSON from "@public/area.json"
import $http from "@public/server"
class DeAdd extends Component {
    config = {
        navigationBarTitleText: '我的地址'
    }
    constructor(props) {
        super(props);
        this.state = {
            type: 2,     // 1编辑 2新增
            goLink:"",
            area: [],
            Index: [0, 0, 0],
            form: {
                province_id: '',
                city_id: '',
                district_id: '',
                address: '',
                contact: '',
                Tel: '',
                is_def:false
            }
        }
    }
    componentWillMount() {
        let params=this.$router.params;
        let province = areaJSON.map(e => {
            return { id: e.id, title: e.title }
        })
        if(params.type!=2){
            $http.get("account/address/info",{id:params.id}).then(e=>{
               let province_index=areaJSON.findIndex(ele=>{
                   return ele.id==e.province_id
               })
               let city_index=areaJSON[province_index].list.findIndex(ele=>{
                  return ele.id==e.city_id
               })
               let area_index=areaJSON[province_index].list[city_index].list.findIndex(ele=>{
                return ele.id==e.district_id
               })
               this.setState((preState)=>{
                    preState.form.id=Number(params.id)
                    preState.type=params.type;          //1 编辑 2新增
                    preState.form.address=e.address;        //地址
                    preState.form.province_id=e.province_id //省id
                    preState.form.city_id=e.city_id             // 市id
                    preState.form.district_id=e.district_id     // 区id
                    preState.form.contact=e.contact             //联系人
                    preState.form.Tel=e.tel;                    //电话号码
                    preState.form.is_def=e.is_def==1?true:false     //是否默认地址
                    preState.Index=[province_index,city_index,area_index]       //省市区 下标
                    preState.area=[province,this.getCity(province_index),this.getArea(province_index,city_index)]  //省市区数组
               })
            })
        }else{
            let city = this.getCity(0)
            let area = this.getArea(0, 0)
            this.setState({
                area: [province, city, area]
            })
        }
        this.setState({
            goLink:this.$router.params.goLink,
        })
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
    handleChange = (e) => {
        this.setState((preState) => {
            preState.form.is_def = e
        })
    }
    potValue = (key, e) => {
        this.setState((preState) => {
            preState.form[key] = e.detail.value
        })
    }
    del =(e) =>{
        let id=this.state.form.id,goLink=this.state.goLink;
        Taro.showModal({
            title: '确定删除该地址？',
            content: '',
            success (res) {
              if (res.confirm) {
                    Taro.showLoading({
                        title: "正在删除地址",
                        mask:true
                    })
                    $http.post("account/address/del",{id:id}).then(e=>{//   需要返回上一级 并可能要传值  这边作标记 ！！！  
                        Taro.showToast({
                            title:"删除成功",
                            icon:'success',
                            duration: 1000
                        })
                        Taro.redirectTo({url:"/pages/add_list/index?goLink="+goLink,success(){
                            setTimeout(function () {
                                Taro.hideLoading()
                            }, 2000)
                        }})
                    })
              } 
            }
        })
    }
    sub = (e) => {      //新增 编辑 提交
        let form = this.state.form, type = this.state.type;
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
        if (!/^1[3456789]\d{9}$/.test(form.Tel)) {
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
         Taro.showLoading({
            title: type==1?"修改中,请稍等":"新增中,请稍等",
            mask:true
         })
         Taro.showToast({
            title:type==1?"修改成功":"新增成功",
            icon:'success',
            duration: 1000
        })
        $http.post("account/address",form).then(e=>{//   需要返回上一级 并可能要传值  这边作标记 ！！！  
            Taro.redirectTo({url:"/pages/add_list/index?goLink="+this.state.goLink,success(){
                setTimeout(function () {
                    Taro.hideLoading()
                }, 2000)
            }})
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
                                    {this.state.form.province_id ? areaJSON[Index[0]].title + areaJSON[Index[0]].list[Index[1]].title + areaJSON[Index[0]].list[Index[1]].list[Index[2]].title : <View className='brown'>请选择</View>}
                                </View>
                            </Picker>
                        </View>
                    </View>
                    <View className='li'>
                        <View className='label'>详细地址</View>
                        <Input placeholder='请输入详细地址' type='text' onChange={this.potValue.bind(this, "address")} value={this.state.form.address}></Input>
                    </View>
                    <View className='li'>
                        <View className='label'>设为默认</View>
                        <View className='radbox'>
                            <AtSwitch checked={this.state.form.is_def} onChange={this.handleChange.bind(this)} color='#319F5F' />
                        </View>
                    </View>
                </View>
                <View className='bton'>
                    {
                        this.state.type == 2 ? (<View className='sub' onTap={this.sub.bind(this)}>确认</View>) :
                            <View className='int'><View className='del' onTap={this.del.bind(this)}>删除地址</View><View className='add' onTap={this.sub.bind(this)}>保存地址</View></View>
                    }
                </View>

            </View>

        );
    }
}

export default DeAdd;