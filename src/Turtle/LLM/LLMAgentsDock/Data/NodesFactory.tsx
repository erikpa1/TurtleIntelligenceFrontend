import React from "react"

import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import {IconSimulation} from "@Turtle/Icons"

interface RetFun {
    node: AgentNodeParent
}


export type NodeRegistration = {
    type: string
    couComponent?: any
    dataConstructor?: any
    icon?: string | any
}


export default class NodesFactory {

    static NODES_DATA = new Map<string,any>()
    static NODES = new Map<string, React.Component<any, any>>()
    static NODE_COUS = new Map<string, React.Component<any, any>>()
    static NODE_ICONS = new Map<string, React.Component | string>()
    static NODE_HANDLERS = {}

    static GetDataByType(type: string,jObj: any) {
        const tmpConstructor = this.NODES_DATA.get(type)

        if (Boolean(tmpConstructor) == false) {
            console.log(jObj)
            console.error(`Failed to get constructor of: [${type}]`)
        }

        const tmp = new (tmpConstructor?? EmptyNodeData)()
        tmp.FromJson(jObj)
        return tmp

    }

    static GetCOUView(nodeType): React.Component<RetFun> {
        const tmp = this.NODE_COUS.get(nodeType)
        if (tmp) {
            return tmp
        } else {
            return _NotFoundFragment as any
        }
    }

    static GetIcon(nodeType): any {
        const tmp = this.NODE_ICONS.get(nodeType)
        if (tmp) {
            return tmp
        } else {
            return IconSimulation as any
        }
    }

    static Register(reg: NodeRegistration) {

        if (reg.couComponent) {
            this.NODE_COUS.set(reg.type, reg.couComponent)
        }

        if (reg.dataConstructor) {
            this.NODES_DATA.set(reg.type, reg.dataConstructor)
        }

        if (reg.icon) {
            this.NODE_ICONS.set(reg.type,reg.icon)
        }

    }

    static CleanUp() {
        this.NODES.clear()
        this.NODE_COUS.clear()
        this.NODE_HANDLERS = {}
        this.NODES_DATA.clear()
    }

}

function _NotFoundFragment({}) {
    return (
        <div>
            Undefined edit view
        </div>
    )
}

class EmptyNodeData {
    ToJson() {
        return Object.entries(this)
    }
    FromJson(jObj: any) {
        Object.entries(jObj).forEach(([key, value]) => {
            this[key] = value
        })
    }
}