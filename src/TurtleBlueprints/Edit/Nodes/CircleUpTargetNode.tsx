import {Handle, NodeProps, Position} from "reactflow";
import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent";
import {nodeMoveAndModify} from "@TurtleBlueprints/Edit/VisTools/nodeFuncts";
import {Tooltip} from "antd";
import TurtleColors from "@Turtle/Constants/TurtleColors";
import {HierarchyDivIcon} from "@Turtle/Components/HierarchyComponents";
import {SUBNODE_HANDLE_STYLE} from "@TurtleBlueprints/Edit/Styles";
import IconOllama from "../../../TurtleIcons/IconOllama";
import NWrapper from "@TurtleBlueprints/Edit/Nodes/NWrapper";
import {NodeIcon} from "@TurtleBlueprints/Edit/VisTools/NodeLabel"


export default function CircleUpTargetNode(props: NodeProps<NodeParent>) {

    return (
        <NWrapper
            nodeProps={props}
            nodeStyle={{
                width: 50,
                height: 50,
                borderColor: TurtleColors.GRAY,
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