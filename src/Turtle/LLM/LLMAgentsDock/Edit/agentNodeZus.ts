import {create} from "zustand";
import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import AgentNodeEdge from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/NodeConnections";


interface AgentNodeZus {
    deletedNodes: Map<string, AgentNodeParent>
    nodes: AgentNodeParent[]
    setNodes: (newNodes: AgentNodeParent[]) => void,
    deleteNode: (node: AgentNodeParent) => void,
    edges: AgentNodeEdge[]
    setEdges: (newEdges: AgentNodeEdge[]) => void,
    deletedEdges: AgentNodeEdge[],
    addDeletedEdge: (edge: AgentNodeEdge) => void,
}

export const useAgentNodesZus = create<AgentNodeZus>((set) => ({
    deletedNodes: new Map<string, AgentNodeParent>(),
    nodes: [],
    setNodes: (newNodes: AgentNodeParent[]) => set((newState) => ({nodes: newNodes})),
    deleteNode: (toDelete: AgentNodeParent) => set((oldState) => {
        const filtered = oldState.nodes.filter((val) => val.uid !== toDelete.uid)

        oldState.deletedNodes.set(toDelete.uid, toDelete)

        return {
            nodes: filtered,
            deletedNodes: oldState.deletedNodes
        }
    }),
    edges: [],
    setEdges: (newConnections: AgentNodeEdge[]) => set((newState) => ({edges: newConnections})),
    deletedEdges: [],
    addDeletedEdge: (edge: AgentNodeEdge) => set((oldState) => {
        const filtered = oldState.edges.filter((val) => val.runTimeUid !== edge.runTimeUid)
        oldState.setEdges(filtered)

        return {deletedEdges: [...oldState.deletedEdges, edge]}
    }),
}))