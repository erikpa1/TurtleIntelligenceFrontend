import {Handle, NodeProps, Position} from "reactflow";
import {INPUT_HANDLE_STYLE, OUTPUT_HANDLE_STYLE, SUBNODE_HANDLE_STYLE} from "@Turtle/LLM/LLMAgentsDock/Edit/Styles";
import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";

export default function AgentToolNode({
                                          data
                                      }: NodeProps<AgentNodeParent>) {
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