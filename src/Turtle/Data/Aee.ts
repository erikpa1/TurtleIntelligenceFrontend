import React from "react";

export class AnyEventEmmiter {

    events = {}

    static isCtrlPressed = false


    on(event, listener) {

        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    off(event, listener) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(func => func !== listener);
        }
    }

    emit(event: string, data) {
        const evnt = this.events[event]

        if (evnt) {
            evnt.forEach(listener => {
                listener(data);
            });
        }
    }


}

const aee = new AnyEventEmmiter();

export class KeyboardKeys {
    static ESC = "esc"
    static DEL = "del"
    static S = "s"
    static D = "d"
    static Y = "y"
    static SPACE = "space"
}

const CONVERTMAP = new Map([
    ["Escape", KeyboardKeys.ESC],
    ["Delete", KeyboardKeys.DEL],
    ["KeyS", KeyboardKeys.S],
    ["KeyD", KeyboardKeys.D],
    ["KeyY", KeyboardKeys.Y],
    ["Space", KeyboardKeys.SPACE],
])

function receiver_keydown(evt: KeyboardEvent) {
    const keyCode = evt.code
    const hasCtrl = evt.ctrlKey || keyCode === "MetaLeft"

    AnyEventEmmiter.isCtrlPressed = hasCtrl

    const conversion: string = CONVERTMAP.get(keyCode) ?? ""

    if (conversion !== "") {
        if (hasCtrl) {
            aee.emit(`keydown-ctrl-${conversion}`, evt)
        } else {
            aee.emit(`keydown-${conversion}`, evt)
        }
    }
}

function receiver_keyup(evt: KeyboardEvent) {
    const keyCode = evt.code
    const hasCtrl = evt.ctrlKey
    AnyEventEmmiter.isCtrlPressed = hasCtrl
}

window.addEventListener("keydown", receiver_keydown)
window.addEventListener("keyup", receiver_keyup)


export function useAnyEventEmmiter(key: string, fun: any): [] {
    React.useEffect(() => {
        aee.on(key, fun)
        return () => {
            aee.off(key, fun)
        }
    })

    return []
}

export function useKeyDownEvent(key: string, fun: any): [] {
    React.useEffect(() => {
        aee.on(`keydown-${key}`, fun)
        return () => {
            aee.off(`keydown-${key}`, fun)
        }
    })
    return []
}

export function useCtrlKeyDownEvent(key: string, fun: any): [] {
    React.useEffect(() => {
        aee.on(`keydown-ctrl-${key}`, fun)
        return () => {
            aee.off(`keydown-ctrl-${key}`, fun)
        }
    })
    return []
}


export default aee;