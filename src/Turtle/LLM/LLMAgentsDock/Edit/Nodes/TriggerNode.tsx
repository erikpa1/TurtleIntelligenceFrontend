import {Handle, NodeProps, Position} from "reactflow";
import ColorConstants from "@Turtle/Constants/ColorConstants";
import {OUTPUT_HANDLE_STYLE} from "@Turtle/LLM/LLMAgentsDock/Edit/Styles";
import {HierarchyDivIcon} from "@Turtle/Components/HierarchyComponents";
import {IconSimulation} from "@Turtle/Icons";
import {Tooltip} from "antd";
import AgentNodeParent, {CanvasStatus} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import {nodeMoveAndModify} from "@Turtle/LLM/LLMAgentsDock/Edit/VisTools/nodeFuncts";
import IconApi from "@Turtle/Icons/IconApi";
import SelectedNodeMarker from "@Turtle/LLM/LLMAgentsDock/Edit/Utils/SelectedeNodeMarker";
import NWrapper from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/NWrapper";


export default function TriggerNode(props: NodeProps<AgentNodeParent>) {


    return (
        <NWrapper
            nodeProps={props}
            nodeStyle={{
                width: 40,
                height: 40,
                borderTopLeftRadius: '30px',
                borderBottomLeftRadius: '30px',
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
            }}
        >

            <HierarchyDivIcon icon={<IconApi/>}/>

            <Handle
                id={"b"}
                position={Position.Right}
                type="source"
                style={{
                    ...OUTPUT_HANDLE_STYLE
                }}
            />


        </NWrapper>


    )
}