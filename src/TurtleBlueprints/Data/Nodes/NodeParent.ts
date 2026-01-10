import NodesFactory from "@TurtleBlueprints/Data/NodesFactory"
import NodeTypeData, {EmptyTypeData} from "@TurtleBlueprints/Data/Nodes/NodeTypeData";


export enum CanvasStatus {
    NO_CHANGE = 0,
    CREATED = 1,
    MODIFIED = 2
}




export default class NodeParent {
    uid = ""
    name = ""
    parent = ""
    color = ""
    posX = 0
    posY = 0
    type = ""
    connections = {}
    typeData: NodeTypeData = new EmptyTypeData()


    canvasStatus = CanvasStatus.NO_CHANGE

    ToJson(): any {
        return {
            uid: this.uid,
            type: this.type,
            name: this.name,
            parent: this.parent,
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
        this.posX = jObj.posX ?? 0
        this.posY = jObj.posY ?? 0
        this.connections = jObj.connections ?? {}

        this.typeData = NodesFactory.GetDataByType(this.type, jObj.typeData)
    }

    RandomizePosition() {
        const radius = 100

        this.posX = this.posX + (Math.random() * 100 - radius / 2)
        this.posY = this.posY + (Math.random() * 100 - radius / 2)
    }

    GetFlowType(): string {
        return this.type
    }

    SetModified() {
        if (this.canvasStatus !== CanvasStatus.CREATED) {
            this.canvasStatus = CanvasStatus.MODIFIED
        }
    }

}