import {Handle, NodeProps, Position} from "reactflow";

import {INPUT_HANDLE_STYLE, OUTPUT_HANDLE_STYLE, SUBNODE_HANDLE_STYLE} from "@TurtleBlueprints/Edit/Styles";

import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent";
import NodeLabel from "@TurtleBlueprints/Edit/VisTools/NodeLabel";
import NWrapper from "@TurtleBlueprints/Edit/Nodes/NWrapper";

import {ListLLMInputHandles} from "@TurtleBlueprints/Edit/Nodes/LLMInputs"

export default function AgentLLMNode(props: NodeProps<NodeParent>) {


    return (
        <NWrapper
            nodeProps={props}
        >
            <NodeLabel node={props.data}/>

            <Handle
                id={"a"}
                position={Position.Left}
                type="target"
                style={{
                    ...INPUT_HANDLE_STYLE,
                    background: props.data.typeData.GetConnectionColor("a") ?? "inherit"
                }}
            />

            <Handle
                id={"b"}
                position={Position.Right}
                type="source"
                style={{
                    ...OUTPUT_HANDLE_STYLE,
                    background: props.data.typeData.GetConnectionColor("b") ?? "inherit"
                }}
            />

            {
                ListLLMInputHandles()
            }
        </NWrapper>

    )

}