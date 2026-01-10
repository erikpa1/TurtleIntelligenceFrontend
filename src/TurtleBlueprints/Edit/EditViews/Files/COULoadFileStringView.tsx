import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent";
import {Form} from "antd";

import {WriteToFileNode} from "@TurtleBlueprints/Data/Nodes/WriteToFileNode";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import {BoolAttributeView} from "@Turtle/Components/Forms/BoolPropertyView";
import LoadFileStringData from "@TurtleBlueprints/Data/Nodes/Filesystem/LoadFileStringData";

interface COULoadFileStringViewProps {
    node: NodeParent
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