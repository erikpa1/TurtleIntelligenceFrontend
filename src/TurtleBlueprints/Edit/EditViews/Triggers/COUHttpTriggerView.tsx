import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent";
import {Form} from "antd";
import SelectHttpMethod from "@TurtlePostman/Components/SelectHttpMethod";
import {HttpTriggerData} from "@TurtleBlueprints/Data/Nodes/Triggers/HttpTriggerData";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import {StringAreaAttributeView} from "@Turtle/Components/Forms/StringAreaPropertyView"

interface COUHttpTriggerViewProps {
    node: NodeParent
}

export default function COUHttpTriggerView({
                                               node
                                           }: COUHttpTriggerViewProps) {

    const data: HttpTriggerData = node.typeData

    return (
        <>
            <SelectHttpMethod
                defaultMethod={data.method}
                onChanged={(val) => {
                    data.method = val
                }}
            />

            <StringAreaAttributeView
                entity={data}
                attribute={"demoBody"}
            />
        </>
    )
}