import {create} from "zustand";


interface TurtleTheme {
    bigPadding: string | number

}


export const useTurtleTheme = create<TurtleTheme>((set) => ({
    bigPadding: "15px",

}))

