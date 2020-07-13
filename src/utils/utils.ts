const getLateTime = () => {
    const now = Date.now();
    const twoHourLate = now + 7200000;
    const res = new Date(twoHourLate)
    return res
}

export const getDate = () => {
    const date = getLateTime()
    return date.toLocaleDateString().replace(/\//g, "-")
}

export const getTime = () => {
    const time = getLateTime();

    let hours: string | number = time.getHours();
    hours = hours < 10 ? `0${hours}` : `${hours}`
    let min: string | number = time.getMinutes();
    min = min < 10 ? `0${min}` : `${min}`

    return `${hours}:${min}`
}