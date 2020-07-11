import Nerv, { Component, useState } from "nervjs";
import { View, Button } from "@tarojs/components";
import { AtButton, AtIcon, AtAvatar } from "taro-ui"
import "./home.scss"


const Home: React.FC = () => {
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
                    <AtButton className='create-button' type='primary' size='small' circle >创建预定房间</AtButton>
                </View>

            </View>
        </View>
    )
}

export default Home