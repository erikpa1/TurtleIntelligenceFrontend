import {create} from "zustand";
import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import AgentNodeEdge from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/NodeConnections";


interface AgentNodeZus {
    deletedNodes: Map<string, AgentNodeParent>
    nodes: AgentNodeParent[]
    setNodes: (newNodes: AgentNodeParent[]) => void,
    edges: AgentNodeEdge[]
    setEdges: (newEdges: AgentNodeEdge[]) => void,
    deletedEdges: AgentNodeEdge[],
    addDeletesEdge: (edge: AgentNodeEdge) => void,
}

export const useAgentNodesZus = create<AgentNodeZus>((set) => ({
    deletedNodes: new Map<string, AgentNodeParent>(),
    nodes: [],
    setNodes: (newNodes: AgentNodeParent[]) => set((newState) => ({nodes: newNodes})),
    edges: [],
    setEdges: (newConnections: AgentNodeEdge[]) => set((newState) => ({edges: newConnections})),
    deletedEdges: [],
    addDeletesEdge: (edge: AgentNodeEdge) => set((oldState) => {
        const filtered = oldState.edges.filter((val) => val.runTimeUid !== edge.runTimeUid)
        oldState.setEdges(filtered)

        return {deletedEdges: [...oldState.deletedEdges, edge]}
    }),
}))