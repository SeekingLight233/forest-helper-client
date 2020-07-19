import Nerv, { useEffect } from "nervjs";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro"
import { AtButton, AtAvatar } from "taro-ui"
import "./home.scss"
// eslint-disable-next-line import/first
import { connect, ConnectedProps } from "nerv-redux";
import { saveUserInfo } from "../../utils/common";

const mapStateToProps = (state) => ({
    openid: state.userInfo.openid,
    nickName: state.userInfo.nickName,
    state: state.userInfo
})

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>



const Home: React.FC<ModelState> = (props) => {
    const { openid, nickName, dispatch, state } = props
    const storageOpenid = Taro.getStorageSync("openid");
    const storageNickName = Taro.getStorageSync("nickName")


    const handleUserInfo = (e) => {
        Taro.showLoading({
            title: '加载中',
        })
        saveUserInfo({ e, storageOpenid, storageNickName, dispatch, state })
        const buttonid = e.target.id
        if (buttonid === "_n_26") {
            Taro.navigateTo({ url: "../create/create" })
        } else {
            Taro.navigateTo({ url: "../selectRoom/selectRoom" })
        }
    }
    return (
        <View className='home'>
            <View className='home-container'>
                <View className='icon-wrap'>
                    <AtAvatar className='icon' image='cloud://server-ncazq.7365-server-ncazq-1302589525/img/home.png' circle></AtAvatar>
                </View>
                <View className='select-wrap'>
                    <AtButton className='select-button' onGetUserInfo={handleUserInfo} openType='getUserInfo' type='primary' size='small' circle >选择房间</AtButton>
                </View>
                <View className='create-wrap'>
                    <AtButton className='create-button' onGetUserInfo={handleUserInfo} openType='getUserInfo' type='primary' size='small' circle>创建预定房间</AtButton>
                </View>
            </View>
        </View>
    )
}

export default connect(mapStateToProps)(Home)