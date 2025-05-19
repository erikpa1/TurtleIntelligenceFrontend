import {create} from "zustand";


interface WorldConnectZus {
    phase: number
    setPhase: (phase: number) => void

}

export const useWorldConnection = create<WorldConnectZus>((set) => ({
    phase: 0,
    setPhase: (newPhase: number) => set((newState) => ({phase: newPhase})),

}))


