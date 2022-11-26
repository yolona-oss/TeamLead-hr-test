import { time } from 'helpers/time'
import { EventEmitter } from 'helpers/EventEmitter'
import { ModelEvents } from './types'

interface Props {
}

export class Model extends EventEmitter<ModelEvents> {
        private readonly timeStart: Date
        private updateTimerInterval: NodeJS.Timer | undefined
        private readonly timeToEnd: time.HMSTime

        constructor(props: Props) {
                super()
                props
                this.timeStart = new Date()
                this.timeToEnd = {
                        hour: 0,
                        minutes: 29,
                        seconds: 60,
                        milliseconds: 0
                } // extract from server / reciev from props
        }

        init() {
                this.updateTimerInterval = setInterval(() => {
                        let elapced = new Date().getTime() - this.timeStart.getTime()
                        if (Math.floor((elapced / 1000 / 60) % 60) >= 30) {
                                clearInterval(this.updateTimerInterval)
                        } else {
                                this.emit("timerUpdate", {
                                        hour: this.timeToEnd.hour - Math.floor((elapced / 1000 / 60 / 60) % 24),
                                        minutes: this.timeToEnd.minutes - Math.floor((elapced / 1000 / 60) % 60),
                                        seconds: this.timeToEnd.seconds - Math.floor((elapced / 1000) % 60),
                                        milliseconds: 0
                                })
                        }
                }, 1000)
        }

        destroy() {
                clearInterval(this.updateTimerInterval)
                this.emit("destroy")
        }

        get TimeStart() {
                return this.timeStart
        }
}
