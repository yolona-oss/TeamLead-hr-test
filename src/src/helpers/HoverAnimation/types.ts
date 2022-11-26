export interface HoverControllerActionOpts {
        duration: number
        animation: any
        timeout: number
        easing: string
}

export interface HoverControllerOpts {
        onMouseIn?: Partial<HoverControllerActionOpts>
        onMouseOut?: Partial<HoverControllerActionOpts>
}
