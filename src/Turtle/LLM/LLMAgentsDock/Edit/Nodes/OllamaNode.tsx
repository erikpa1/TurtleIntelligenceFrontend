import {Handle, NodeProps, Position} from "reactflow";
import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import {nodeMoveAndModify} from "@Turtle/LLM/LLMAgentsDock/Edit/VisTools/nodeFuncts";
import {Tooltip} from "antd";
import ColorConstants from "@Turtle/Constants/ColorConstants";
import {HierarchyDivIcon} from "@Turtle/Components/HierarchyComponents";
import {SUBNODE_HANDLE_STYLE} from "@Turtle/LLM/LLMAgentsDock/Edit/Styles";
import IconOllama from "@Turtle/Icons/IconOllama";


export default function OllamaNode(props: NodeProps<AgentNodeParent>) {

    nodeMoveAndModify(props)

    return (
        <Tooltip title={props.data.name}>
            <div
                className="react-flow__node-default"
                style={{
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

            </div>
        </Tooltip>
    )
}