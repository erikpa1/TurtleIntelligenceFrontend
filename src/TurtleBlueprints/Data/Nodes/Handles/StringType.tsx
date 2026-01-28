import {Handle, Position} from "reactflow";
import {OUTPUT_HANDLE_STYLE} from "@TurtleBlueprints/Edit/Styles";
import NodeColors from "@TurtleBlueprints/Data/Nodes/NodeColors";


interface StringOutputProps {
    handleId: string
    top?: string
}


export function StringOutput({
                                 handleId,
                                 top = "25%"
                             }: StringOutputProps) {
    return (
        <Handle
            id={handleId}
            position={Position.Right}
            type="source"
            style={{
                ...OUTPUT_HANDLE_STYLE,
                background: NodeColors.STRING,
                top: top
            }}
        />
    )
}


export function StringInput({
                                handleId,
                                top = "25%"
                            }: StringOutputProps) {
    return (
        <Handle
            id={handleId}
            position={Position.Left}
            type="target"
            style={{
                ...OUTPUT_HANDLE_STYLE,
                background: NodeColors.STRING,
                top: top
            }}
        />
    )
}