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
    useNodesState, useReactFlow, ReactFlowProvider
} from 'reactflow'

import 'reactflow/dist/style.css'

import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent"

import AgentExecDock from "@TurtleBlueprints/Edit/AgentExecDock"
import BlueprintNodesApi from "@TurtleBlueprints/Api/BlueprintNodesApi";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import NodesGallery from "@TurtleBlueprints/Edit/NodesGallery";
import {useAgentNodesZus} from "@TurtleBlueprints/Edit/agentNodeZus";

import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import AgentNodeEdge, {NodeConnStatus} from "@TurtleBlueprints/Data/Nodes/NodeConnections";
import TurtleApp from "@TurtleApp/TurtleApp"
import NodesLibrary from "@TurtleBlueprints/Data/NodesLibrary"
import {useRefreshKey} from "@Turtle/Utils/useRefreshKey"
import ColorConstants from "@Turtle/Constants/ColorConstants";


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


    async function refresh() {

        const [
            nodes,
            edges
        ] = await Promise.all([
            BlueprintNodesApi.ListNodesOfAgent(agentUid),
            BlueprintNodesApi.ListEdgesOfParent(agentUid)
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

                <ReactFlowProvider>
                    <_NodesFlowEditor
                        key={key}
                        agentUid={agentUid}
                        agentNodes={nodes}
                        nodesConnections={edges}
                    />
                </ReactFlowProvider>

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
    agentNodes: NodeParent[]
    nodesConnections: AgentNodeEdge[]
    agentUid: string
}

function _NodesFlowEditor({
                              agentNodes,
                              nodesConnections,
                              agentUid
                          }: _NodesFlowEditorProps) {

    const nodesMap = React.useMemo(() => {
        return new Map(agentNodes.map((val) => [val.uid, val]))
    }, [agentNodes])

    const {screenToFlowPosition} = useReactFlow()

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

    function addNodePressed(position: { x: number, y: number }) {
        activate({
            title: "Add Node",
            width: 800,
            content: (
                <NodesGallery
                    position={position}
                    agentUid={agentUid}
                    onBeforeSubmit={deactivate}
                />
            )
        })
    }

    React.useEffect(() => {

        const asNodes: Node<NodeParent> = agentNodes.map((node) => {

            return {
                id: node.uid,
                position: {x: node.posX, y: node.posY},
                data: node,
                type: node.GetFlowType()
            }
        }) as any

        setNodes(asNodes as any)

        const newEdges: Edge<AgentNodeEdge>[] = nodesConnections.map((connection) => {

            var color: string | undefined = undefined

            const node = nodesMap.get(connection.source)

            if (node) {
                console.log(node.typeData)
                color = node.typeData.GetConnectionColor(connection.sourceHandle)
            }

            return {
                id: connection.runTimeUid,
                source: connection.source,
                sourceHandle: connection.sourceHandle,
                target: connection.target,
                targetHandle: connection.targetHandle,
                data: connection,
                // animated: true,
                style: {
                    stroke: color,
                    // strokeDasharray: '5 5'
                }
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

    function nodeDeleted(nodes: Node<NodeParent>[]) {
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
        <div style={{height: "100%"}} className={"light"}>
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
                deleteKeyCode={["Backspace", "Delete"]}
                onContextMenu={(e) => {
                    e.preventDefault()

                    const position = screenToFlowPosition({
                        x: e.clientX,
                        y: e.clientY
                    })

                    addNodePressed(position)
                }}
            >
                <MiniMap/>
                <Controls/>
                <Background/>
            </ReactFlow>
        </div>
    );
}
