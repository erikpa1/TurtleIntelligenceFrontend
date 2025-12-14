
export enum NodeConnStatus {
    NOT_MODIFIED = 0,
    MODIFIED = 1,
    NEW = 2
}

export default class AgentNodeEdge {
    runTimeUid = ""

    uid = ""
    parent = ""
    source = ""
    sourceHandle = ""
    target = ""
    targetHandle = ""
    priority = 0


    _status = NodeConnStatus.NOT_MODIFIED
    _arrayIndex = 0

    ToJson(): any {
        return {
            uid: this.uid,
            parent: this.parent,
            source: this.source,
            sourceHandle: this.sourceHandle,
            target: this.target,
            targetHandle: this.targetHandle,
            priority: this.priority
        }
    }

    FromJson(jObj: any) {

        console.log(jObj)

        this.uid = jObj.uid ?? ""
        this.parent = jObj.parent ?? ""
        this.source = jObj.source ?? ""
        this.sourceHandle = jObj.sourceHandle ?? ""
        this.target = jObj.target
        this.targetHandle = jObj.targetHandle ?? ""
        this.priority = 0

        this.CreateRuntimeUid()

    }

    CreateRuntimeUid() {
        this.runTimeUid = `${this.source}-${this.sourceHandle}-${this.target}-${this.targetHandle}`
    }

}