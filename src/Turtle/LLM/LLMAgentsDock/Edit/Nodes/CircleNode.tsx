import {Handle, NodeProps, Position} from "reactflow";
import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";

import ColorConstants from "@Turtle/Constants/ColorConstants";
import {HierarchyDivIcon} from "@Turtle/Components/HierarchyComponents";
import {SUBNODE_HANDLE_STYLE} from "@Turtle/LLM/LLMAgentsDock/Edit/Styles";
import NWrapper from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/NWrapper";
import NodesFactory from "@Turtle/LLM/LLMAgentsDock/Data/NodesFactory"
import {IconSimulation} from "@Turtle/Icons";


export default function CircleNode(props: NodeProps<AgentNodeParent>) {

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

            <HierarchyDivIcon icon={NodesFactory.NODE_ICONS[props.data.type] ?? <IconSimulation/>}/>

        </NWrapper>
    )

}