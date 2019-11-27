import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtInputNumber } from 'taro-ui'
import Navs from "./../../components/nav"
import './index.less'
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            all: false,
            list: [
                {
                    checked: false,
                    id:0,
                    children: [
                        { checked: false, num: 1 },
                        { checked: false, num: 1 },
                        { checked: false, num: 1 }
                    ]
                },
                {
                    checked: false,
                    id:1,
                    children: [
                        { checked: false, num: 1 },
                        { checked: false, num: 1 },
                    ]
                }
            ]
        }
    }
    config = {
        navigationBarTitleText: '购物车'
    }
    ckAll=()=>{         //全选
        let list=this.state.list,all=this.state.all;
        all=!all;
        list.map(e=>{
            e.checked=all;
            e.children.map(ele=>{
                ele.checked=all
            })
        })
        this.setState({
            all:all,
            list:list
        })
    }
    ckbind=(ind,index)=>{
        let list=this.state.list,all=this.state.all;
        if(index<0){            //上面
            list[ind].checked=!list[ind].checked;
            list[ind].children.map(e=>{
                e.checked=list[ind].checked?true:false
            })
          
        }else{
            list[ind].children[index].checked=!list[ind].children[index].checked
            let len=list[ind].children.filter(e=>{
                return e.checked
            }).length
            list[ind].checked=len==list[ind].children.length?true:false;
        }
        let len=list.filter(e=>{
            return e.checked
        }).length
        all=len==list.length?true:false
        this.setState({
            list:list,
            all:all
        })
    }
    render() {
        const list=this.state.list
        return (
            <View className='carlist'>
                {
                    list.length > 0 ?
                        <View className='main'>
                            <View className='list'>
                                {
                                    list.map((e,ind) => {
                                        return (
                                            <View className='li' key={e.id}>
                                                <View className='tp' onTap={this.ckbind.bind(this,ind,-1)}>
                                                    <View className={`radio ${e.checked ? "cked":""}`}></View>
                                                    <View className='tit'>供货商名称</View>
                                                </View>
                                                <View className='cter'>
                                                    {
                                                        e.children.map((element,index) => {
                                                            return (
                                                                <View className='dd' key={element.id}>
                                                                    <View className='conlf'>
                                                                        <View className='lf' onTap={this.ckbind.bind(this,ind,index)}>
                                                                            <View className={`radio ${element.checked ? "cked":""}`}></View>
                                                                            <Image></Image>
                                                                        </View>
                                                                        <View className='cbname'>
                                                                            <View className='tit'>越南进口高乐蜜芒果5斤装</View>
                                                                            <View className='ibox'>
                                                                                <View className='i'>规格3；规格A</View>
                                                                            </View>
                                                                            <View className='bot'>
                                                                                <View className='money'>¥49.9</View>
                                                                                <View className='num'>
                                                                                    <AtInputNumber min={1} step={1} value={element.num} />
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                    <View className='del'>删除</View>
                                                                </View>
                                                            )
                                                        })
                                                    }
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            <View className='sbtn'>
                                <View className='lf' onTap={this.ckAll.bind(this)}>
                                    <View className={`radio ${this.state.all ? "cked":""}`}></View>
                                    <Text>全选</Text>
                                </View>
                                <View className='rt'>
                                    <View className='txt'>合计： <Text>¥538.9</Text></View>
                                    <View className='sub'>提交订单</View>
                                </View>
                            </View>
                        </View>
                        : <View className='nobg'>
                            您还没有加购商品哦，去逛逛～
                    </View>
                }
                <Navs index='2'></Navs>
            </View>
        );
    }
}

export default Order;