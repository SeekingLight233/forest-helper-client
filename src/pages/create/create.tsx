/* eslint-disable no-shadow */
import Nerv, { useState } from "nervjs";
import { View, Picker, Text } from "@tarojs/components";
import { AtButton, AtInput, AtList, AtListItem } from "taro-ui";
import { DURATIONS } from "../../constants/common"
import { TREES } from "../../constants/tree_data"
import "./create.scss";
import { getDate, getTime } from "../../utils/utils";

const trees = TREES.map(item => item.NAME)

const Create: React.FC = () => {

  const [date, setDate] = useState(getDate())
  const [time, setTime] = useState(getTime())
  const [durationCheck, setDurationCheck] = useState("30分钟")
  const [treeCheck, setTreeCheck] = useState("默认树种")
  const [commit, setCommit] = useState("")

  const onDateChange = (e) => {
    setDate(e.detail.value)

  }
  const onTimeChange = (e) => {
    setTime(e.detail.value)
  }
  const onDurationChange = (e) => {
    setDurationCheck(DURATIONS[e.detail.value])
  }
  const onTreesChange = (e) => {
    setTreeCheck(trees[e.detail.value])
  }
  const onCommitChange = (val) => {
    setCommit(val)
  }

  return (
    <View className='create' style='flex-direction:column'>
      <View className='content-wrap' style='flex-direction:column'>
        <View className='title'>
          <View className='icon'></View><Text>房间信息</Text>
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
          <AtButton type='primary' className='submit-btn'>发布</AtButton>
          <AtButton className='reset-btn'>重置</AtButton>
        </View>
      </View>

    </View>
  );
};

export default Create;
