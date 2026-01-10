
import NodeTypeData from "@TurtleBlueprints/Data/Nodes/NodeTypeData";

export default class SqliteNode extends NodeTypeData {

    static TYPE = "sqlite"

    path = ""
    preload = false

    ToJson(): any {
        return {
            path: this.path,
            preConnect: this.preload,
        }
    }

    FromJson(jObj: any) {
        this.path = jObj.path ?? this.path
        this.preload = jObj.preload ?? this.preload
    }
}


