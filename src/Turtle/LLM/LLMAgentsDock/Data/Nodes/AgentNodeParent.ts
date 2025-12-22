import NodesFactory from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/NodesFactory";

export enum NodePhaseType {
    TRIGGER = 0,
    ACTION = 1,
    OUTPUT = 2,
    AGENT = 3,
    DATABASE = 4
}

export enum CanvasStatus {
    NO_CHANGE = 0,
    CREATED = 1,
    MODIFIED = 2
}


class EmptyTypeData {
    ToJson(): any {
        return {}
    }

    FromJson(jObj: any) {

    }
}

export default class AgentNodeParent {
    uid = ""
    name = ""
    parent = ""
    posX = 0
    posY = 0
    type = ""
    phaseType: NodePhaseType = NodePhaseType.TRIGGER
    connections = {}
    typeData: EmptyTypeData | any = new EmptyTypeData()


    canvasStatus = CanvasStatus.NO_CHANGE

    ToJson(): any {
        return {
            uid: this.uid,
            type: this.type,
            name: this.name,
            parent: this.parent,
            phaseType: this.phaseType,
            posX: this.posX,
            posY: this.posY,
            typeData: this.typeData.ToJson(),
            connections: this.connections,
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.type = jObj.type ?? ""
        this.name = jObj.name ?? ""
        this.parent = jObj.parent ?? ""
        this.phaseType = jObj.phaseType ?? NodePhaseType.TRIGGER
        this.posX = jObj.posX ?? 0
        this.posY = jObj.posY ?? 0
        this.connections = jObj.connections ?? {}
        this.typeData = NodesFactory.GetByType(jObj.typeData)
    }

    RandomizePosition() {
        const radius = 100

        this.posX = this.posX + (Math.random() * 100 - radius / 2)
        this.posY = this.posY + (Math.random() * 100 - radius / 2)
    }

    GetFlowType(): string {
        if (this.phaseType == NodePhaseType.TRIGGER) {
            return "trigger"
        } else {
            return this.type
        }
    }

    SetModified() {
        if (this.canvasStatus !== CanvasStatus.CREATED) {
            this.canvasStatus = CanvasStatus.MODIFIED
        }
    }

}