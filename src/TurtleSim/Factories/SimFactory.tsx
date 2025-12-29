import IconFlagCheck from "@Turtle/Icons/IconFlagCheck";

export default class SimFactory {

    static TYPE_SPAWN = "spawn"
    static TYPE_BUFFER = "buffer"
    static TYPE_SINK = "sink"
    static TYPE_PROCESS = "process"
    static TYPE_SPLIT = "split"
    static TYPE_MERGE = "merge"
    static TYPE_QUEUE = "queue"
    static TYPE_DELAY = "delay"
    static TYPE_SWITCH = "switch"
    static TYPE_DOWNTIME = "downtime"
    static TYPE_WORKER_POOL = "workerPool"

    //Actor spawns
    static TYPE_HUMAN = "human"

    static TYPE_TIME_TRIGGER= "timeTrigger"

    static ICONS = {
        [SimFactory.TYPE_SPAWN]: "/icons/flag_check.svg",
        [SimFactory.TYPE_BUFFER]: "/icons/shelves.svg",
        [SimFactory.TYPE_PROCESS]: "/icons/manufacturing.svg",
        [SimFactory.TYPE_SPLIT]: "/icons/call_split.svg",
        [SimFactory.TYPE_MERGE]: "/icons/cell_merge.svg",
        [SimFactory.TYPE_QUEUE]: "/icons/newsstand.svg",
        [SimFactory.TYPE_DELAY]: "/icons/pending_actions.svg",
        [SimFactory.TYPE_SWITCH]: "/icons/fan_indirect.svg",
        [SimFactory.TYPE_SINK]: "/icons/arrow_and_edge.svg",
        [SimFactory.TYPE_DOWNTIME]: "/icons/arrow_and_edge.svg",
        [SimFactory.TYPE_WORKER_POOL]: "/icons/arrow_and_edge.svg",
        [SimFactory.TYPE_TIME_TRIGGER]: "/icons/arrow_and_edge.svg",
    }

    static ICONS_COMPONENTS = {
        [SimFactory.TYPE_SPAWN]: IconFlagCheck
    }

    static ICONS_PNG = {
        [SimFactory.TYPE_SPAWN]: "/iconsPng/flag_check.png",
        [SimFactory.TYPE_BUFFER]: "/iconsPng/shelves.png",
        [SimFactory.TYPE_PROCESS]: "/iconsPng/manufacturing.png",
        [SimFactory.TYPE_SPLIT]: "/iconsPng/call_split.png",
        [SimFactory.TYPE_MERGE]: "/iconsPng/cell_merge.png",
        [SimFactory.TYPE_QUEUE]: "/iconsPng/newsstand.png",
        [SimFactory.TYPE_DELAY]: "/iconsPng/pending_actions.png",
        [SimFactory.TYPE_SWITCH]: "/iconsPng/fan_indirect.png",
        [SimFactory.TYPE_SINK]: "/iconsPng/arrow_and_edge.png",
        [SimFactory.TYPE_DOWNTIME]: "/iconsPng/arrow_and_edge.png",
        [SimFactory.TYPE_WORKER_POOL]: "/iconsPng/arrow_and_edge.png",
        [SimFactory.TYPE_TIME_TRIGGER]: "/iconsPng/arrow_and_edge.png",
    }

    static RIGHT_BAR_COMPONENTS = {}


    static CAN_CON_OUTPUT = {
        [SimFactory.TYPE_SINK]: false
    }

    static CAN_CON_INPUT = {
        [SimFactory.TYPE_SPAWN]: true
    }

    static SPAWNABLE = new Set<string>()
    static ICONSMAP = new Map<string, string>()
    static ICONSMAP_PNG = new Map<string, string>()
    static FIBERS = new Map<string, any>()
    static EDITViews = new Map<string, any>()

    static GetIcon(type: string): string {
        const icon = SimFactory.ICONS[type]
        if (icon) {
            return icon
        }
        return "/icons/flag_check.png"
    }

    static GetIconSvg(type: string): string {
        const icon = SimFactory.ICONS[type]
        if (icon) {
            return icon
        }
        return "/icons/flag_check.png"
    }

    static GetIconPng(type: string): string {
        const icon = SimFactory.ICONS_PNG[type]
        if (icon) {
            return icon
        }
        return "/iconsPng/flag_check.png"
    }

    static GetIconComponent(type: string): any {
        const icon = SimFactory.ICONS_COMPONENTS[type]
        if (icon) {
            return icon
        }
        return IconFlagCheck
    }

    static CanConnectInput(type: string): boolean {
        const can = SimFactory.CAN_CON_INPUT[type]
        if (can !== undefined) {
            return can
        }
        return true
    }

    static CanConnectOutput(type: string): boolean {
        const can = SimFactory.CAN_CON_OUTPUT[type]
        if (can !== undefined) {
            return can
        }
        return true
    }

    static GetRightBarComponent(type: string): any {
        const component = SimFactory.RIGHT_BAR_COMPONENTS[type]

        if (component !== undefined) {
            return component
        }
        return null
    }

    static Register(reg: SimFactoryRegistration) {
        this.SPAWNABLE.add(reg.type)
        this.ICONSMAP.set(reg.type, reg.icon)

        if (reg.iconPng) {
            this.ICONSMAP_PNG.set(reg.type, reg.iconPng)
        }
    }
}

export interface SimFactoryRegistration {
    type: string
    icon?: string | any
    iconPng?: string
    couComponent?: any
    fiber?: any
}