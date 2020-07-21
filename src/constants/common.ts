export const DURATIONS = ["30分钟", "60分钟", "90分钟", "120分钟", "150分钟", "180分钟"]

let _wait: string[] = []
for (let i = 5; i <= 20; i++) {
    _wait.push(`${i}分钟`)
}
export const WAIT_DURATIONS = _wait

export const MAX_PAGE_LENGTH = 20

export const SUBSCRIBER_TEMP_ID = "zt22uNQ1gZ9CGMCTH4j9XZ7Z5T9hn68LdWpnhqbIAk8"

export const HOST_TEMP_ID = "2CXWe8Ac2JaCbc9gNLEkfR-YnWEIUQM2JvuguMoZO9E"