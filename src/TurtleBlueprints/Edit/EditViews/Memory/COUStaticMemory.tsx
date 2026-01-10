import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent";
import {Form} from "antd";
import SelectHttpMethod from "@TurtlePostman/Components/SelectHttpMethod";
import {HttpTriggerData} from "@TurtleBlueprints/Data/Nodes/Triggers/HttpTriggerData";
import {WriteToFileNode} from "@TurtleBlueprints/Data/Nodes/WriteToFileNode";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import {OllamaData} from "@TurtleBlueprints/Data/Nodes/OllamaData";
import {StaticMemoryData} from "@TurtleBlueprints/Data/Nodes/StaticMemoryData"
import {StringAreaAttributeView} from "@Turtle/Components/Forms/StringAreaPropertyView"

interface COUStaticMemoryProps {
    node: NodeParent
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