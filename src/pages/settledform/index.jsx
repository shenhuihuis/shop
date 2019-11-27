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
            type:true
        }
    }
    componentWillMount () {

    }
    onSubmit = (e) => {
        console.log(e)
    }
    render() {
        return (
            <View className='sattform'>
              { /* <Company></Company> */}
              <Person></Person>
            </View>
        );
    }
}

export default SettledForm;