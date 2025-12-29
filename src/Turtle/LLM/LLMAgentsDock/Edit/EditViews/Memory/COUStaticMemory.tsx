import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import {Form} from "antd";
import SelectHttpMethod from "@TurtlePostman/Components/SelectHttpMethod";
import {HttpTriggerData} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/Triggers/HttpTriggerData";
import {WriteToFileNode} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/WriteToFileNode";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import {OllamaData} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/OllamaData";
import {StaticMemoryData} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/StaticMemoryData"
import {StringAreaAttributeView} from "@Turtle/Components/Forms/StringAreaPropertyView"

interface COUStaticMemoryProps {
    node: AgentNodeParent
}

export default function COUStaticMemory({
                                          node
                                      }: COUStaticMemoryProps) {

    const data: StaticMemoryData = node.typeData

    return (
        <>
            <StringAreaAttributeView
                entity={data}
                attribute={"memoryText"}
                areaProps={{
                    placeholder: "Already named books: Lord of the Rings, Hobbit, Silmarion",
                    minLength: 200
                }}
            />


        </>
    )
}