import Animator from './index'

type Animation = string

function css_time_to_milliseconds(time_string: string) {
        let num = parseFloat(time_string)
        let unit = time_string.match(/m?s/)
        let milliseconds: number

        if (unit) {
                // @ts-ignore
                unit = unit[0];
        }

        switch (unit) {
                //@ts-ignore
                case "s": // seconds
                        milliseconds = num * 1000;
                        break;
                //@ts-ignore
                case "ms": // milliseconds
                        milliseconds = num;
                        break;
                default:
                        milliseconds = 0;
                break;
        }

        return milliseconds;
}

export class TransformAnimator extends Animator<Animation> {
        private isFirstTime: boolean = true

        constructor(element: JQuery<Element>) {
                super(element)
        }

        animate(animation: Animation, duration?: string, easing?: string, done?: () => void) {
                duration && this.element.css("transition-duration", duration)
                easing && this.element.css("transition-timing-function", easing)
                this.element.css("transform", animation)
                duration && done && setTimeout(done, css_time_to_milliseconds(duration))

                return this;
        }

        stop() {
                if (!this.isFirstTime) {
                        this.element.css("transform", "unset")
                } else {
                        this.isFirstTime = false
                }

                return this;
        }
}
