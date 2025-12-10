import {create} from "zustand";
import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";


interface AgentNodeZus {
    deletedNodes: Map<string, AgentNodeParent>
    nodes: AgentNodeParent[]
    setNodes: (newNodes: AgentNodeParent[]) => void,

}


export const useAgentNodesZus = create<AgentNodeZus>((set) => ({
    deletedNodes: new Map<string, AgentNodeParent>(),
    nodes: [],
    setNodes: (newNodes: AgentNodeParent[]) => set((newState) => ({nodes: newNodes})),
}))