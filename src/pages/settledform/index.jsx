import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import "./index.less"
import {getStore , setStore } from "./../../store"
import Company from "./company"
import Person from "./person"
class SettledForm extends Component {
    config = {
        navigationBarTitleText: '供应商入驻'
    }
    constructor(props) {
        super(props);
        this.state = {
            type:null,
            tel:''
        }
    }
    componentWillMount () {
        let params=this.$router.params;
        this.setState({
            type:params.type * 1 || 4,
            tel:params.tel || "13454752770"
        })
    }
    onSubmit = (e) => {
        console.log(e)
    }
    render() {
        let type=this.state.type;
        return (
            <View className='sattform'>
              {  
                 (type==3 || type==5) ?<Person tel={this.state.tel} type={this.state.type}></Person> :
                 <Company tel={this.state.tel} type={this.state.type}></Company>
             }
            </View>
        );
    }
}

export default SettledForm;