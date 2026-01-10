import NodeTypeData from "@TurtleBlueprints/Data/Nodes/NodeTypeData";
import ColorConstants from "@Turtle/Constants/ColorConstants";

export default class LoadFileStringData extends NodeTypeData {

    static TYPE = "loadFileString"

    filePath = ""

    ToJson() {
        return {
            filePath: this.filePath
        }
    }

    FromJson(jObj: any) {
        this.filePath = jObj.filePath ?? this.filePath
    }

    GetConnectionColor(conn: string): string | undefined {
        if (conn === "b") {
            return ColorConstants.AZURE_BLUE
        }
        return super.GetConnectionColor(conn);
    }
}

