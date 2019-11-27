import Taro from '@tarojs/taro'
import { AtTabBar }  from 'taro-ui'
import ico1 from "../assets/img/ico1.png";
import ico2 from "../assets/img/ico2.png";
import ico3 from "../assets/img/ico3.png";
import ico4 from "../assets/img/ico4.png";
import ico1H from "../assets/img/ico1h.png";
import ico2H from "../assets/img/ico2h.png";
import ico3H from "../assets/img/ico3h.png";
import ico4H from "../assets/img/ico4h.png";

export default class Nav extends Taro.Component {
  constructor (props) {
    super(props)
    this.state = {
      current: props.index *1
    }
  }
  handleClick (value) {
    this.setState({
      current: value
    })
  }
  render () {
    return (
      <AtTabBar
        fixed
        fontSize="10"
        color='#666'
        selectedColor='#319F5F'
        iconSize='25'
        tabList={[
            { title: '首页', image:ico1 ,selectedImage:ico1H,},
            { title: '分类', image:ico2, selectedImage: ico2H,},
            { title: '购物车',image:ico3,selectedImage:ico3H},
            { title: '我的', image:ico4,selectedImage:ico4H}
          ]}
        onClick={this.handleClick.bind(this)}
        current={this.state.current}
      />
    )
  }
}