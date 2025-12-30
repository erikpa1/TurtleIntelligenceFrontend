import {Handle, NodeProps, Position} from "reactflow";

import {OUTPUT_HANDLE_STYLE} from "@Turtle/LLM/LLMAgentsDock/Edit/Styles";

import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import NWrapper from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/NWrapper";
import {NodeIcon} from "@Turtle/LLM/LLMAgentsDock/Edit/VisTools/NodeLabel"
import TurtleApp from "@TurtleApp/TurtleApp"
import AgentNodesApi from "@Turtle/LLM/LLMAgentsDock/Api/AgentNodesApi"

export default function TriggerHandle(props: NodeProps<AgentNodeParent>) {


    async function call() {
        TurtleApp.Lock()
        await AgentNodesApi.PlayNode(props.data)
        TurtleApp.Unlock()
    }

    return (
        <NWrapper
            nodeProps={props}
            nodeStyle={{
                width: 40,
                height: 40,
                borderTopLeftRadius: '30px',
                borderBottomLeftRadius: '30px',
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
            }}
        >
            <NodeIcon
                node={props.data}
                onDoubleClick={call}
            />

            <Handle
                id={"a"}
                position={Position.Right}
                type="source"
                style={{
                    ...OUTPUT_HANDLE_STYLE
                }}
            />


        </NWrapper>


    )
}