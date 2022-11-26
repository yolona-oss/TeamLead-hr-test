import $ from 'jquery'

export default abstract class Animator<T> {
        constructor(protected element: JQuery<Element>) { }

        abstract animate(animation: T, duration?: string, easing?: string, done?: () => void): Animator<T>
        abstract stop(): Animator<T>
}
