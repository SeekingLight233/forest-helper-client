/**
 *@description 日期选择器组件
 */
import Nerv, { useState, useEffect } from "nervjs";
import { View, Text } from "@tarojs/components";
import "./DatePagination.scss"
// eslint-disable-next-line import/first
import { AtIcon, AtButton } from "taro-ui";
import { getChineseDate } from "../../utils/date";

interface IProps {
    date: number,
    page?: number,
    changeDate: any
}

const DatePagination: React.FC<IProps> = (props) => {
    const { date, changeDate } = props;

    const [dateUnix, setDateUnix] = useState(date)

    const minusDate = () => {
        setDateUnix(val => val - 86400000)
    }

    const addDate = () => {
        setDateUnix(val => val + 86400000);
    }

    useEffect(() => {
        changeDate(dateUnix)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateUnix])
    return (
        <View className='date-pagination' style='flex-direction:row'>
            <AtButton type='secondary' size='small' onClick={minusDate}>上一天</AtButton>

            <Text className='date-text'>{getChineseDate(dateUnix)}</Text>

            <AtButton type='primary' size='small' onClick={addDate}>下一天</AtButton>
        </View >
    )
}

export default DatePagination