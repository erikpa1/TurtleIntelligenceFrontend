import React from "react"

import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';
import {useActiveFlowEditor} from "@Turtle/Flows/flowEditorZus";

const initialNodes = [
    {id: '1', position: {x: 0, y: 0}, data: {label: '1'}},
    {id: '2', position: {x: 0, y: 100}, data: {label: '2'}},
];

const initialEdges = [{id: 'e1-2', source: '1', target: '2'}];


export default function FlowEditor({flow}) {

    const {viewType} = useActiveFlowEditor()

    if (viewType === 0) {
        return (
            <_NodesFlowEditor flow={flow}/>
        )
    } else if (viewType === 1) {
        return (
            <_TableFlowEditor flow={flow}/>
        )
    } else {
        return (
            <div>Undefined view</div>
        )
    }


}

function _NodesFlowEditor({flow}) {

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
        >
            <MiniMap/>
            <Controls/>
            <Background/>
        </ReactFlow>
    );
}

function _TableFlowEditor({flow}) {

    return (
        <table>
            <thead>

            </thead>

            <tbody>

            </tbody>
        </table>
    )
}