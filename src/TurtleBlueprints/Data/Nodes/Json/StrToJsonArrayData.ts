import NodeTypeData from "@TurtleBlueprints/Data/Nodes/NodeTypeData"
import ColorConstants from "@Turtle/Constants/ColorConstants";

export default class StrToJsonArrayData extends NodeTypeData {

    static TYPE = "strToJsonArray"

    folderPath = ""

    ToJson() {
        return {}
    }

    FromJson(jObj: any) {

    }

    GetConnectionColor(conn: string): string | undefined {

        if (conn == "a") {
            return ColorConstants.AZURE_BLUE
        }

        return super.GetConnectionColor(conn);
    }
}

