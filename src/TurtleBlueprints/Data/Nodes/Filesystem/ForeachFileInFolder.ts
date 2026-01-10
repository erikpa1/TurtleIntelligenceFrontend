import NodeTypeData from "@TurtleBlueprints/Data/Nodes/NodeTypeData";

export default class ForeachFileInFolder extends NodeTypeData {

    static TYPE = "foreachFileInFolder";

    folderPath = ""


    ToJson() {
        return {
            folderPath: this.folderPath
        }
    }

    FromJson(jObj: any) {
        this.folderPath = jObj.folderPath ?? this.folderPath
    }
}

