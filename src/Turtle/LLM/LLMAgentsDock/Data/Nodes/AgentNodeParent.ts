export enum PhaseType {
    TRIGGER = 0,
    CONTROL = 1,
    OUTPUT = 2
}

export enum CanvasStatus {
    NO_CHANGE = 0,
    CREATED = 1,
    MODIFIED = 2
}

export default class AgentNodeParent {
    uid = ""
    name = ""
    parent = ""
    posX = 0
    posY = 0
    type = ""
    phaseType: PhaseType = PhaseType.TRIGGER
    connections = {}
    typeData = {}


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
            typeData: this.typeData,
            connections: this.connections,
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.type = jObj.type ?? ""
        this.name = jObj.name ?? ""
        this.parent = jObj.parent ?? ""
        this.phaseType = jObj.phaseType ?? PhaseType.TRIGGER
        this.posX = jObj.posX ?? 0
        this.posY = jObj.posY ?? 0
        this.typeData = jObj.typeData ?? {}
        this.connections = jObj.connections ?? {}
    }

    RandomizePosition() {
        const radius = 100

        this.posX = this.posX + (Math.random() * 100 - radius / 2)
        this.posY = this.posY + (Math.random() * 100 - radius / 2)
    }

    GetFlowType(): string {
        if (this.phaseType == PhaseType.TRIGGER) {
            return "trigger"
        } else {
            return "default"
        }
    }

    SetModified() {
        if (this.canvasStatus !== CanvasStatus.CREATED) {
            this.canvasStatus = CanvasStatus.MODIFIED
        }
    }

}