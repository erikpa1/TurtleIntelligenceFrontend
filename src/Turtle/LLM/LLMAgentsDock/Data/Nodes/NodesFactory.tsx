import React from "react"
import {HttpTriggerNodeData} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/HttpTriggerNode";
import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";

interface RetFun {
    node: AgentNodeParent
}

export default class NodesFactory {

    static NODES = new Map<string, React.Component<any, any>>()
    static NODE_COUS = new Map<string, React.Component<any, any>>()

    static GetByType(jObj: any) {
        if (jObj.type === "httpTrigger") {
            const tmp = new HttpTriggerNodeData()
            tmp.FromJson(jObj)
            return tmp
        }

        return new HttpTriggerNodeData()
    }

    static GetCOUView(nodeType): React.Component<RetFun> {
        const tmp = this.NODE_COUS.get(nodeType)
        if (tmp) {
            return tmp
        } else {
            return _NotFoundFragment as any
        }
    }

    static Register(type: string, data: any, view: any) {
        this.NODE_COUS.set(type, view)
        this.NODES.set(type, data)
    }

}

function _NotFoundFragment({}) {
    return (
        <div>
            Undefined edit view
        </div>
    )
}