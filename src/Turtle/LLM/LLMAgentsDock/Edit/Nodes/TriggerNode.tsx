import {Handle, NodeProps, Position} from "reactflow";

import {OUTPUT_HANDLE_STYLE} from "@Turtle/LLM/LLMAgentsDock/Edit/Styles";

import AgentNodeParent, {CanvasStatus} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import NWrapper from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/NWrapper";
import NodeLabel, {NodeIcon} from "@Turtle/LLM/LLMAgentsDock/Edit/VisTools/NodeLabel"

export default function TriggerNode(props: NodeProps<AgentNodeParent>) {


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

            <NodeIcon node={props.data}/>

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