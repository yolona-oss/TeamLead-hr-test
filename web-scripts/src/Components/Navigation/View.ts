import $ from 'jquery'
import { EventEmitter } from 'helpers/EventEmitter'
import { Model } from './Model'
import { Controller } from './Controller'
import { Command } from './types'
import { HoverAnimation, TransformAnimator } from 'helpers'

export class View extends EventEmitter<{}> {
        private controller?: Controller
        private MenuHoverAnimationController: HoverAnimation

        constructor(private model: Model) {
                super()
                this.MenuHoverAnimationController = new HoverAnimation(
                        $(".nav"),
                        new TransformAnimator($(".nav")),
                        {
                                onMouseIn: {
                                        timeout: 600,
                                        animation: "translateX(0%)",
                                        duration: 1000,
                                        easing: "ease-out"
                                },
                                onMouseOut: {
                                        timeout: 1000,
                                        animation: "translateX(calc(100% - 2.5rem))",
                                        duration: 800,
                                        easing: "ease-in"
                                }
                        }
                )

                this.model.on("currentSectionChanged", (sectionId) => {
                        // activate current
                        this.getButtonByGotoId(sectionId)?.classList.add("active")
                        $("#" + sectionId).addClass("active")
                        // deactivate previous
                        if (this.model.PrevSectionId != sectionId) {
                                this.getButtonByGotoId(this.model.PrevSectionId)?.classList.remove("active")
                                $("#" + this.model.PrevSectionId).removeClass("active")
                        }
                })

                this.model.on("destroy", () => {
                        this.destory()
                })
        }

        init() {
                this.MenuHoverAnimationController.create()

                // callbacks
                this.notify = this.notify.bind(this)
                this.getButtonByGotoId = this.getButtonByGotoId.bind(this)

                this.setupMenuClickListners()

                this.notify("init")
        }

        destory() {
                this.MenuHoverAnimationController.destory()
        }

        private setupMenuClickListners() {
                this.model.MenuButtons.forEach(e => {
                        const goto = e.attributes.getNamedItem("goto")?.value
                        if (goto && typeof goto == "string") {
                                $(e).on("click", () => {
                                        document.querySelector("#"+goto)?.scrollIntoView()
                                        this.notify("menuClick", {sectionId: goto})
                                })
                        }
                })
        }

        private getButtonByGotoId(goto: string) {
                return this.model.MenuButtons.find(el => el.attributes.getNamedItem("goto")?.value == goto)
        }

        setController(controller: Controller) {
                this.controller = controller
        }

        notify(cmd: Command, args?: any) {
                this.controller?.receive(cmd, args);
        }
}
