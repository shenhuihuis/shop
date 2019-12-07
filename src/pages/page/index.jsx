import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import "./index.less"
import $http from "@public/server"
import WxParse from './../../components/wxParse/wxParse'
class About extends Component {
    config = {
        navigationBarTitleText: '关于我们'
    }
    constructor(props) {
        super(props);
        this.state = {
            title:''
        }
    }
    componentWillMount () {
        this.init();
    }
    init=()=>{
        let type=this.$router.params.type;
        let json=[
            {
                url:'page/company',
                bartit:'企业介绍'
            },
            {
                url:'page/about',  
                bartit:'平台权益'
            },
        ]
        Taro.setNavigationBarTitle({
            title:json[type].bartit
        })
        $http.get(json[type].url).then(e=>{
            WxParse.wxParse('article', 'html', e.content, this.$scope, 5)
            this.setState({
                title:e.title
            })
        })

    }
    render() {
        return (
            <View className='details'>
                <View className='title'>{this.state.title}</View>
                { <View className='say'><import src='../../components/wxParse/wxParse.wxml' /><template is='wxParse' data='{{wxParseData:article.nodes}}'/></View>}
            </View>
        );
    }
}

export default About;