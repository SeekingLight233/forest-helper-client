import Nerv, { useEffect, useState, useRef } from 'nervjs'
import { View, Button, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtButton, AtAvatar, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'
import './home.scss'
// eslint-disable-next-line import/first
import { connect, ConnectedProps } from 'nerv-redux'
import { saveUserInfo } from '../../utils/common'
import { set as setGlobalData, get as getGlobalData } from '../../store/global_data'

const mapStateToProps = (state) => ({
  openid: state.userInfo.openid,
  nickName: state.userInfo.nickName,
  state: state.userInfo,
})

const connector = connect(mapStateToProps)

type ModelState = ConnectedProps<typeof connector>

const Home: React.FC<ModelState> = (props) => {
  const { openid, nickName, dispatch, state } = props
  const storageOpenid = Taro.getStorageSync('openid')
  const storageNickName = Taro.getStorageSync('nickName')

  useEffect(() => {
    let hometip = Taro.getStorageSync('hometip')
    if (hometip != 'exist') {
      Taro.showModal({
        title: '公告栏~~',
        showCancel: false,
        confirmText: '不再提示',
        content: '小程序刚上线难免会有bug，如果有问题欢迎在即刻@SeekingLight，祝大家种树愉快(≧ω≦)/',
        success: function (res) {
          if (res.confirm) {
            Taro.setStorageSync('hometip', 'exist')
          }
        },
      })
    }
  }, [])

  const handleUserInfo = (e) => {
    Taro.showLoading({
      title: '加载中',
    })
    saveUserInfo({ e, storageOpenid, storageNickName, dispatch, state })
  }

  const onSelectRoom = (e) => {
    handleUserInfo(e)
    Taro.navigateTo({ url: '../selectRoom/selectRoom' })
  }

  const onCreateRoom = (e) => {
    handleUserInfo(e)
    Taro.navigateTo({ url: '../create/create' })
  }

  const handleTip = () => {
    Taro.setStorageSync('hometip', false)
  }

  const onShareRoom = () => {
    Taro.navigateTo({ url: '../share/share' })
  }

  return (
    <View className="home">
      <View className="home-container">
        <View className="icon-wrap">
          <AtAvatar className="icon" image="cloud://main-xst0w.6d61-main-xst0w-1302868954/trees/star_tree_4.png" circle></AtAvatar>
        </View>
        <View className="select-wrap">
          <AtButton className="select-button" onGetUserInfo={onSelectRoom} openType="getUserInfo" type="primary" size="small" circle>
            房间广场
          </AtButton>
        </View>
        <View className="create-wrap">
          <AtButton className="create-button" onGetUserInfo={onCreateRoom} openType="getUserInfo" type="primary" size="small" circle>
            创建预定房间
          </AtButton>
        </View>
        <View className="create-wrap">
          <AtButton className="create-button" onClick={onShareRoom} type="primary" size="small" circle>
            分享即时房间
          </AtButton>
        </View>
      </View>
      <AtModal isOpened={false} title="标题" confirmText="确认" onConfirm={handleTip} content="" />
    </View>
  )
}

export default connect(mapStateToProps)(Home)
