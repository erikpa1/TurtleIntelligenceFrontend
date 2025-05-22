import IconFlagCheck from "@Turtle/Icons/IconFlagCheck";

export default class EntitiesFactory {

    static TYPE_SPAWN = "spawn"
    static TYPE_BUFFER = "buffer"
    static TYPE_SINK = "sink"

    static ICONS = {
        [EntitiesFactory.TYPE_SPAWN]: "/icons/flag_check.png"
    }

    static ICONS_COMPONENTS = {
        [EntitiesFactory.TYPE_SPAWN]: IconFlagCheck
    }

    static ICONS_PNG = {
        [EntitiesFactory.TYPE_SPAWN]: "/iconsPng/flag_check.png",
        [EntitiesFactory.TYPE_BUFFER]: "/iconsPng/shelves.png"
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