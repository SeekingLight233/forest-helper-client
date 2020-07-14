import Nerv, { useEffect } from "nervjs";
import { View, OpenData, Text, Button } from "@tarojs/components";
import Taro from "@tarojs/taro"
import { AtFab, AtAvatar } from "taro-ui"
import "./share.scss"
// eslint-disable-next-line import/first
import { connect, ConnectedProps } from "nerv-redux";
import ShareCard from "../../components/ShareCard";


const Share: React.FC = (props) => {

    return (
        <View className='share' style='flex-direction:column'>
            <View className='title'>
                <View className='icon'></View><Text className='title-text'>房间信息</Text>
            </View>
            <View className='tree-img' style='flex-direction:row'>
                <AtAvatar image='cloud://server-ncazq.7365-server-ncazq-1302589525/trees/tree_default.png' size='large' circle ></AtAvatar>
            </View>
            <View className='share-card-content'>
                <ShareCard></ShareCard>
            </View>
            <View className='share-btn'>
                <AtFab>
                    <Text className='at-fab__icon at-icon at-icon-share-2'></Text>
                </AtFab>
            </View>

        </View>
    )
}

export default Share