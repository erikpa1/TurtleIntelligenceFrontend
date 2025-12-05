import {Handle, Position} from "reactflow";

export default function AgentToolNode() {
    return (
        <div>
            <div>Receive</div>
            <Handle id={"a"} position={Position.Left} type="target"/>
            <Handle id={"b"} position={Position.Right} type="source"/>
        </div>
    )
}