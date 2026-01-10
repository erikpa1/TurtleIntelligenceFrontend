import NodeTypeData from "@TurtleBlueprints/Data/Nodes/NodeTypeData";

export class HttpTriggerData extends NodeTypeData {

    static TYPE = "httpTrigger"

    limiter = 0
    method = "GET"

    demoBody = ""
    demoFile = null

    FromJson(jObj: any) {
        this.method = jObj.method ?? this.method
        this.demoBody = jObj.demoBody ?? this.demoBody
        this.demoFile = jObj.demoFile ?? this.demoFile
    }

    ToJson(): any {
        return {
            method: this.method,
            demoBody: this.demoBody,
            demoFile: this.demoFile
        }
    }


}