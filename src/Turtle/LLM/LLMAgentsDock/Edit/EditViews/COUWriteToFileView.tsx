import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import {Form} from "antd";

import {WriteToFileNode} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/WriteToFileNode";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import {BoolAttributeView} from "@Turtle/Components/Forms/BoolPropertyView";

interface COUWriteToFileViewProps {
    node: AgentNodeParent
}

export default function COUWriteToFileView({
                                               node
                                           }: COUWriteToFileViewProps) {

    const data: WriteToFileNode = node.typeData

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