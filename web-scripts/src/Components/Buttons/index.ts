import { Component } from 'Types'

export default class extends Component {
        constructor() {
                super()
        }

        setup() {
                document.querySelectorAll("button").forEach((el) => {
                        const gotoAttr = el.attributes.getNamedItem("goto")
                        if (gotoAttr) {
                                el.addEventListener("click", () => {
                                        document.querySelector("#" + gotoAttr.value)?.scrollIntoView()
                                })
                        }

                        if (el.classList.contains("purchase")) {
                                const span = $('<span class="material-symbols-outlined"></span>')
                                $(el).prepend(span)
                                span.html("shopping_cart")
                                $(el).hover(() => {
                                        span.html("south")
                                }, () => {
                                        span.html("shopping_cart")
                                })
                        }
                })
        }

        disconect() {
        }
}
