import Nerv, { useEffect, useState, useRef } from 'nervjs'
import { View, Button, Text } from '@tarojs/components'
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

    const onCommitChange = (val) => {
        setCommit(val)
    }

    return (
        <View className="notice">
            <View className="content-area" style='flex-direction:column;'>
                <View className='icon-wrap'>
                    <AtAvatar className='icon' image='cloud://server-ncazq.7365-server-ncazq-1302589525/img/home.png' circle></AtAvatar>
                </View>

                <View className="text-area">
                    <AtInput
                        name='commit'
                        type='text'
                        placeholder='请在此处输入Forest房间密钥'
                        value={commit}
                        onChange={onCommitChange}
                    />
                </View>
                <View className="btn-area">
                    <AtButton type="primary">发送通知！</AtButton>
                </View>
            </View>

        </View>
    )
}

export default connect(mapStateToProps)(Notice)
