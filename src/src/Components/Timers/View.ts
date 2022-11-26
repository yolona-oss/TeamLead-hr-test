import { time } from 'helpers/time'
import { EventEmitter } from 'helpers/EventEmitter'
import { Model } from './Model'
import { Controller } from './Controller'
import { Command } from './types'

export class View extends EventEmitter {
        private controller?: Controller

        constructor(private model: Model) {
                super()

                this.model.on("destroy", () => {
                        this.destory()
                })

                this.model.on("timerUpdate", this.updateTimers)
        }

        init() {
                this.notify("init")
        }

        destory() {
        }

        updateTimers(cur: time.HMSTime) {
                document.querySelectorAll(".timer").forEach(e => {
                        const h = e.querySelector(".hours")
                        const m = e.querySelector(".minutes")
                        const s = e.querySelector(".seconds")
                        const ms = e.querySelector(".milliseconds")
                        if (h) {
                                h.innerHTML = ('0' + cur.hour).substr(-2)
                        }
                        if (m) {
                                m.innerHTML = ('0' + cur.minutes).substr(-2)
                        }
                        if (s) {
                                s.innerHTML = ('0' + cur.seconds).substr(-2)
                        }
                        if (ms) {
                                ms.innerHTML = ('0' + cur.milliseconds).substr(-2)
                        }
                })
        }

        setController(controller: Controller) {
                this.controller = controller
        }

        notify(cmd: Command, args?: any) {
                this.controller?.receive(cmd, args);
        }
}
