import $ from 'jquery'
import Navigation from './Components/Navigation'
import Timers from './Components/Timers'
import ButtonsConntroller from './Components/Buttons'
import Form from './Components/Form'

let navigation: Navigation
let timers: Timers
let buttons: ButtonsConntroller
let form: Form

$(() => {
        // navigation component
        navigation = new Navigation()
        navigation.setup()

        form = new Form()
        form.setup()

        timers = new Timers()
        timers.setup()

        buttons = new ButtonsConntroller()
        buttons.setup()
})

window.addEventListener("onunload", async () => {
        navigation.disconect()
        timers.disconect()
        form.disconect()
})

window.addEventListener("onbeforeprint", async () => {
        navigation.disconect()
        timers.disconect()
})
