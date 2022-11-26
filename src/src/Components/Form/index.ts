import { Component } from 'Types'

export default class extends Component {
        constructor() {
                super()
        }

        setup() {
                $('input').focusin(function() {
                        $(this).addClass('input-focus');
                })
                $('input').focusout(function() {
                        $(this).removeClass('input-focus');
                })

                document.querySelectorAll("input.number-only").forEach(e => {
                        // @ts-ignore
                        let iValue: string = String(e.value)
                        e.addEventListener("input", (e) => {
                                // @ts-ignore
                                if (e.target.value.length < iValue.length || Number(e.target.value.replace(iValue, ""))) {
                                        // @ts-ignore
                                        iValue = e.target.value
                                } else {
                                        // @ts-ignore
                                        e.target.value = iValue
                                }
                        })
                })

        }

        disconect() {
        }
}
