import {Handle, NodeProps, Position} from "reactflow";
import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent";

import ColorConstants from "@Turtle/Constants/ColorConstants";
import {HierarchyDivIcon} from "@Turtle/Components/HierarchyComponents";
import {SUBNODE_HANDLE_STYLE} from "@TurtleBlueprints/Edit/Styles";
import NWrapper from "@TurtleBlueprints/Edit/Nodes/NWrapper";
import NodesFactory from "@TurtleBlueprints/Data/NodesFactory"
import {IconSimulation} from "@Turtle/Icons";
import {NodeIcon} from "@TurtleBlueprints/Edit/VisTools/NodeLabel"


export default function CircleNode(props: NodeProps<NodeParent>) {

    return (
        <NWrapper
            nodeProps={props}
            nodeStyle={{
                width: 50,
                height: 50,
                borderColor: ColorConstants.GRAY,
                borderRadius: '50%',
                justifyContent: 'center',
            }}
        >
            <Handle
                id={"a"}
                position={Position.Top}
                type="target"
                style={{
                    ...SUBNODE_HANDLE_STYLE
                }}
            />

            <NodeIcon node={props.data}/>

        </NWrapper>
    )

}