import NodeTypeData from "@TurtleBlueprints/Data/Nodes/NodeTypeData";
import ColorConstants from "@Turtle/Constants/ColorConstants";

import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent";
import {Form} from "antd";

import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import {BoolAttributeView} from "@Turtle/Components/Forms/BoolPropertyView";



export default class LLMIf extends NodeTypeData{

    static TYPE = "llmIf"

    systemPrompt = ""

    ToJson(): any {
        return {
            systemPrompt: this.systemPrompt,
        }
    }

    FromJson(jObj: any) {
        this.systemPrompt = jObj.systemPrompt ?? this.systemPrompt
    }

    GetConnectionColor(conn: string): string | undefined {
        if (conn === "b" || conn === "a") {
            return ColorConstants.AZURE_BLUE
        }

        return super.GetConnectionColor(conn)
    }
}



interface COUWriteToFileViewProps {
    node: NodeParent
}

export function COULLMIfView({
                                       node
                                   }: COUWriteToFileViewProps) {

    const data: LLMIf = node.typeData as any

    return (
        <Form
            layout={"vertical"}
        >
            <StringAttributeView
                entity={data}
                attribute={"systemPrompt"}
            />

        </Form>
    )
}