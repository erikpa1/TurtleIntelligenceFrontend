import {Handle, NodeProps, Position} from "reactflow";

import {INPUT_HANDLE_STYLE, OUTPUT_HANDLE_STYLE, SUBNODE_HANDLE_STYLE} from "@Turtle/LLM/LLMAgentsDock/Edit/Styles";
import {HierarchyCustomIcon} from "@Turtle/Components/HierarchyComponents";
import IconAutoRenew from "@Turtle/Icons/IconAutoRenew";
import {Flex} from "antd";
import {nodeMoveAndModify} from "@Turtle/LLM/LLMAgentsDock/Edit/VisTools/nodeFuncts";
import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import NodeLabel from "@Turtle/LLM/LLMAgentsDock/Edit/VisTools/NodeLabel";

export default function AgentLLMNode(props: NodeProps<AgentNodeParent>) {

    nodeMoveAndModify(props)


    return (
        <div className="react-flow__node-default">

            <NodeLabel node={props.data}/>

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
                position={Position.Bottom}
                type="source"
                style={{
                    ...SUBNODE_HANDLE_STYLE
                }}
            />

            <Handle
                id={"c"}
                position={Position.Right}
                type="source"
                style={{
                    ...OUTPUT_HANDLE_STYLE
                }}
            />
        </div>
    )

}