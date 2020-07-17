import Nerv, { Component } from 'nervjs'
import { Provider } from 'nerv-redux'

import { store } from './store'

import './app.scss'


class App extends Component {
  componentDidMount() {
    wx.cloud.init({
      traceUser: true,
    })
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
