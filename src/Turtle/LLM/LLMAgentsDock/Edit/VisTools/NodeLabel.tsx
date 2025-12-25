import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import {Flex, Tooltip} from "antd";
import {HierarchyCustomIcon} from "@Turtle/Components/HierarchyComponents";
import IconAutoRenew from "@Turtle/Icons/IconAutoRenew";
import React from "react"
import NodesFactory from "@Turtle/LLM/LLMAgentsDock/Data/NodesFactory"

interface NodeLabelProps {
    node: AgentNodeParent,
    icon?: any
}

export default function NodeLabel({node, icon}: NodeLabelProps) {

    return (
        <Tooltip title={node.name}>
            <Flex gap={5}>
                <HierarchyCustomIcon icon={icon ?? <IconAutoRenew/>}/>
                <div>{node.name}</div>
            </Flex>
        </Tooltip>


    )
}

interface NodeIconProps {
    node: AgentNodeParent,
}


export function NodeIcon({node}: NodeIconProps) {


    const tmp  = React.createElement(NodesFactory.GetIcon(node.type))

    return (
        <Tooltip title={node.name}>
            <Flex gap={5}>
                <HierarchyCustomIcon icon={tmp}/>
            </Flex>
        </Tooltip>


    )
}