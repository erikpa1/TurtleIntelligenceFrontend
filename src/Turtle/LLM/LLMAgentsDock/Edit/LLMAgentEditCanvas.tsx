import React from "react"

import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Node as FlowNode
} from 'reactflow';

import 'reactflow/dist/style.css';
import {Splitter} from "antd";


import AgentToolNode from "@Turtle/LLM/LLMAgentsDock/Edit/AgentToolNode";
import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import AgentTriggerNode from "@Turtle/LLM/LLMAgentsDock/Edit/AgentTriggerNode";
import AgentLLMNode from "@Turtle/LLM/LLMAgentsDock/Edit/AgentLLMNode";


const initialEdges = [{id: 'e1-2', source: '1', target: '2'}];


export default function LLMAgentEditCanvas({}) {

    return (
        <Splitter layout={"vertical"}>

            <Splitter.Panel>
                <_NodesFlowEditor/>
            </Splitter.Panel>

            <Splitter.Panel
                defaultSize={"20%"}
                style={{
                    backgroundColor: "white",
                }}

            >

            </Splitter.Panel>


        </Splitter>
    )

}

const initialNodes: Array<FlowNode<AgentNodeParent>> = [
    {
        id: '1',
        position: {x: 0, y: 0},
        data: new AgentNodeParent(),
        type: 'trigger',

    },
    {
        id: '2',
        position: {x: 300, y: 0},
        data: new AgentNodeParent()
    },
    {
        id: '3',
        position: {x: 600, y: 0},
        data: new AgentNodeParent(),
        type: 'llmAgent',
    },
];

function _NodesFlowEditor({}) {

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = React.useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);


    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={{
                default: AgentToolNode,
                trigger: AgentTriggerNode,
                llmAgent: AgentLLMNode
            }}
            fitView
        >
            <MiniMap/>
            <Controls/>
            <Background/>
        </ReactFlow>
    );
}
