import Nerv, { useEffect } from "nervjs";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro"
import { AtButton, AtAvatar } from "taro-ui"
import "./home.scss"
// eslint-disable-next-line import/first
import { connect, ConnectedProps } from "nerv-redux";
import { USER_INFO } from "../../constants/actionTypes";

const mapStateToProps = (state) => ({
    openid: state.counter.openid,
})

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>



const Home: React.FC<ModelState> = (props) => {

    const { openid, dispatch } = props
    const storageOpenid = Taro.getStorageSync("openid");

    /**
     * @description get user info
     */
    useEffect(() => {
        if (storageOpenid) {
            console.log(storageOpenid);
            dispatch({
                type: USER_INFO,
                openid: storageOpenid
            })
        } else {
            wx.cloud.callFunction({
                name: 'login',
                data: {},
                success: res => {
                    dispatch({
                        type: USER_INFO,
                        openid: res.result.openid
                    })
                    Taro.setStorageSync("openid", res.result.openid)
                },
                fail: err => {
                    console.error(err)
                }
            })
        }

    }, [dispatch, openid, storageOpenid])

    /**
     * @description navigate to new page
     */
    const createHome = () => {
        Taro.navigateTo({ url: '../create/create' })
    }
    return (
        <View className='home'>
            <View className='home-container'>
                <View className='icon-wrap'>
                    <AtAvatar className='icon' image='cloud://server-ncazq.7365-server-ncazq-1302589525/img/home.png' circle></AtAvatar>
                </View>
                <View className='select-wrap'>
                    <AtButton className='select-button' type='primary' size='small' circle >选择房间</AtButton>
                </View>
                <View className='create-wrap'>
                    <AtButton className='create-button' type='primary' size='small' circle onClick={createHome}>创建预定房间</AtButton>
                </View>
            </View>
        </View>
    )
}

export default connect(mapStateToProps)(Home)