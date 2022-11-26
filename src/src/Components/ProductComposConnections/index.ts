import { Component } from 'Types'
import LineDrawer from 'helpers/LineDrawer'

export default class extends Component {
        productComponentsLineDrawer: LineDrawer

        constructor() {
                super()
                this.productComponentsLineDrawer = new LineDrawer($("#product-compose .svg-container"))
        }

        setup() {
                for (let ingredient of $("#product-compose .ingredient")) {
                        if (!ingredient) {
                                continue
                        }
                        this.productComponentsLineDrawer
                                .createConnection(
                                        $(ingredient),
                                        $("#product-compose > .content > .compose-center-block"),
                                        { width: "10px", color: "#000" }
                                )
                }
        }

        disconect() {
        }
}
