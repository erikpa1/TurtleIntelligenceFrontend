import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent"
import {HttpTriggerData} from "@TurtleBlueprints/Data/Nodes/Triggers/HttpTriggerData"
import {StringAreaAttributeView} from "@Turtle/Components/Forms/StringAreaPropertyView"

interface COUChatTriggeProps {
    node: NodeParent
}

export default function COUChatTrigger({
                                               node
                                           }: COUChatTriggeProps) {

    const data: HttpTriggerData = node.typeData

    return (
        <>
            <StringAreaAttributeView
                entity={data}
                attribute={"triggerDescription"}
            />
        </>
    )
}