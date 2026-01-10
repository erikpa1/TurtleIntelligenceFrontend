import {Handle, NodeProps, Position} from "reactflow";
import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent";
import {nodeMoveAndModify} from "@TurtleBlueprints/Edit/VisTools/nodeFuncts";
import NWrapper from "@TurtleBlueprints/Edit/Nodes/NWrapper";
import NodeLabel from "@TurtleBlueprints/Edit/VisTools/NodeLabel";
import {INPUT_HANDLE_STYLE, OUTPUT_HANDLE_STYLE, SUBNODE_HANDLE_STYLE} from "@TurtleBlueprints/Edit/Styles";
import IconBookmarkManager from "@Turtle/Icons/IconBookmarkManager";
import ColorConstants from "@Turtle/Constants/ColorConstants";


export default function ABErrorNodeHandle(props: NodeProps<NodeParent>) {

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
                id={"b"}
                position={Position.Right}
                type="source"
                style={{
                    ...OUTPUT_HANDLE_STYLE,
                    top: "25%",
                    background: props.data.typeData.GetConnectionColor("b") ?? "inherit"
                }}
            />

            <Handle
                id={"err"}
                position={Position.Right}
                type="source"
                style={{
                    ...OUTPUT_HANDLE_STYLE,
                    top: "75%",
                    background: ColorConstants.BURGUNDY
                }}
            />

        </NWrapper>

    )

}