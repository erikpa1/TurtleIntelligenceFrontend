import {Handle, Position} from "reactflow";
import ColorConstants from "@Turtle/Constants/ColorConstants";
import {OUTPUT_HANDLE_STYLE} from "@Turtle/LLM/LLMAgentsDock/Edit/Styles";

export default function AgentTriggerNode() {
    return (
        <div
            className="react-flow__node-default"
            style={{
                width: 100,
                borderColor: ColorConstants.GRAY,
                borderTopLeftRadius: '30px',
                borderBottomLeftRadius: '30px',
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
            }}
        >
            <div>Trigger</div>
            <Handle
                id={"a"}
                position={Position.Right}
                type="source"
                style={{
                    ...OUTPUT_HANDLE_STYLE
                }}
            />
        </div>
    )
}