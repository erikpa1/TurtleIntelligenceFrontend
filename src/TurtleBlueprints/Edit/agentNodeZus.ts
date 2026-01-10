import {create} from "zustand";
import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent";
import AgentNodeEdge from "@TurtleBlueprints/Data/Nodes/NodeConnections";
import LLMPipeline from "@Turtle/LLM/Data/LLMPipeline";


interface AgentNodeZus {
    deletedNodes: Map<string, NodeParent>
    nodes: NodeParent[]
    setNodes: (newNodes: NodeParent[]) => void,
    deleteNode: (node: NodeParent) => void,
    edges: AgentNodeEdge[]
    setEdges: (newEdges: AgentNodeEdge[]) => void,
    deletedEdges: AgentNodeEdge[],
    addDeletedEdge: (edge: AgentNodeEdge) => void,
    clear: () => void
    saveClear: () => void
}

export const useAgentNodesZus = create<AgentNodeZus>((set) => ({
    deletedNodes: new Map<string, NodeParent>(),
    nodes: [],
    setNodes: (newNodes: NodeParent[]) => set((newState) => ({nodes: newNodes})),
    deleteNode: (toDelete: NodeParent) => set((oldState) => {

        const filtered = oldState.nodes.filter((val) => val.uid !== toDelete.uid)

        const newDeleted = new Map(oldState.deletedNodes)
        newDeleted.set(toDelete.uid, toDelete)

        const newEdges = oldState.edges.filter((val) => {
            const shouldStay = val.source !== toDelete.uid && val.target !== toDelete.uid

            if (shouldStay == false) {
                oldState.deletedEdges.push(val)
            }

            return shouldStay
        })

        return {
            nodes: filtered,
            deletedNodes: newDeleted,
            edges: newEdges
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
    clear: () => set(() => ({nodes: [], edges: [], deletedNodes: new Map()})),
    saveClear: () => set(() => ({ deletedNodes: new Map(), deletedEdges: []}))

}))



interface AgentExecZus {
    pipeline: LLMPipeline
    setPipeline: (newPipeline: LLMPipeline) => void

}

export const useAgentExecZus = create<AgentExecZus>((set) => ({
    pipeline: new LLMPipeline(),
    setPipeline: (newPipeline: LLMPipeline) => set((newState) => ({pipeline: newPipeline})),

}))