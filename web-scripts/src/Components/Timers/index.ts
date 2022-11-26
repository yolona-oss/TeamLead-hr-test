import { Component } from 'Types'
import { Controller } from './Controller'
import { View } from './View'
import { Model } from './Model'

export default class extends Component {
        // @ts-expect-error
        private model: Model
        // @ts-expect-error
        private controller: Controller
        // @ts-expect-error
        private view: View

        constructor() {
                super()
        }

        setup() {
                this.model = new Model({});
                this.controller = new Controller(this.model)
                this.view = new View(this.model)
                this.view.setController(this.controller)

                this.view.init()
        }

        disconect() {
                this.controller?.receive("destroy")
        }
}
