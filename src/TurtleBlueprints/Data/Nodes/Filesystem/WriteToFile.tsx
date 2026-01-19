import NodeTypeData from "@TurtleBlueprints/Data/Nodes/NodeTypeData";
import ColorConstants from "@Turtle/Constants/ColorConstants";

import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent";
import {Form} from "antd";

import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import {BoolAttributeView} from "@Turtle/Components/Forms/BoolPropertyView";
import NodeColors from "@TurtleBlueprints/Data/Nodes/NodeColors";


export class WriteToFile extends NodeTypeData {
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

    GetConnectionType(conn: string): string | undefined {
        if (conn == "a") {
            return NodeColors.STRING
        }
        return super.GetConnectionType(conn);
    }
}

interface COUWriteToFileViewProps {
    node: NodeParent
}

export function COUWriteToFileView({
                                       node
                                   }: COUWriteToFileViewProps) {

    const data: WriteToFile = node.typeData as any

    return (
        <Form
            layout={"vertical"}
        >
            <StringAttributeView
                entity={data}
                attribute={"parentFolder"}
            />

            <StringAttributeView
                entity={data}
                attribute={"fileName"}
            />

            <BoolAttributeView
                entity={data}
                attribute={"openFolder"}
            />
            <BoolAttributeView
                entity={data}
                attribute={"useWd"}
            />

        </Form>
    )
}