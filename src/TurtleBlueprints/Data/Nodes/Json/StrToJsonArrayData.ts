import NodeTypeData from "@TurtleBlueprints/Data/Nodes/NodeTypeData"
import ColorConstants from "@Turtle/Constants/ColorConstants";
import NodeColors from "@TurtleBlueprints/Data/Nodes/NodeColors";

export default class StrToJsonArrayData extends NodeTypeData {

    static TYPE = "strToJsonArray"

    folderPath = ""

    ToJson() {
        return {}
    }

    FromJson(jObj: any) {

    }

    GetConnectionType(conn: string): string | undefined {

        if (conn == "a") {
            return NodeColors.STRING
        }

        return super.GetConnectionType(conn);
    }
}

