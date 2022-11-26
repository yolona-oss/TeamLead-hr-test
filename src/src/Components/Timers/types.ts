import { time } from 'helpers/time'
export type Command = "destroy" | "cartClick" | "init"

export interface ModelEvents {
        destroy: void
        timerUpdate: time.HMSTime
}
