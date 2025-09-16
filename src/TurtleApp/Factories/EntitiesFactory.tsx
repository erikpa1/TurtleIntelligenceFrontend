import IconFlagCheck from "@Turtle/Icons/IconFlagCheck";

export default class EntitiesFactory {

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

    static ICONS = {
        [EntitiesFactory.TYPE_SPAWN]: "/icons/flag_check.svg",
        [EntitiesFactory.TYPE_BUFFER]: "/icons/shelves.svg",
        [EntitiesFactory.TYPE_PROCESS]: "/icons/manufacturing.svg",
        [EntitiesFactory.TYPE_SPLIT]: "/icons/call_split.svg",
        [EntitiesFactory.TYPE_MERGE]: "/icons/cell_merge.svg",
        [EntitiesFactory.TYPE_QUEUE]: "/icons/newsstand.svg",
        [EntitiesFactory.TYPE_DELAY]: "/icons/pending_actions.svg",
        [EntitiesFactory.TYPE_SWITCH]: "/icons/fan_indirect.svg",
        [EntitiesFactory.TYPE_SINK]: "/icons/arrow_and_edge.svg",
        [EntitiesFactory.TYPE_DOWNTIME]: "/icons/arrow_and_edge.svg",
        [EntitiesFactory.TYPE_WORKER_POOL]: "/icons/arrow_and_edge.svg",
    }

    static ICONS_COMPONENTS = {
        [EntitiesFactory.TYPE_SPAWN]: IconFlagCheck
    }

    static ICONS_PNG = {
        [EntitiesFactory.TYPE_SPAWN]: "/iconsPng/flag_check.png",
        [EntitiesFactory.TYPE_BUFFER]: "/iconsPng/shelves.png",
        [EntitiesFactory.TYPE_PROCESS]: "/iconsPng/manufacturing.png",
        [EntitiesFactory.TYPE_SPLIT]: "/iconsPng/call_split.png",
        [EntitiesFactory.TYPE_MERGE]: "/iconsPng/cell_merge.png",
        [EntitiesFactory.TYPE_QUEUE]: "/iconsPng/newsstand.png",
        [EntitiesFactory.TYPE_DELAY]: "/iconsPng/pending_actions.png",
        [EntitiesFactory.TYPE_SWITCH]: "/iconsPng/fan_indirect.png",
        [EntitiesFactory.TYPE_SINK]: "/iconsPng/arrow_and_edge.png",
        [EntitiesFactory.TYPE_DOWNTIME]: "/iconsPng/arrow_and_edge.png",
        [EntitiesFactory.TYPE_WORKER_POOL]: "/iconsPng/arrow_and_edge.png",
    }

    static RIGHT_BAR_COMPONENTS = {}


    static CAN_CON_OUTPUT = {
        [EntitiesFactory.TYPE_SINK]: false
    }

    static CAN_CON_INPUT = {
        [EntitiesFactory.TYPE_SPAWN]: true
    }

    static GetIcon(type: string): string {
        const icon = EntitiesFactory.ICONS[type]
        if (icon) {
            return icon
        }
        return "/icons/flag_check.png"
    }

    static GetIconSvg(type: string): string {
        const icon = EntitiesFactory.ICONS[type]
        if (icon) {
            return icon
        }
        return "/icons/flag_check.png"
    }

    static GetIconPng(type: string): string {
        const icon = EntitiesFactory.ICONS_PNG[type]
        if (icon) {
            return icon
        }
        return "/iconsPng/flag_check.png"
    }

    static GetIconComponent(type: string): any {
        const icon = EntitiesFactory.ICONS_COMPONENTS[type]
        if (icon) {
            return icon
        }
        return IconFlagCheck
    }

    static CanConnectInput(type: string): boolean {
        const can = EntitiesFactory.CAN_CON_INPUT[type]
        if (can !== undefined) {
            return can
        }
        return true
    }

    static CanConnectOutput(type: string): boolean {
        const can = EntitiesFactory.CAN_CON_OUTPUT[type]
        if (can !== undefined) {
            return can
        }
        return true
    }

    static GetRightBarComponent(type: string): any {
        const component = EntitiesFactory.RIGHT_BAR_COMPONENTS[type]

        if (component !== undefined) {
            return component
        }
        return null
    }


}