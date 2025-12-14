import {create} from "zustand";
import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import AgentNodeEdge from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/NodeConnections";


interface AgentNodeZus {
    deletedNodes: Map<string, AgentNodeParent>
    nodes: AgentNodeParent[]
    setNodes: (newNodes: AgentNodeParent[]) => void,
    edges: AgentNodeEdge[]
    setEdges: (newConnections: AgentNodeEdge[]) => void,

}


export const useAgentNodesZus = create<AgentNodeZus>((set) => ({
    deletedNodes: new Map<string, AgentNodeParent>(),
    nodes: [],
    setNodes: (newNodes: AgentNodeParent[]) => set((newState) => ({nodes: newNodes})),
    edges: [],
    setEdges: (newConnections: AgentNodeEdge[]) => set((newState) => ({edges: newConnections})),
}))