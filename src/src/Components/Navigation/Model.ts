import { EventEmitter } from 'helpers/EventEmitter'
import { ModelEvents } from './types'

interface Props {
        sectionIds: string[]
        menuButtons: Element[]
}

export class Model extends EventEmitter<ModelEvents> {
        private sectionIds: string[]
        private menuButtons: Element[]
        private prevSectionInd: number
        private currentSectionInd: number

        constructor(props: Props) {
                super()
                this.sectionIds = props.sectionIds
                this.menuButtons = props.menuButtons
                this.prevSectionInd = -1
                this.currentSectionInd = 0
        }

        init() {
        }

        destroy() {
                this.emit("destroy")
        }

        setCurrentSectionId(sectionId: string) {
                if (this.CurrentSectionId != sectionId) {
                        this.prevSectionInd = this.currentSectionInd
                        this.currentSectionInd = this.sectionIds.indexOf(sectionId)
                        this.emit("currentSectionChanged", sectionId)
                }
        }

        get SectionIds() {
                return this.sectionIds
        }

        get PrevSectionId() {
                return this.sectionIds[this.prevSectionInd]
        }

        get CurrentSectionId() {
                return this.sectionIds[this.currentSectionInd]
        }

        get MenuButtons() {
                return this.menuButtons
        }
}
