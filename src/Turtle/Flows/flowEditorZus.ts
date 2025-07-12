import {create} from "zustand";


interface FlowEditorZus {
    viewType: number
    setViewType: (newType: number) => void
}

export const useActiveFlowEditor = create<FlowEditorZus>((set) => ({
    viewType: 1,
    setViewType: (newType) => set(() => ({viewType: newType})),
}))
