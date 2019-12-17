import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import './app.less'
import 'taro-ui/dist/style/index.scss'
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
  require('nerv-devtools')
}
class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/loglist/index',
      'pages/center/index',
      'pages/attes/index',
      'pages/settledIn/index',
      'pages/settledform/index',
      'pages/list/index',
      'pages/collect/index',
      'pages/details/index',
      'pages/orderlist/index',
      'pages/appealRecord/index',
      'pages/carlist/index',
      'pages/order_cart/index',
      'pages/demand/index', 
      'pages/demand_Address/index', 
      'pages/hotline/index',
      'pages/about/index',
      'pages/page/index',
      'pages/demand_details/index',
      'pages/dd_index/index',
      'pages/logistics/index',
      'pages/toattes/index',
      'pages/attes_ing/index',
      'pages/class/index',
      'pages/add_list/index',    
      'pages/add_details/index',   
      'pages/settledyz/index',
      'pages/logupload/index',
      'pages/appealDetails/index',
      'pages/evaluateing/index',
      'pages/appeal/index',
      'pages/seelog/index',
      'pages/qxorder/index',
      'pages/logdetails/index',
      'pages/order_detalis/index',
      'pages/order/index',
      'pages/evaluate/index',
      
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
