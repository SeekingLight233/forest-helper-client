import Nerv, { useEffect, useState, useRef } from 'nervjs'
import { View, Button, Text, Icon } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtButton, AtInput, AtAvatar } from 'taro-ui'
import './notice.scss'
// eslint-disable-next-line import/first
import { connect, ConnectedProps } from 'nerv-redux'


const mapStateToProps = (state) => ({
    openid: state.userInfo.openid,
    nickName: state.userInfo.nickName,
    state: state.userInfo,
})

const connector = connect(mapStateToProps)

type ModelState = ConnectedProps<typeof connector>

const Notice: React.FC<ModelState> = (props) => {
    const [commit, setCommit] = useState("")
    const [user, setUser] = useState(false)
    const [key, setKey] = useState("")
    const img = wx.getEnterOptionsSync().query.img;
    const roomid = wx.getEnterOptionsSync().query.roomid;

    useEffect(() => {
        const key = wx.getEnterOptionsSync().query.key;
        setUser(key ? true : false)
        setKey(key ? key : "")
    }, [])
    const onCommitChange = (val) => {
        setCommit(val)
    }

    const sendNotice = () => {
        let reg = /\w{7}/
        let res = commit.match(reg)
        let room_key = null;
        try {
            room_key = res[0]
        } catch (error) {
            Taro.showToast({
                title: '未检测到房间密钥',
                icon: 'none',
                duration: 2000
            })
            return
        }

        console.log(room_key);
        Taro.showLoading({
            title: "发送通知中..."
        })
        //@todo 将room_key发到后端
        wx.cloud.callFunction({
            name: 'sendMessage',
            data: {
                key: room_key,
                roomid
            }
        }).then(() => {
            Taro.hideLoading()
            Taro.showToast({
                title: "通知成功！回到forest等待小伙伴加入吧~~",
                icon: "none",
                duration: 4000
            })
        })
    }

    const copyText = () => {
        Taro.setClipboardData({ data: key })
    }

    return (
        <View className="notice">
            <View className="content-area" style='flex-direction:column;'>
                <View className='icon-wrap'>
                    <AtAvatar className='icon' image={img} circle></AtAvatar>
                </View>

                {user ?
                    <View>
                        <View className="text-area">
                            <Text selectable={true} >{key}</Text>
                        </View>
                        <View className="btn-area">
                            <AtButton type="primary" onClick={copyText}>点击复制！</AtButton>
                        </View>
                    </View>
                    :
                    <View>
                        <View className="text-area">
                            <AtInput
                                name='commit'
                                type='text'
                                placeholder='在此粘贴分享链接或输入房间密钥'
                                value={commit}
                                onChange={onCommitChange}
                            />
                        </View>
                        <View className="btn-area">
                            <AtButton type="primary" onClick={sendNotice}>发送通知！</AtButton>
                        </View>
                    </View>
                }

            </View>

        </View>
    )
}

export default connect(mapStateToProps)(Notice)
