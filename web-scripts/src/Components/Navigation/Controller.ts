import { Command } from './types'
import { Model } from './Model'

export class Controller {
        private observer: IntersectionObserver

        constructor(private model: Model) {
                const observerSettings: IntersectionObserverInit = {
                        root: null,
                        // rootMargin: "0",
                        threshold: .7
                }

                this.observer = new IntersectionObserver(
                        this.onInterserct.bind(this), 
                        observerSettings
                )

                for (let section of this.model.SectionIds) {
                        const element = document.querySelector("#" + section + " .content")
                        console.log(element)
                        element && element.setAttribute("link-block-id", section)
                        element && this.observer.observe(element)
                }
        }

        private onInterserct(entries: IntersectionObserverEntry[]) {
                for (let entry of entries) {
                        if (entry.isIntersecting) {
                                this.model.setCurrentSectionId(entry.target.attributes.getNamedItem("link-block-id")!.value)
                                break
                        }
                }
        }

        receive(cmd: Command, args?: any){
                var args = args || {}
                switch(cmd) {
                        case "init":
                                this.model.init();
                                break
                        case "destroy":
                                this.observer.disconnect()
                                this.model.destroy()
                                break
                        case "menuClick":
                                this.model.setCurrentSectionId(args.sectionId)
                                break;
                        default: console.error('No action specified for ' + cmd + 'command')
                        break
                }
        }
}
