/**
 *@description 日期选择器组件
 */
import Nerv from "nervjs";
import { View, Text } from "@tarojs/components";
import "./DatePagination.scss"
// eslint-disable-next-line import/first
import { AtIcon, AtButton } from "taro-ui";
import { getChineseDate } from "../../utils/utils";


const DatePagination: React.FC = () => {
    return (
        <View className='date-pagination' style='flex-direction:row'>
            <AtButton type='secondary' size='small'>上一天</AtButton>

            <Text className='date-text'>{getChineseDate()}</Text>

            <AtButton type='primary' size='small'>下一天</AtButton>
        </View >
    )
}

export default DatePagination