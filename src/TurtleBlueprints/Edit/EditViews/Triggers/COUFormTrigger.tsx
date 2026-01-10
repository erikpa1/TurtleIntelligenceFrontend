import AgentNodeParent from "@TurtleBlueprints/Data/Nodes/AgentNodeParent"
import {HttpTriggerData} from "@TurtleBlueprints/Data/Nodes/Triggers/HttpTriggerData"
import {StringAreaAttributeView} from "@Turtle/Components/Forms/StringAreaPropertyView"
import {FormTriggerData} from "@TurtleBlueprints/Data/Nodes/Triggers/FormTriggerData";
import {HierarchyAddButton} from "@Turtle/Components/HierarchyComponents";

interface COUFormTriggerProps {
    node: AgentNodeParent
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