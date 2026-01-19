import {Form} from "antd"
import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent"

import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView"
import {BoolAttributeView} from "@Turtle/Components/Forms/BoolPropertyView"
import NodeTypeData from "@TurtleBlueprints/Data/Nodes/NodeTypeData";
import ColorConstants from "@Turtle/Constants/ColorConstants";
import NodeColors from "@TurtleBlueprints/Data/Nodes/NodeColors";

export class LoadFileStringData extends NodeTypeData {

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

    GetConnectionType(conn: string): string | undefined {
        if (conn === "b") {
            return NodeColors.STRING
        }
        return super.GetConnectionType(conn);
    }
}


interface COULoadFileStringViewProps {
    node: NodeParent
}

export function COULoadFileStringView({
                                          node
                                      }: COULoadFileStringViewProps) {

    const data: LoadFileStringData = node.typeData as any

    return (
        <Form
            layout={"vertical"}
        >
            <StringAttributeView
                entity={data}
                attribute={"filePath"}
            />

            <BoolAttributeView
                entity={data}
                attribute={"useWd"}
            />

        </Form>
    )
}


