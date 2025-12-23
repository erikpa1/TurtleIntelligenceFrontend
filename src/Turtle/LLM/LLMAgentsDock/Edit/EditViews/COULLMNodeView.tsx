import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import {Form} from "antd";
import SelectHttpMethod from "@TurtlePostman/Components/SelectHttpMethod";
import {HttpTriggerData} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/HttpTriggerData";
import {WriteToFileNode} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/WriteToFileNode";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import LLMAgentData from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/LLMAgentData";

interface COULLMNodeViewProps {
    node: AgentNodeParent
}

export default function COULLMNodeView({
                                               node
                                           }: COULLMNodeViewProps) {

    const data: LLMAgentData = node.typeData

    return (
        <Form
            layout={"vertical"}
        >
            <StringAttributeView
                entity={data}
                attribute={"systemPrompt"}
            />

            <StringAttributeView
                entity={data}
                attribute={"userPrompt"}
            />

        </Form>
    )
}