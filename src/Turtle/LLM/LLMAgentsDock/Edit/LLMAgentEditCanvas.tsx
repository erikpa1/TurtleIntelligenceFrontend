import React, {type MouseEvent as ReactMouseEvent} from "react"
import {Splitter} from "antd"

import ReactFlow, {
    addEdge,
    Background,
    Connection,
    Controls,
    Edge,
    Node,
    MiniMap,
    useEdgesState,
    useNodesState
} from 'reactflow'

import 'reactflow/dist/style.css'

import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent"

import AgentLLMNode from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/AgentLLMNode"
import AgentExecDock from "@Turtle/LLM/LLMAgentsDock/Edit/AgentExecDock"
import AgentNodesApi from "@Turtle/LLM/LLMAgentsDock/Api/AgentNodesApi";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import LLMNodesGallery from "@Turtle/LLM/LLMAgentsDock/Edit/LLMNodesGallery";
import {useAgentNodesZus} from "@Turtle/LLM/LLMAgentsDock/Edit/agentNodeZus";
import TriggerNode from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/TriggerNode";
import AgentToolNode from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/AgentToolNode";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import AgentNodeEdge, {NodeConnStatus} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/NodeConnections";
import OllamaNode from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/OllamaNode";
import COUNodeView from "@Turtle/LLM/LLMAgentsDock/Edit/COUNodeView";
import WriteFileNode from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/WriteFileNode";


interface LLMAgentEditCanvasProps {
    agentUid: string
}

export default function LLMAgentLLMAgentEditCanvasEditCanvas({
                                                                 agentUid
                                                             }: LLMAgentEditCanvasProps) {


    const {
        nodes,
        setNodes,
        edges,
        setEdges
    } = useAgentNodesZus()


    const {theme} = useTurtleTheme();


    async function refresh() {

        const [
            nodes,
            edges
        ] = await Promise.all([
            AgentNodesApi.ListNodesOfAgent(agentUid),
            AgentNodesApi.ListEdgesOfParent(agentUid)
        ])


        setNodes(nodes)
        setEdges(edges)


    }

    React.useEffect(() => {
        refresh()
    }, [agentUid])

    return (
        <Splitter
            layout={"vertical"}
        >

            <Splitter.Panel>
                <_NodesFlowEditor
                    agentUid={agentUid}
                    agentNodes={nodes}
                    nodesConnections={edges}
                />
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
    trigger: TriggerNode,
    llmAgent: AgentLLMNode,
    ollama: OllamaNode,
    writeToFile: WriteFileNode,
}

interface _NodesFlowEditorProps {
    agentNodes: AgentNodeParent[]
    nodesConnections: AgentNodeEdge[]
    agentUid: string
}

function _NodesFlowEditor({
                              agentNodes,
                              nodesConnections,
                              agentUid
                          }: _NodesFlowEditorProps) {


    const {activate, deactivate} = useTurtleModal()

    const [nodes, setNodes, onNodesChange] = useNodesState([])

    const [edges, setEdges, onEdgesChange] = useEdgesState([])


    const onConnect = React.useCallback((params: Connection) => {

        if (params.source === params.target) {
            return
        }

        const conn = new AgentNodeEdge()
        conn.source = params.source ?? ""
        conn.target = params.target ?? ""
        conn.sourceHandle = params.sourceHandle ?? ""
        conn.targetHandle = params.targetHandle ?? ""
        conn._status = NodeConnStatus.NEW
        conn.parent = agentUid
        conn.CreateRuntimeUid()

        useAgentNodesZus.getState().edges.push(conn)

        setEdges((eds) => addEdge(params, eds));
    }, [setEdges])

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

        const asNodes: Node<AgentNodeParent> = agentNodes.map((node) => {

            return {
                id: node.uid,
                position: {x: node.posX, y: node.posY},
                data: node,
                type: node.GetFlowType()
            }
        }) as any

        setNodes(asNodes as any)

        const newEdges: Edge<AgentNodeEdge>[] = nodesConnections.map((connection) => {

            return {
                id: connection.runTimeUid,
                source: connection.source,
                sourceHandle: connection.sourceHandle,
                target: connection.target,
                targetHandle: connection.targetHandle,
                data: connection
            }
        })

        setEdges(newEdges)

    }, [agentNodes, nodesConnections])

    function deleteEdge(event: ReactMouseEvent, tmp: Edge<AgentNodeEdge>) {

        const {addDeletedEdge} = useAgentNodesZus.getState()

        if (tmp.data) {
            addDeletedEdge(tmp.data)
        }

    }




    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onEdgeDoubleClick={deleteEdge as any}
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
