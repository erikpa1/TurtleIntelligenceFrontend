import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent"
import {HttpTriggerData} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/Triggers/HttpTriggerData"
import {StringAreaAttributeView} from "@Turtle/Components/Forms/StringAreaPropertyView"

interface COUFormTriggerProps {
    node: AgentNodeParent
}

export default function COUFormTrigger({
                                           node
                                       }: COUFormTriggerProps) {

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