import AgentNodeParent from "@TurtleBlueprints/Data/Nodes/AgentNodeParent";
import {Form} from "antd";

import {WriteToFileNode} from "@TurtleBlueprints/Data/Nodes/WriteToFileNode";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import {BoolAttributeView} from "@Turtle/Components/Forms/BoolPropertyView";
import LoadFileStringData from "@TurtleBlueprints/Data/Nodes/Filesystem/LoadFileStringData";

interface COULoadFileStringViewProps {
    node: AgentNodeParent
}

export default function COULoadFileStringView({
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