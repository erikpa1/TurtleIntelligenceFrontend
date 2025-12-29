import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import {Form} from "antd";
import SelectHttpMethod from "@TurtlePostman/Components/SelectHttpMethod";
import {HttpTriggerData} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/Triggers/HttpTriggerData";
import {WriteToFileNode} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/WriteToFileNode";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import {OllamaData} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/OllamaData";

interface COUOllamaViewProps {
    node: AgentNodeParent
}

export default function COUOllamaView({
                                          node
                                      }: COUOllamaViewProps) {

    const data: OllamaData = node.typeData

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