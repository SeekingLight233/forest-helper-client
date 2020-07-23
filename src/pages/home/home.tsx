import Nerv, { useEffect, useState, useRef } from 'nervjs'
import { View, Button, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtButton, AtAvatar, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'
import './home.scss'
// eslint-disable-next-line import/first
import { connect, ConnectedProps } from 'nerv-redux'
import { saveUserInfo } from '../../utils/common'
import { set as setGlobalData, get as getGlobalData } from "../../store/global_data"

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
  const [tip, setTip] = useState(true)

  useEffect(() => {
    let hometip = getGlobalData("hometip")
    if (hometip != "exist") {
      // Taro.showModal({
      //   title: 'Tip',
      //   showCancel: false,
      //   confirmText: "不再提示",
      //   content: '本程序的正常使用建立在大家的彼此信任之上。无论你作为预定房间的主人还是房间的订阅者，都希望你能够在接到通知后，准时发车(上车)。祝大家种树愉快:)',
      //   success: function (res) {
      //     if (res.confirm) {
      //       Taro.setStorageSync("hometip", "exist")
      //     }
      //   }
      // })
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
    Taro.setStorageSync("hometip", false)
    setTip(false)
  }

  return (
    <View className="home">
      <View className='home-container'>
        <View className='icon-wrap'>
          <AtAvatar className='icon' image='cloud://server-ncazq.7365-server-ncazq-1302589525/img/home.png' circle></AtAvatar>
        </View>
        <View className='select-wrap'>
          <AtButton className='select-button' onGetUserInfo={onSelectRoom} openType='getUserInfo' type='primary' size='small' circle>
            选择房间
          </AtButton>
        </View>
        <View className='create-wrap'>
          <AtButton className='create-button' onGetUserInfo={onCreateRoom} openType='getUserInfo' type='primary' size='small' circle>
            创建预定房间
          </AtButton>
        </View>
      </View>
      <AtModal
        isOpened={false}
        title='标题'
        confirmText='确认'
        onConfirm={handleTip}
        content=''
      />
    </View>
  )
}

export default connect(mapStateToProps)(Home)
