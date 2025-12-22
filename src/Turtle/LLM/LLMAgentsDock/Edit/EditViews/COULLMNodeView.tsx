import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import {Form} from "antd";
import SelectHttpMethod from "@TurtlePostman/Components/SelectHttpMethod";
import {HttpTriggerNodeData} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/HttpTriggerNode";
import {WriteToFileNode} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/WriteToFileNode";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";

interface COULLMNodeViewProps {
    node: AgentNodeParent
}

export default function COULLMNodeView({
                                               node
                                           }: COULLMNodeViewProps) {

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

        </Form>
    )
}