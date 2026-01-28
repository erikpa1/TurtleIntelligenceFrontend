import {Handle, Position} from "reactflow";
import {OUTPUT_HANDLE_STYLE} from "@TurtleBlueprints/Edit/Styles";
import NodeColors from "@TurtleBlueprints/Data/Nodes/NodeColors";



interface StringOutputProps {
    handleId: string
    top?: string
}


export function ErrorOutput({
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
                background: NodeColors.ERROR,
                top: top
            }}
        />
    )
}
