import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import './app.less'
import 'taro-ui/dist/style/index.scss'
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
class App extends Component {

  config = {
    pages: [
      'pages/hotline/index',
      'pages/about/index',
      'pages/settledform/index',
      'pages/settledyz/index',
      'pages/settledIn/index',
      'pages/logupload/index',
      'pages/appealDetails/index',
      'pages/appealRecord/index',
      'pages/evaluateing/index',
      'pages/appeal/index',
      'pages/seelog/index',
      'pages/qxorder/index',
      'pages/collect/index',
      'pages/logdetails/index',
      'pages/loglist/index',
      'pages/demand/index', 
      'pages/order_detalis/index',
      'pages/orderlist/index',
      'pages/attes_ing/index',
      'pages/toattes/index',
      'pages/attes/index',
      'pages/center/index',
      'pages/order/index',
      'pages/carlist/index',
      'pages/class/index',
      'pages/demand_details/index',
      'pages/dd_index/index',
      'pages/evaluate/index',
      'pages/details/index',
      'pages/add_details/index',
      'pages/add_list/index',       
      'pages/logistics/index',  
      'pages/list/index',
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {
    
  }
  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
        <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
