import NodeTypeData from "@TurtleBlueprints/Data/Nodes/NodeTypeData";
import ColorConstants from "@Turtle/Constants/ColorConstants";

export class WriteToFileNode extends NodeTypeData {
    parentFolder = "llmOutput"
    fileName = ""
    openFolder = false
    useWd = false


    FromJson(jObj: any) {
        this.parentFolder = jObj.method ?? this.parentFolder
        this.fileName = jObj.fileName ?? this.fileName
        this.openFolder = jObj.openFolder ?? this.openFolder
        this.useWd = jObj.useWd ?? this.useWd
    }

    ToJson(): any {
        return {
            parentFolder: this.parentFolder,
            fileName: this.fileName,
            openFolder: this.openFolder,
            useWd: this.useWd,
        }
    }

    GetConnectionColor(conn: string): string | undefined {
        if (conn == "a") {
            return ColorConstants.AZURE_BLUE
        }
        return super.GetConnectionColor(conn);
    }


}