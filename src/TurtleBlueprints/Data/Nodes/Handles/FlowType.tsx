import {Handle, Position} from "reactflow";
import {OUTPUT_HANDLE_STYLE} from "@TurtleBlueprints/Edit/Styles";


interface FlowOutputProps {
    handleId: string
    top?: string
}


export function FlowOutput({
                               handleId,
                               top = "25%"
                           }: FlowOutputProps) {
    return (
        <Handle
            id={handleId}
            position={Position.Right}
            type="source"
            style={{
                ...OUTPUT_HANDLE_STYLE,
                top: top
            }}
        />
    )
}

export function FlowInput({
                               handleId,
                               top = "25%"
                           }: FlowOutputProps) {
    return (
        <Handle
            id={handleId}
            position={Position.Left}
            type="target"
            style={{
                ...OUTPUT_HANDLE_STYLE,
                top: top
            }}
        />
    )
}