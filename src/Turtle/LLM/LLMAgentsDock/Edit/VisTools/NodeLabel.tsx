import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import {Flex} from "antd";
import {HierarchyCustomIcon} from "@Turtle/Components/HierarchyComponents";
import IconAutoRenew from "@Turtle/Icons/IconAutoRenew";

interface NodeLabelProps {
    node: AgentNodeParent,
    icon?: any
}

export default function NodeLabel({node, icon}: NodeLabelProps) {
    return (
        <Flex gap={15}>
            <HierarchyCustomIcon icon={icon ?? <IconAutoRenew/>}/>
            <div>{node.name}</div>
        </Flex>

    )
}