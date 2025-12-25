import {Handle, NodeProps, Position} from "reactflow";

import {INPUT_HANDLE_STYLE, OUTPUT_HANDLE_STYLE, SUBNODE_HANDLE_STYLE} from "@Turtle/LLM/LLMAgentsDock/Edit/Styles";
import {HierarchyCustomIcon} from "@Turtle/Components/HierarchyComponents";
import IconAutoRenew from "@Turtle/Icons/IconAutoRenew";
import {Flex, Tooltip} from "antd";
import {nodeMoveAndModify} from "@Turtle/LLM/LLMAgentsDock/Edit/VisTools/nodeFuncts";
import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import NodeLabel from "@Turtle/LLM/LLMAgentsDock/Edit/VisTools/NodeLabel";
import NWrapper from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/NWrapper";
import IconRobot2 from "@Turtle/Icons/IconRobot2";

export default function AgentLLMNode(props: NodeProps<AgentNodeParent>) {


    return (
        <NWrapper
            nodeProps={props}
        >
            <NodeLabel node={props.data} icon={<IconRobot2/>}/>

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