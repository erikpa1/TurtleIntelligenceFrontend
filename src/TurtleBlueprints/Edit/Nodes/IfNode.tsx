import {Handle, NodeProps, Position} from "reactflow"
import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent"
import NWrapper from "@TurtleBlueprints/Edit/Nodes/NWrapper"
import NodeLabel from "@TurtleBlueprints/Edit/VisTools/NodeLabel"
import {INPUT_HANDLE_STYLE, OUTPUT_HANDLE_STYLE} from "@TurtleBlueprints/Edit/Styles"

export default function IfHandle(props: NodeProps<NodeParent>) {

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
                    top: "25%",
                    background: props.data.typeData.GetConnectionColor("a") ?? "inherit"
                }}
            />

            <Handle
                id={"true"}
                position={Position.Right}
                type="source"
                style={{
                    ...OUTPUT_HANDLE_STYLE,
                    top: "25%",
                }}
            />

            <Handle
                id={"false"}
                position={Position.Right}
                type="source"
                style={{
                    ...OUTPUT_HANDLE_STYLE,
                    top: "75%",
                }}
            />

        </NWrapper>

    )

}