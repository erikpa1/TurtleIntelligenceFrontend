import {Handle, NodeProps, Position} from "reactflow";
import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import {nodeMoveAndModify} from "@Turtle/LLM/LLMAgentsDock/Edit/VisTools/nodeFuncts";
import {Tooltip} from "antd";
import ColorConstants from "@Turtle/Constants/ColorConstants";
import {HierarchyDivIcon} from "@Turtle/Components/HierarchyComponents";
import {SUBNODE_HANDLE_STYLE} from "@Turtle/LLM/LLMAgentsDock/Edit/Styles";
import IconOllama from "@Turtle/Icons/IconOllama";
import NWrapper from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/NWrapper";


export default function CircleUpTargetNode(props: NodeProps<AgentNodeParent>) {

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

            <HierarchyDivIcon icon={<IconOllama/>}/>

        </NWrapper>
    )

}