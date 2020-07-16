export const DURATIONS = ["30分钟", "60分钟", "90分钟", "120分钟"]

let _wait: string[] = []
for (let i = 5; i <= 20; i++) {
    _wait.push(`${i}分钟`)
}
export const WAIT_DURATIONS = _wait

export const MAX_PAGE_LENGTH = 12