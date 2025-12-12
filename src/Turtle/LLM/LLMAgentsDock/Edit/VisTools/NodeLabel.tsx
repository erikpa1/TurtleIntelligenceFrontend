import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import {Flex} from "antd";
import {HierarchyCustomIcon} from "@Turtle/Components/HierarchyComponents";
import IconAutoRenew from "@Turtle/Icons/IconAutoRenew";

interface NodeLabelProps {
    node: AgentNodeParent
}
export default function NodeLabel({node}: NodeLabelProps) {
    return (
        <Flex gap={15}>
            <HierarchyCustomIcon icon={<IconAutoRenew/>}/>
            <div>{node.name}</div>
        </Flex>

    )
}