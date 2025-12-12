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

import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent"

import AgentLLMNode from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/AgentLLMNode"
import AgentExecDock from "@Turtle/LLM/LLMAgentsDock/Edit/AgentExecDock"
import AgentNodesApi from "@Turtle/LLM/LLMAgentsDock/Api/AgentNodesApi";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import LLMNodesGallery from "@Turtle/LLM/LLMAgentsDock/Edit/LLMNodesGallery";
import {useAgentNodesZus} from "@Turtle/LLM/LLMAgentsDock/Edit/agentNodeZus";
import AgentTriggerNode from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/AgentTriggerNode";
import AgentToolNode from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/AgentToolNode";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";


interface LLMAgentEditCanvasProps {
    agentUid: string
}

export default function LLMAgentLLMAgentEditCanvasEditCanvas({
                                               agentUid
                                           }: LLMAgentEditCanvasProps) {


    const {nodes, setNodes} = useAgentNodesZus()


    const {theme} = useTurtleTheme();


    async function refresh() {

        const tmp = await AgentNodesApi.ListNodesOfAgent(agentUid)
        console.log(tmp)
        setNodes(tmp)
    }

    React.useEffect(() => {
        refresh()
    }, [agentUid])

    return (
        <Splitter
            layout={"vertical"}
        >

            <Splitter.Panel>
                <_NodesFlowEditor agentUid={agentUid} agentNodes={nodes}/>
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


const NODE_TYPES = {
    default: AgentToolNode,
    trigger: AgentTriggerNode,
    llmAgent: AgentLLMNode
}

interface _NodesFlowEditorProps {
    agentNodes: AgentNodeParent[]
    agentUid: string
}

function _NodesFlowEditor({
                              agentNodes,
                              agentUid
                          }: _NodesFlowEditorProps) {


    const {activate, deactivate} = useTurtleModal()

    const [nodes, setNodes, onNodesChange] = useNodesState([])

    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    const onConnect = React.useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);


    function addNodePressed() {
        activate({
            title: "Add Node",
            width: 800,
            content: (
                <LLMNodesGallery
                    agentUid={agentUid}
                    onBeforeSubmit={deactivate}
                />
            )
        })
    }

    React.useEffect(() => {

        const asNodes = agentNodes.map((node) => {

            console.log(node)

            return {
                id: node.uid,
                position: {x: node.posX, y: node.posY},
                data: node,
                type: node.GetFlowType()
            }
        })

        console.log(asNodes)

        setNodes(asNodes)

    }, [agentNodes])

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
