import NodeTypeData from "@TurtleBlueprints/Data/Nodes/NodeTypeData";
import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent";
import {Form} from "antd";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import {BoolAttributeView} from "@Turtle/Components/Forms/BoolPropertyView";
import {WriteToFile} from "@TurtleBlueprints/Data/Nodes/Filesystem/WriteToFile";

export class MoveFile extends NodeTypeData {

    static TYPE = "moveFile";

    sourceFile = ""

    targetFolder = ""
    targetName = ""


    ToJson() {
        return {
            sourceFile: this.sourceFile,
            targetFolder: this.targetFolder,
            targetName: this.targetName
        }
    }

    FromJson(jObj: any) {
        this.sourceFile = jObj.sourceFile ?? this.sourceFile
        this.targetFolder = jObj.targetFolder ?? this.targetFolder
        this.targetName = jObj.targetName ?? this.targetName
    }
}

interface _COUMoveFile {
    node: NodeParent
}

export function COUMoveToFileView({
                                      node
                                  }: _COUMoveFile) {

    const data: WriteToFile = node.typeData as any

    return (
        <Form layout={"vertical"}>

            <StringAttributeView
                entity={data}
                attribute={"sourceFile"}
            />

            <StringAttributeView
                entity={data}
                attribute={"targetFolder"}
            />

            <StringAttributeView
                entity={data}
                attribute={"targetName"}
            />

        </Form>
    )
}

