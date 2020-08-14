
// export const getLateTime = () => {
//     const now = Date.now();
//     const twoHourLate = now + 7200000;
//     const res = new Date(twoHourLate)
//     return res
// }

export const getDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth();
    const day = date.getDate();
    return `${year}-${month + 1}-${day}`
}

export const getChineseDate = (dateUnix) => {
    const date = new Date(dateUnix)
    const month = date.getMonth();
    const day = date.getDate();
    return `${month + 1}月${day}日`
}

export const getTime = (time: Date) => {
    let hours: string | number = time.getHours();
    hours = hours < 10 ? `0${hours}` : `${hours}`
    let min: string | number = time.getMinutes();
    min = min < 10 ? `0${min}` : `${min}`

    return `${hours}:${min}`
}

export const resolveTime = (date: string, time: string) => {
    const dateArr = date.split("-").map((item) => Number(item))
    const timeArr = time.split(":").map((item) => Number(item))
    return new Date(dateArr[0], dateArr[1] - 1, dateArr[2], timeArr[0], timeArr[1]);
}

export const resolveDateToZh = (date: string) => {
    let dateArr = date.split("-");
    if (dateArr[1].charAt(0) === '0') {
        dateArr[1] = dateArr[1].slice(-1);
    }
    return `${dateArr[1]}月${dateArr[2]}日`
}

export const calDurationToTime = (duration: string) => {
    let minutes = Number(duration.match(/\d/g)?.join(""));
    const now = Date.now();
    const time = new Date(now + minutes * 60000);
    return getTime(time)
}

export const generateRoomID = () => {
    let num = Math.random();
    return Math.floor(num * 100000000)
}
