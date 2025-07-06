import React from "react"
import AgentTool from "@Turtle/AgentTools/AgentTool";
import {Flex} from "antd";

interface AgentToolViewProps {
    agent: AgentTool
}

export default function AgentToolView({agent}: AgentToolViewProps) {

    return (
        <Flex vertical>
            {
                agent.description
            }
        </Flex>
    )
}