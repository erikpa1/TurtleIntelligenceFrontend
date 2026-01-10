import {Handle, NodeProps, Position} from "reactflow";
import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent";
import {nodeMoveAndModify} from "@TurtleBlueprints/Edit/VisTools/nodeFuncts";
import NWrapper from "@TurtleBlueprints/Edit/Nodes/NWrapper";
import NodeLabel, {NodeIcon} from "@TurtleBlueprints/Edit/VisTools/NodeLabel";
import {INPUT_HANDLE_STYLE, OUTPUT_HANDLE_STYLE, SUBNODE_HANDLE_STYLE} from "@TurtleBlueprints/Edit/Styles";
import IconBookmarkManager from "@Turtle/Icons/IconBookmarkManager";
import ColorConstants from "@Turtle/Constants/ColorConstants"


export default function ABWithConn(props: NodeProps<NodeParent>) {

    return (
        <NWrapper
            nodeProps={props}
            nodeStyle={{
                width: 50,
                height: 50,
                justifyContent: 'center',
            }}
        >
            <NodeIcon node={props.data}/>

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

            <Handle
                id={"conn"}
                position={Position.Bottom}
                type="source"
                style={{
                    ...SUBNODE_HANDLE_STYLE
                }}
            />
        </NWrapper>

    )

}