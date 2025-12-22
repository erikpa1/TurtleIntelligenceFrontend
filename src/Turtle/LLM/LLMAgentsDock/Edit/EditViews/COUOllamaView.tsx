import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import {Form} from "antd";
import SelectHttpMethod from "@TurtlePostman/Components/SelectHttpMethod";
import {HttpTriggerNodeData} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/HttpTriggerNode";
import {WriteToFileNode} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/WriteToFileNode";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import {OllamaNode} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/OllamaNode";

interface COUOllamaViewProps {
    node: AgentNodeParent
}

export default function COUOllamaView({
                                          node
                                      }: COUOllamaViewProps) {

    const data: OllamaNode = node.typeData

    return (
        <>
            <StringAttributeView
                entity={data}
                attribute={"ollamaUrl"}
                inputProps={{
                    placeholder: "http://127.0.0.1:11434"
                }}
            />

            <StringAttributeView
                entity={data}
                attribute={"modelName"}
            />
        </>
    )
}