export const DURATIONS = ["30分钟", "60分钟", "90分钟", "120分钟", "150分钟", "180分钟"]

let _wait: string[] = []
for (let i = 5; i <= 30; i = i + 5) {
    _wait.push(`${i}分钟`)
}
export const WAIT_DURATIONS = _wait

export const MAX_PAGE_LENGTH = 20

export const SUBSCRIBER_TEMP_ID = "abOUGyaz6e3iZgG8DXXMjusvNJ80vlp2f7Ka_uvTDrc"

export const HOST_TEMP_ID = "xJt2V_5ts8PraYykjPkeW1kCtubPRcnvTU177FLugRg"

export const CANCEL_TEMP_ID = "o9sg1eEZKjjCia3eHA_hvd_Ov9KDX4sNXeqaff_QLVw"