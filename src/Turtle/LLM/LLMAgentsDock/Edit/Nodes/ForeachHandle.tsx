import {Handle, NodeProps, Position} from "reactflow";
import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import {nodeMoveAndModify} from "@Turtle/LLM/LLMAgentsDock/Edit/VisTools/nodeFuncts";
import NWrapper from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/NWrapper";
import NodeLabel, {NodeIcon} from "@Turtle/LLM/LLMAgentsDock/Edit/VisTools/NodeLabel";
import {INPUT_HANDLE_STYLE, OUTPUT_HANDLE_STYLE, SUBNODE_HANDLE_STYLE} from "@Turtle/LLM/LLMAgentsDock/Edit/Styles";
import IconBookmarkManager from "@Turtle/Icons/IconBookmarkManager";
import ColorConstants from "@Turtle/Constants/ColorConstants"


export default function ForeachHandle(props: NodeProps<AgentNodeParent>) {

    return (
        <NWrapper
            nodeProps={props}
            nodeStyle={{
                width: 50,
                height: 50,
                justifyContent: 'center',
            }}
        >
            <NodeIcon node={props.data}/>

            <Handle
                id={"a"}
                position={Position.Left}
                type="target"
                style={{
                    ...INPUT_HANDLE_STYLE
                }}
            />

            <Handle
                id={"loop"}
                position={Position.Right}
                type="source"
                style={{
                    ...OUTPUT_HANDLE_STYLE,
                    top: "25%"
                }}
            />

            <Handle
                id={"loop"}
                position={Position.Right}
                type="source"
                style={{
                    ...OUTPUT_HANDLE_STYLE,
                    top: "75%"
                }}
            />
        </NWrapper>

    )

}