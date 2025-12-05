import {Handle, Position} from "reactflow";

export default function AgentLLMNode() {

    return (
        <div className="react-flow__node-default">
            <div>LLMagent</div>
            <Handle id={"a"} position={Position.Left} type="target"/>
            <Handle id={"b"} position={Position.Bottom} type="source"/>
            <Handle id={"c"} position={Position.Right} type="source"/>
        </div>
    )

}