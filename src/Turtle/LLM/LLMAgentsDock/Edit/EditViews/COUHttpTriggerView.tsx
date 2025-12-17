import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import {Form} from "antd";
import SelectHttpMethod from "@TurtlePostman/Components/SelectHttpMethod";
import {HttpTriggerNodeData} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/HttpTriggerNode";

interface COUHttpTriggerViewProps {
    node: AgentNodeParent
}

export default function COUHttpTriggerView({
                                               node
                                           }: COUHttpTriggerViewProps) {

    const data: HttpTriggerNodeData = node.typeData

    return (
        <Form
            layout={"vertical"}

        >
            <SelectHttpMethod
                defaultMethod={data.method}
                onChanged={(val) => {
                    data.method = val
                }}
            />
        </Form>
    )
}