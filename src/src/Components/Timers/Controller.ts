import { time } from 'helpers/time'
import { Command } from './types'
import { Model } from './Model'

export class Controller {
        constructor(private model: Model) {
        }

        receive(cmd: Command, args?: any){
                var args = args || {}
                switch (cmd) {
                        case "init":
                                this.model.init();
                                break
                        case "destroy":
                                this.model.destroy()
                                break
                        default: console.error('No action specified for ' + cmd + 'command')
                        break
                }
        }
}
