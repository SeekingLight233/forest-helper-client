import Nerv, { useEffect } from "nervjs";
import { View, OpenData, Text } from "@tarojs/components";
import Taro from "@tarojs/taro"
import { AtButton, AtAvatar, AtCard, AtIcon } from "taro-ui"
import "./ShareCard.scss"
// eslint-disable-next-line import/first
import { connect, ConnectedProps } from "nerv-redux";


const ShareCard: React.FC = (props) => {

    return (
        <View className='share-card' style='flex-direction:column'>
            <View className='share-item'>
                <AtCard extra='杰克有茶' title='房主' renderIcon={<AtIcon value='home' size={15} color='#2C405A'></AtIcon>}>
                </AtCard>
            </View>

            <View className='share-item'>
                <AtCard extra='水之心' title='树种' renderIcon={<AtIcon value='tag' size={15} color='#2C405A'></AtIcon>}>
                </AtCard>
            </View>
            <View className='share-item'>
                <AtCard extra='14:00' title='开始时间' renderIcon={<AtIcon value='bell' size={15} color='#2C405A'></AtIcon>}>
                </AtCard>
            </View>

            <View className='share-item'>
                <AtCard extra='60分钟' title='发车时长' renderIcon={<AtIcon value='clock' size={15} color='#2C405A'></AtIcon>}>
                </AtCard>
            </View>

            <View className='share-item'>
                <AtCard extra='快来上车啦~~' title='备注信息' renderIcon={<AtIcon value='file-generic' size={15} color='#2C405A'></AtIcon>}>
                </AtCard>
            </View>
        </View>
    )
}

export default ShareCard