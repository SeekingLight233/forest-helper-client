/**
 * @description 创建成功以后的房间信息页面
 */
import Nerv from "nervjs";
import { View, Text } from "@tarojs/components";
import { AtFab, AtAvatar } from "taro-ui"
import "./room.scss"
import ShareCard from "../../components/ShareCard";

// eslint-disable-next-line import/first
import { connect, ConnectedProps } from "nerv-redux";

const mapStateToProps = (state) => {
    const { roomid, nickName, treeSpecies, startTime, duration, commit, treeImg } = state.roomInfo;
    return { roomid, nickName, treeSpecies, startTime, duration, commit, treeImg }
}

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>


const Room: React.FC<ModelState> = (props) => {
    const { treeImg } = props;
    return (
        <View className='room' style='flex-direction:column'>
            <View className='title'>
                <View className='icon'></View><Text className='title-text'>房间信息发布成功 √ </Text>
            </View>
            <View className='tree-img' style='flex-direction:row'>
                <AtAvatar image={treeImg} size='large' circle ></AtAvatar>
            </View>
            <View className='share-card-content'>
                <ShareCard {...props}></ShareCard>
            </View>
            <View className='share-btn'>
                <AtFab>
                    <Text className='at-fab__icon at-icon at-icon-share-2'></Text>
                </AtFab>
            </View>

        </View >
    )
}

export default connect(mapStateToProps)(Room)