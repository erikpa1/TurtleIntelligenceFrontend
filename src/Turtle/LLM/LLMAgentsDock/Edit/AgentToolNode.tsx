import {Handle, Position} from "reactflow";
import {INPUT_HANDLE_STYLE, OUTPUT_HANDLE_STYLE, SUBNODE_HANDLE_STYLE} from "@Turtle/LLM/LLMAgentsDock/Edit/Styles";

export default function AgentToolNode() {
    return (
        <div>
            <div>Receive</div>

            <Handle
                id={"a"}
                position={Position.Left}
                type="target"
                style={{
                    ...INPUT_HANDLE_STYLE
                }}
            />


            <Handle
                id={"b"}
                position={Position.Right}
                type="source"
                style={{
                    ...OUTPUT_HANDLE_STYLE
                }}
            />
        </div>
    )
}