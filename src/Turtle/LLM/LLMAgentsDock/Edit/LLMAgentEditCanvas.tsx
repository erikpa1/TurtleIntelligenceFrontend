import React from "react"
import {Splitter} from "antd"

import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Node as FlowNode
} from 'reactflow'

import 'reactflow/dist/style.css'


import AgentToolNode from "@Turtle/LLM/LLMAgentsDock/Edit/AgentToolNode"
import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent"
import AgentTriggerNode from "@Turtle/LLM/LLMAgentsDock/Edit/AgentTriggerNode"
import AgentLLMNode from "@Turtle/LLM/LLMAgentsDock/Edit/AgentLLMNode"
import AgentExecDock from "@Turtle/LLM/LLMAgentsDock/Edit/AgentExecDock"
import AgentNodesApi from "@Turtle/LLM/LLMAgentsDock/Api/AgentNodesApi";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import AgentNodesLibrary from "@Turtle/LLM/LLMAgentsDock/Edit/AgentNodesLibrary";


const initialEdges = [{id: 'e1-2', source: '1', target: '2'}];

interface LLMAgentEditCanvasProps {
    agentUid: string
}

export default function LLMAgentEditCanvas({
                                               agentUid
                                           }: LLMAgentEditCanvasProps) {


    const [nodes, setNodes] = React.useState<AgentNodeParent[]>([])

    async function refresh() {
        setNodes(await AgentNodesApi.ListNodesOfAgent(agentUid))
    }

    React.useEffect(() => {
        refresh()
    }, [agentUid])

    return (
        <Splitter
            layout={"vertical"}
            style={{
                height: "100%",
            }}
        >

            <Splitter.Panel>
                <_NodesFlowEditor agentNodes={nodes}/>
            </Splitter.Panel>

            <Splitter.Panel
                defaultSize={"20%"}
                style={{
                    backgroundColor: "white",
                }}

            >
                <AgentExecDock/>
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
        position: {x: 200, y: 0},
        data: new AgentNodeParent()
    },
    {
        id: '3',
        position: {x: 400, y: 0},
        data: new AgentNodeParent(),
        type: 'llmAgent',
    },
];


const NODE_TYPES = {
    default: AgentToolNode,
    trigger: AgentTriggerNode,
    llmAgent: AgentLLMNode
}

interface _NodesFlowEditorProps {
    agentNodes: AgentNodeParent[]
}

function _NodesFlowEditor({agentNodes}: _NodesFlowEditorProps) {


    const {activate, deactivate} = useTurtleModal()

    const initialNodes = React.useMemo(() => {
        return agentNodes.map(node => ({
            id: node.uid,
            position: {x: node.posX, y: node.posY},
            data: node,
            type: node.type
        }))
    }, [agentNodes])

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)

    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

    const onConnect = React.useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    function addNodePressed() {
        activate({
            title: "Add Node",
            width: 800,
            content: (
                <AgentNodesLibrary/>
            )
        })
    }

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={NODE_TYPES}
            fitView
            onContextMenu={(e) => {
                e.preventDefault()
                addNodePressed()
            }}
        >
            <MiniMap/>
            <Controls/>
            <Background/>
        </ReactFlow>
    );
}
