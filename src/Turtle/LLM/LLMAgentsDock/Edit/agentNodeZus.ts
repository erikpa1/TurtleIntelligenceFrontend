import {create} from "zustand";
import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";


interface AgentNodeZus {
    nodes: AgentNodeParent[]
    setNodes: (newNodes: AgentNodeParent[]) => void,

}


export const useAgentNodesZus = create<AgentNodeZus>((set) => ({
    nodes: [],
    setNodes: (newNodes: AgentNodeParent[]) => set((newState) => ({nodes: newNodes})),
}))