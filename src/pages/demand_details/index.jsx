import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import './index.less'
class Demand_Details extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    config = {
        navigationBarTitleText: '供应商详情'
    }
    render() { 
        return (
            <View className='demand_details'>
                <View className='tp'>
                    <View className='imgs'>
                        <Image></Image>
                    </View>
                    <View className='cter'>
                        <View className='tit'>供应商名称</View>
                        <View className='say i'>物流供应</View>
                    </View>
                    <View className='btn'>收藏</View>
                </View>
                <View className='h2'>供应商简介</View>
                <View className='say'>领先未来科技集团有限公司，是国内一流的办公综合解决方案服务商，专注于办公服务领域。为响应国家提出的阳光采购倡议，针对政企采购效率低、成本高、过程不透明的问题，领先未来从技术平台、服务体系、产品方案、团队等各方面加强服务政企采购电商化的能力，大力推动政企采购模式改革，让采购更加阳光透明、快捷高效、简单省心。</View>
                <View className='bton'>
                    <View className='sub'>提交需求</View>
                </View>
            </View>
        );
    }
}
 
export default Demand_Details;