import Nerv from "nervjs";
import { View } from "@tarojs/components";
import { AtCard, AtIcon } from "taro-ui"
import "./ShareCard.scss"
// eslint-disable-next-line import/first
import { RoomState } from "../../reducers/roomInfoReducer";




const ShareCard: React.FC<RoomState> = (props) => {
    const { nickName, treeSpecies, startTime, duration, commit } = props
    return (
        <View className='share-card' style='flex-direction:column'>
            <View className='share-item'>
                <AtCard extra={nickName} title='房主' renderIcon={<AtIcon value='home' size={15} color='#2C405A'></AtIcon>}>
                </AtCard>
            </View>

            <View className='share-item'>
                <AtCard extra={treeSpecies} title='树种' renderIcon={<AtIcon value='tag' size={15} color='#2C405A'></AtIcon>}>
                </AtCard>
            </View>
            <View className='share-item'>
                <AtCard extra={startTime} title='开始时间' renderIcon={<AtIcon value='bell' size={15} color='#2C405A'></AtIcon>}>
                </AtCard>
            </View>

            <View className='share-item'>
                <AtCard extra={duration} title='发车时长' renderIcon={<AtIcon value='clock' size={15} color='#2C405A'></AtIcon>}>
                </AtCard>
            </View>

            {commit ? <View className='share-item'>
                <AtCard extra={commit} title='备注信息' renderIcon={<AtIcon value='file-generic' size={15} color='#2C405A'></AtIcon>}>
                </AtCard>
            </View> : null}

        </View>
    )
}

export default ShareCard