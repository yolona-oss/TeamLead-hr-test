import { HoverControllerOpts } from './types'
import Animator from 'helpers/Animator'

// TODO maybe add on mouse in/out timeout substracting by each unreached in/out iteration?
export default class {
        private inTimeout: number
        private outTimeout: number
        private onMouseInDuration: number
        private onMouseOutDuration: number
        private stillHovered: boolean
        private opened: boolean
        private onMouseInAnimation: any
        private onMouseOutAnimation: any
        private onMouseInAnimationEasing: string
        private onMouseOutAnimationEasing: string

        private onMouseInTimer?: NodeJS.Timeout
        private onMouseOutTimer?: NodeJS.Timeout

        constructor(private element: JQuery<Element>, private animator: Animator<any>, opts?: HoverControllerOpts) {
                // in
                this.inTimeout = opts?.onMouseIn?.timeout ?? 0
                this.onMouseInDuration = opts?.onMouseIn?.duration ?? 1000
                this.onMouseInAnimation = opts?.onMouseIn?.animation ?? {}
                this.onMouseInAnimationEasing = opts?.onMouseIn?.easing ?? "linear"

                // out
                this.outTimeout = opts?.onMouseOut?.timeout ?? 0
                this.onMouseOutDuration = opts?.onMouseOut?.duration ?? 1000
                this.onMouseOutAnimation = opts?.onMouseOut?.animation ?? {}
                this.onMouseOutAnimationEasing = opts?.onMouseOut?.easing ?? "linear"

                this.stillHovered = false
                this.opened = false
        }

        create() {
                this.clearTimers()
                this.element.hover(() => this.onMouseIn(), () => this.onMouseOut())
                // this.element.on("mouseover", this.onMouseIn.bind(this))
                // this.element.on("mouseout", this.onMouseOut.bind(this))
        }

        destory() {
                this.clearTimers()
                this.element.hover(() => {}, () => {})
                // this.element.off("mouseover", this.onMouseIn.bind(this));
                // this.element.off("mouseout", this.onMouseOut.bind(this));
        }

        private clearTimers() {
                this.clearTimer({timer: this.onMouseInTimer})
                this.clearTimer({timer: this.onMouseOutTimer})
        }

        private clearTimer(o: {timer: NodeJS.Timeout|undefined}) {
                if (o.timer) {
                        clearTimeout(o.timer)
                        o.timer = undefined
                }
        }

        private onMouseIn() {
                let fn = () => this.animator.stop().animate(this.onMouseInAnimation, this.onMouseInDuration+"ms", this.onMouseInAnimationEasing)
                // let fn = () => this.element.stop().animate(this.onMouseInAnimation, this.onMouseInDuration/*, this.onMouseInAnimationEasing*/)
                this.stillHovered = true

                this.clearTimer({timer: this.onMouseInTimer})
                this.clearTimer({timer: this.onMouseOutTimer})

                if (this.opened) {
                        fn()
                } else {
                        this.onMouseInTimer = setTimeout(() => {
                                if (this.stillHovered) {
                                        this.opened = true
                                        fn()
                                }
                                this.clearTimer({timer: this.onMouseInTimer})
                                this.clearTimer({timer: this.onMouseOutTimer})
                        }, this.inTimeout)
                }
        }

        private onMouseOut() {
                this.clearTimer({timer: this.onMouseOutTimer})
                this.clearTimer({timer: this.onMouseInTimer})
                this.stillHovered = false;
                this.onMouseOutTimer = setTimeout(() => {
                        this.animator.stop().animate(this.onMouseOutAnimation, this.onMouseOutDuration+"ms", this.onMouseOutAnimationEasing, () => {
                                this.opened = false;
                                this.clearTimer({timer: this.onMouseInTimer})
                                this.clearTimer({timer: this.onMouseOutTimer})
                        })
                        // this.element
                        //         .stop()
                        //         .animate(this.onMouseOutAnimation,
                        //                 this.onMouseOutDuration,
                        //                 /*this.onMouseOutAnimationEasing,*/
                        //                 () => {
                        //                         this.opened = false;
                        //                         this.clearTimer({timer: this.onMouseInTimer})
                        //                         this.clearTimer({timer: this.onMouseOutTimer})
                        //                 });
                        this.clearTimer({timer: this.onMouseInTimer})
                        this.clearTimer({timer: this.onMouseOutTimer})
                }, this.outTimeout)
        }
}
