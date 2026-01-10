import AgentNodeParent from "@TurtleBlueprints/Data/Nodes/AgentNodeParent"
import {HttpTriggerData} from "@TurtleBlueprints/Data/Nodes/Triggers/HttpTriggerData"
import {StringAreaAttributeView} from "@Turtle/Components/Forms/StringAreaPropertyView"

interface COUChatTriggeProps {
    node: AgentNodeParent
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