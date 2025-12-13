import {create} from "zustand";
import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import NodeConnections from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/NodeConnections";
import NodeConnection from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/NodeConnections";


interface AgentNodeZus {
    deletedNodes: Map<string, AgentNodeParent>
    nodes: AgentNodeParent[]
    setNodes: (newNodes: AgentNodeParent[]) => void,
    connections: NodeConnection[]
    setConnections: (newConnections: NodeConnection[]) => void,

}


export const useAgentNodesZus = create<AgentNodeZus>((set) => ({
    deletedNodes: new Map<string, AgentNodeParent>(),
    nodes: [],
    setNodes: (newNodes: AgentNodeParent[]) => set((newState) => ({nodes: newNodes})),
    connections: [],
    setConnections: (newConnections: NodeConnection[]) => set((newState) => ({connections: newConnections})),
}))