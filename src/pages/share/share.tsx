/**
 * @description  创建房间页面
 */
/* eslint-disable no-shadow */
import Taro, { login } from '@tarojs/taro'
import Nerv, { useState, useMemo, useRef, useEffect } from 'nervjs'
import { View, Picker, Text } from '@tarojs/components'
import { useShareAppMessage } from '@tarojs/taro'
import { AtButton, AtInput, AtList, AtListItem } from 'taro-ui'
import { DURATIONS, WAIT_DURATIONS, HOST_TEMP_ID } from '../../constants/common'
import { TREES } from '../../constants/treeData'
import './share.scss'
import { getDate, getTime, resolveTime, generateRoomID, resolveDateToZh, calDurationToTime } from '../../utils/date'

// eslint-disable-next-line import/first
import { connect, ConnectedProps } from 'nerv-redux'
import { USER_INFO, ROOM_INFO } from '../../constants/actionTypes'
import { filterRoomKey } from '../../utils/common'

const mapStateToProps = (state) => ({
  openid: state.userInfo.openid,
  nickName: state.userInfo.nickName,
})

const connector = connect(mapStateToProps)

type ModelState = ConnectedProps<typeof connector>

const Create: React.FC<ModelState> = (props) => {
  const trees = useMemo(() => TREES.map((item) => item.NAME), [])
  const [date, setDate] = useState(getDate())
  const [time, setTime] = useState(getTime(new Date()))
  const [durationCheck, setDurationCheck] = useState('60分钟')
  const [waitDuration, setWaitDuration] = useState('10分钟')
  const [treeCheck, setTreeCheck] = useState(trees[0])
  const [commit, setCommit] = useState('')
  const [treeIndex, setTreeIndex] = useState(0)

  const onDateChange = (e) => {
    setDate(e.detail.value)
  }
  const onTimeChange = (e) => {
    setTime(e.detail.value)
  }
  const onDurationChange = (e) => {
    setDurationCheck(DURATIONS[e.detail.value])
  }
  const onWaitDurationChange = (e) => {
    setWaitDuration(WAIT_DURATIONS[e.detail.value])
  }
  const onTreesChange = (e) => {
    setTreeIndex(e.detail.value)
    setTreeCheck(trees[e.detail.value])
  }
  const onCommitChange = (val) => {
    setCommit(val)
  }

  const submit = () => {
    console.log(durationCheck)
    console.log(waitDuration)
    console.log(TREES[treeIndex].URL)
    console.log(TREES[treeIndex].NAME)
    console.log(filterRoomKey(commit).length)
  }

  const reset = () => {
    setDate(getDate())
    setTime(getTime(new Date()))
    setDurationCheck('30分钟')
    setTreeCheck('默认树种')
    setCommit('')
  }

  useShareAppMessage((res) => {
    const img = TREES[treeIndex].URL
    const key = filterRoomKey(commit)
    return {
      title: `我将在 ${calDurationToTime(waitDuration)} 种下一颗"${TREES[treeIndex].NAME}",时长${durationCheck},点击复制密钥`,
      path: `/pages/notice/notice?key=${key}&img=${img}`,
      imageUrl: img,
    }
  })

  return (
    <View className="create" style="flex-direction:column">
      <View className="content-wrap" style="flex-direction:column">
        <View className="title">
          <View className="icon"></View>
          <Text className="title-text">房间信息</Text>
        </View>
        <View className="picker">
          <View className="commit">
            <AtInput name="commit" title="房间密钥" type="text" placeholder="在此粘贴房间链接或手动输入密钥" value={commit} onChange={onCommitChange} />
          </View>
          <Picker value={durationCheck} range={DURATIONS} mode="selector" onChange={onDurationChange}>
            <AtList>
              <AtListItem title="种树时长" extraText={durationCheck} />
            </AtList>
          </Picker>
          <Picker value={durationCheck} range={WAIT_DURATIONS} mode="selector" onChange={onWaitDurationChange}>
            <AtList>
              <AtListItem title="等待时间" extraText={waitDuration} />
            </AtList>
          </Picker>
          <Picker value={treeCheck} range={trees} mode="selector" onChange={onTreesChange}>
            <AtList>
              <AtListItem title="选择树种" extraText={treeCheck} />
            </AtList>
          </Picker>
        </View>

        <View className="buttons">
          <AtButton type="primary" className="submit-btn" onClick={submit} openType="share">
            分享房间信息
          </AtButton>
          <AtButton className="reset-btn" onClick={reset}>
            重置
          </AtButton>
        </View>
      </View>
    </View>
  )
}

export default connect(mapStateToProps)(Create)
