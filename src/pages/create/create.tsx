/**
 * @description  创建房间页面
 */
/* eslint-disable no-shadow */
import Taro from "@tarojs/taro"
import Nerv, { useState, useMemo, useShareAppMessage, useRef } from "nervjs";
import { View, Picker, Text } from "@tarojs/components";
import { AtButton, AtInput, AtList, AtListItem } from "taro-ui";
import { DURATIONS, WAIT_DURATIONS } from "../../constants/common"
import { TREES } from "../../constants/treeData"
import "./create.scss";
import { getDate, getTime, getLateTime, resolveTime, generateRoomID } from "../../utils/utils";

// eslint-disable-next-line import/first
import { connect, ConnectedProps } from "nerv-redux";
import { USER_INFO, ROOM_INFO } from "../../constants/actionTypes";

const mapStateToProps = (state) => ({
  openid: state.userInfo.openid,
  nickName: state.userInfo.nickName
})

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>

const Create: React.FC<ModelState> = (props) => {
  const { openid, nickName, dispatch } = props

  const [date, setDate] = useState(getDate())
  const [time, setTime] = useState(getTime())
  const [durationCheck, setDurationCheck] = useState("30分钟")
  const [waitDuration, setWaitDuration] = useState("5分钟")
  const [treeCheck, setTreeCheck] = useState("默认树种")
  const [commit, setCommit] = useState("")
  const [treeIndex, setTreeIndex] = useState(0)
  const roomid = generateRoomID()

  const trees = useMemo(() => TREES.map(item => item.NAME), [])

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

    const db = wx.cloud.database();

    db.collection('rooms').add({
      data: {
        startTime: resolveTime(date, time),
        waitDuration: waitDuration,
        duration: durationCheck,
        treeImg: TREES[treeIndex].URL,
        treeSpecies: TREES[treeIndex].NAME,
        commit: commit,
        openid: openid,
        nickName: nickName,
        menbers: [],
        roomid
      },

      success: res => {
        dispatch({
          type: ROOM_INFO,
          roomid,
          nickName: nickName,
          treeSpecies: treeCheck,
          treeImg: TREES[treeIndex].URL,
          startTime: time,
          duration: durationCheck,
          commit
        })
        Taro.navigateTo({ url: "../room/room" })
      },
    })
    // console.log(date);
    // console.log(time);
    // console.log(durationCheck)
    // console.log(treeIndex)
    // console.log(commit)
    // console.log(openid)
    // console.log(nickName)
  }

  const reset = () => {
    setDate(getDate());
    setTime(getTime())
    setDurationCheck("30分钟");
    setTreeCheck("默认树种");
    setCommit("")
  }

  return (
    <View className='create' style='flex-direction:column'>
      <View className='content-wrap' style='flex-direction:column'>
        <View className='title'>
          <View className='icon'></View><Text className='title-text'>房间信息</Text>
        </View>

        <View className='picker'>
          <Picker value={date} mode='date' onChange={onDateChange} start={date}>
            <AtList>
              <AtListItem title='日期' extraText={date} />
            </AtList>
          </Picker>
          <Picker value={time} mode='time' onChange={onTimeChange}>
            <AtList>
              <AtListItem title='时间' extraText={time} />
            </AtList>
          </Picker>
          <Picker value={durationCheck} range={DURATIONS} mode='selector' onChange={onDurationChange}>
            <AtList>
              <AtListItem title='种树时长' extraText={durationCheck} />
            </AtList>
          </Picker>
          <Picker value={durationCheck} range={WAIT_DURATIONS} mode='selector' onChange={onWaitDurationChange}>
            <AtList>
              <AtListItem title='等待时间' extraText={waitDuration} />
            </AtList>
          </Picker>
          <Picker value={treeCheck} range={trees} mode='selector' onChange={onTreesChange}>
            <AtList>
              <AtListItem title='选择树种' extraText={treeCheck} />
            </AtList>
          </Picker>
          <View className='commit'>
            <AtInput
              name='commit'
              title='备注信息'
              type='text'
              placeholder='可以在这里输入一些备注信息哦~~'
              value={commit}
              onChange={onCommitChange}
            />
          </View>
        </View>

        <View className='buttons'>
          <AtButton type='primary' className='submit-btn' onClick={submit}>发布房间信息</AtButton>
          <AtButton className='reset-btn' onClick={reset}>重置</AtButton>
        </View>
      </View>

    </View>
  );
};

export default connect(mapStateToProps)(Create);
