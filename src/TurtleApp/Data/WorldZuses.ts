import {create} from "zustand";

interface WorldConnectZus {
    phase: number
    setPhase: (phase: number) => void,
    numbering: 0 | 1 | 2,
    setNumbering: (numbering: 0 | 1 | 2) => void,
}

export const useWorldConnection = create<WorldConnectZus>((set) => ({
    phase: 0,
    setPhase: (newPhase) => set(() => ({phase: newPhase})),
    numbering: 0,
    setNumbering: (newNumbering) => set(() => ({numbering: newNumbering})),
}))