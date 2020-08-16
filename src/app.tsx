import Nerv, { Component } from 'nervjs'
import { Provider } from 'nerv-redux'
import Taro from '@tarojs/taro'
import { store } from './store'
import { set as setGlobalData } from './store/global_data'
import './app.scss'

class App extends Component {
  [x: string]: any
  componentDidMount() {
    wx.cloud.init({
      traceUser: true,
    })
    // 初始化提示信息
    const hometip = Taro.getStorageSync('hometip')
    setGlobalData('hometip', `${hometip}`)
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Provider store={store}>{this.props.children}</Provider>
  }
}

export default App
