import {create} from "zustand";


interface FlowEditorZus {
    viewType: number
    setViewType: (newType: number) => void
}

export const useActiveFlowEditor = create<FlowEditorZus>((set) => ({
    viewType: 0,
    setViewType: (newType) => set(() => ({viewType: newType})),
}))
