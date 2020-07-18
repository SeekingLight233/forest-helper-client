/* eslint-disable import/first */
/**
 *@description 选择房间中的单个房间组件
 */
import Nerv, { useState, useEffect } from 'nervjs'
import { View, Text } from '@tarojs/components'
import './RoomInfo.scss'
import { AtAvatar, AtFab } from 'taro-ui'
// eslint-disable-next-line import/first
import Taro from '@tarojs/taro'
import { ROOM_INFO, USER_INFO } from '../../constants/actionTypes'
import { connect, ConnectedProps } from "nerv-redux";
import { updateRoom } from '../../actions/database'
import { store } from "../../store/index"
import { updateSubscribeState, updateRoomInfoState } from '../../actions/updateState'
import { handleSubscribe, cancelSubscribe } from '../../actions/controller'

const mapStateToProps = (state) => ({
  openid: state.userInfo.openid,
  nickName: state.userInfo.nickName,
  subscribeRoomid: state.userInfo.subscribeRoomid
})

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>

interface IProps {
  treeImg: string
  nickName: string
  startTime: string
  duration: string
  treeSpecies: string
  commit?: string
  roomid?: number
  member: string[]
  _openid: string
}

const RoomInfo: React.FC<IProps & ModelState> = (props) => {
  const { host, treeImg, nickName, startTime, duration, commit, roomid, treeSpecies, member, openid, dispatch, _openid, subscribeRoomid } = props

  const [subscribe, setSubscribe] = useState(false)
  const [touch, setTouch] = useState(false)

  const _setSubscribe = (state: boolean) => {
    setSubscribe(state)
  }

  useEffect(() => {
    const isSubscribe = member.includes(openid)
    if (isSubscribe) {
      updateSubscribeState(openid, nickName, roomid)
    }
    setSubscribe(isSubscribe)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigateToRoom = () => {
    setTouch(false)
    updateRoomInfoState({
      __roomid: roomid,
      __commit: commit,
      __duration: duration,
      __host: host,
      __openid: _openid,
      __startTime: startTime,
      __treeImg: treeImg,
      __treeSpecies: treeSpecies
    })
    Taro.navigateTo({ url: '../room/room' })
  }


  const onSubscribe = () => {
    handleSubscribe({
      nickName,
      host,
      subscribeRoomid,
      openid,
      roomid,
      member,
      _setSubscribe
    })
  }

  const onCancelSubscribe = () => {
    cancelSubscribe({
      member,
      openid,
      roomid,
      _setSubscribe
    })
  }

  // const handleSubscribe = () => {
  //   if (nickName === host) {
  //     Taro.showToast({
  //       title: '不用订阅自己哦，到时间会给你发通知的~~',
  //       icon: 'none',
  //       duration: 3000
  //     })
  //     return
  //   }
  //   // 订阅拦截 只允许同时订阅一个房间
  //   if (subscribeRoomid && subscribeRoomid !== 0) {
  //     Taro.showToast({
  //       title: '只允许同时订阅一个房间哦',
  //       icon: 'none',
  //       duration: 2000
  //     })
  //   } else {
  //     updateSubscribeState(openid, nickName, roomid)
  //     setSubscribe(true)
  //     member.push(openid);
  //     dispatch(updateRoom(roomid, member))
  //   }
  // }

  // const cancelSubscribe = (e) => {
  //   Taro.showModal({
  //     title: "提示",
  //     content: '确认取消订阅吗？',
  //     success: function (res) {
  //       if (res.confirm) {
  //         setSubscribe(false)
  //         let newMember = member.filter((val) => val !== openid)
  //         dispatch(updateRoom(roomid, newMember, true))
  //       }
  //     }
  //   })
  // }

  const cls = touch ? 'room-info touch' : 'room-info'

  return (
    <View className={cls}>
      <View className='tree-icon' onClick={navigateToRoom}>
        <AtAvatar image={treeImg} size='large' circle></AtAvatar>
      </View>
      {/* @todo 订阅按钮冒泡阻止taro这里好像还没处理好，暂时先给这两个区域挂上点击事件吧  */}
      {/* https://github.com/NervJS/taro/issues/761 */}
      <View className='room-info-detail' style="style='flex-direction:column;" onClick={navigateToRoom}>
        <View className='room-info-item' style="style='flex-direction:row;">
          <View className='at-icon at-icon-home '></View>
          <Text className='text-info'>{host}</Text>
        </View>

        <View className='room-info-item' style="style='flex-direction:row;">
          <View className='at-icon at-icon-bell'></View>
          <Text className='text-info'>{startTime}</Text>
        </View>

        <View className='room-info-item' style="style='flex-direction:row;">
          <View className='at-icon at-icon-clock'></View>
          <Text className='text-info'>{duration}</Text>
        </View>

        {commit ? (
          <View className='room-info-item' style="style='flex-direction:row;">
            <View className='at-icon at-icon-file-generic'></View>
            <Text className='text-info'>{commit}</Text>
          </View>
        ) : null}
      </View>

      <View className='subscribe-area'>
        {subscribe ? (
          <AtFab className='active' onClick={onCancelSubscribe}>
            <Text className='at-fab__icon at-icon at-icon-check'></Text>
          </AtFab>
        ) : (
            <AtFab onClick={onSubscribe}>
              <Text className='at-fab__icon at-icon at-icon-bell'></Text>
            </AtFab>
          )}
      </View>
    </View>
  )
}

export default connect(mapStateToProps)(RoomInfo) 
