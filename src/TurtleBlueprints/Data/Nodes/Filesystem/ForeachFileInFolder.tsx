import {Form} from "antd"
import NodeTypeData from "@TurtleBlueprints/Data/Nodes/NodeTypeData"
import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent"
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView"
import ColorConstants from "@Turtle/Constants/ColorConstants"

export class ForeachFileInFolder extends NodeTypeData {

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

    GetConnectionColor(conn: string): string | undefined {
        if (conn === "loop") {
            return ColorConstants.AZURE_BLUE
        }
        return super.GetConnectionColor(conn);
    }


}


interface COUForeachFileInFolderProps {
    node: NodeParent
}

export function COUForeachFileInFolder({
                                           node
                                       }: COUForeachFileInFolderProps) {

    const data: ForeachFileInFolder = node.typeData as any

    return (
        <Form
            layout={"vertical"}
        >
            <StringAttributeView
                entity={data}
                attribute={"folderPath"}
            />
        </Form>
    )
}