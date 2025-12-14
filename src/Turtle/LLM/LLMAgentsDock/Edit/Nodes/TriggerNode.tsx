import {Handle, NodeProps, Position} from "reactflow";
import ColorConstants from "@Turtle/Constants/ColorConstants";
import {OUTPUT_HANDLE_STYLE} from "@Turtle/LLM/LLMAgentsDock/Edit/Styles";
import {HierarchyDivIcon} from "@Turtle/Components/HierarchyComponents";
import {IconSimulation} from "@Turtle/Icons";
import {Tooltip} from "antd";
import AgentNodeParent, {CanvasStatus} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import {nodeMoveAndModify} from "@Turtle/LLM/LLMAgentsDock/Edit/VisTools/nodeFuncts";
import IconApi from "@Turtle/Icons/IconApi";


export default function TriggerNode(props: NodeProps<AgentNodeParent>) {

    nodeMoveAndModify(props)

    return (
        <Tooltip title={props.data.name}>
            <div
                className="react-flow__node-default"
                style={{
                    width: 60,
                    borderColor: ColorConstants.GRAY,
                    borderTopLeftRadius: '30px',
                    borderBottomLeftRadius: '30px',
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px',
                }}
            >
                <HierarchyDivIcon icon={<IconApi/>}/>

                <Handle
                    id={"a"}
                    position={Position.Right}
                    type="source"
                    style={{
                        ...OUTPUT_HANDLE_STYLE
                    }}
                />
            </div>
        </Tooltip>
    )
}