import {Handle, NodeProps, Position} from "reactflow";

import {INPUT_HANDLE_STYLE, OUTPUT_HANDLE_STYLE, SUBNODE_HANDLE_STYLE} from "@TurtleBlueprints/Edit/Styles";
import {HierarchyCustomIcon} from "@Turtle/Components/HierarchyComponents";
import IconAutoRenew from "@Turtle/Icons/IconAutoRenew";
import {Flex, Tooltip} from "antd";
import {nodeMoveAndModify} from "@TurtleBlueprints/Edit/VisTools/nodeFuncts";
import AgentNodeParent from "@TurtleBlueprints/Data/Nodes/AgentNodeParent";
import NodeLabel from "@TurtleBlueprints/Edit/VisTools/NodeLabel";
import NWrapper from "@TurtleBlueprints/Edit/Nodes/NWrapper";
import IconRobot2 from "@Turtle/Icons/IconRobot2";

export default function AgentLLMNode(props: NodeProps<AgentNodeParent>) {


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
                    background: props.data.typeData.GetConnectionColor("a") ?? "inherit"
                }}
            />

            <Handle
                id={"b"}
                position={Position.Right}
                type="source"
                style={{
                    ...OUTPUT_HANDLE_STYLE,
                    background: props.data.typeData.GetConnectionColor("b") ?? "inherit"
                }}
            />

            <Tooltip title={"llm"}>
                <Handle
                    id={"llm"}
                    position={Position.Bottom}
                    type="source"
                    style={{
                        ...SUBNODE_HANDLE_STYLE,
                    }}
                />
            </Tooltip>

            <Tooltip title={"memory"}>
                <Handle
                    id={"memory"}
                    position={Position.Bottom}
                    type="source"
                    style={{
                        ...SUBNODE_HANDLE_STYLE,
                        left: "25%"
                    }}
                />
            </Tooltip>

            <Tooltip title={"tools"}>
                <Handle
                    id={"tools"}
                    position={Position.Bottom}
                    type="source"
                    style={{
                        ...SUBNODE_HANDLE_STYLE,
                        left: "75%"
                    }}
                />
            </Tooltip>

        </NWrapper>

    )

}