import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent"
import {HttpTriggerData} from "@TurtleBlueprints/Data/Nodes/Triggers/HttpTriggerData"
import {StringAreaAttributeView} from "@Turtle/Components/Forms/StringAreaPropertyView"
import {FormTriggerData} from "@TurtleBlueprints/Data/Nodes/Triggers/FormTriggerData";
import {HierarchyAddButton} from "@Turtle/Components/HierarchyComponents";

interface COUFormTriggerProps {
    node: NodeParent
}

export default function COUFormTrigger({
                                           node
                                       }: COUFormTriggerProps) {

    const data: FormTriggerData = node.typeData

    return (
        <>
            <HierarchyAddButton onClick={() => {
                console.log("Here")
            }}/>
        </>
    )
}