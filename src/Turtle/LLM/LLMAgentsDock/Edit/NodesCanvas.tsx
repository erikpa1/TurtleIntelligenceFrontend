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
import NodesGallery from "@Turtle/LLM/LLMAgentsDock/Edit/NodesGallery";
import {useAgentNodesZus} from "@Turtle/LLM/LLMAgentsDock/Edit/agentNodeZus";

import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import AgentNodeEdge, {NodeConnStatus} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/NodeConnections";
import TurtleApp from "@TurtleApp/TurtleApp"
import NodesLibrary from "@Turtle/LLM/LLMAgentsDock/Data/NodesLibrary"
import {useRefreshKey} from "@Turtle/Utils/useRefreshKey"


interface LLMAgentEditCanvasProps {
    agentUid: string
}

export default function LLMAgentLLMAgentEditCanvasEditCanvas({
                                                                 agentUid
                                                             }: LLMAgentEditCanvasProps) {

    const [key, refreshKey] = useRefreshKey()

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

        refreshKey()
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
                    key={key}
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
                <NodesGallery
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

    function nodeDeleted(nodes: Node<AgentNodeParent>[]) {
        TurtleApp.Lock()
        for (const node of nodes) {
            useAgentNodesZus.getState().deleteNode(node.data)

        }
        TurtleApp.Unlock()
    }

    const NODE_TYPES = React.useMemo(() => {
        return NodesLibrary.GetNodesAndCanvasTypes()
    }, [])

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
            onNodesDelete={nodeDeleted}
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
