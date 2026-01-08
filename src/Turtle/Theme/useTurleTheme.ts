import {create} from "zustand";

import ThemeApi from "@Turtle/Theme/ThemeApi"
import {TurtleTheme} from "@Turtle/Theme/theme"

import {theme as antdTheme} from 'antd';


type AntdToken = {
    colorBgContainer: string
}

interface TurtleThemeZus {
    bigPadding: string | number
    theme: TurtleTheme,
    isLight: Boolean,
    setTheme: (newTheme: TurtleTheme) => void
    swapTheme: () => void
}


export function getThemeToken(): AntdToken {
    const {token} = antdTheme.useToken()
    return token as any
}

export const useTurtleTheme = create<TurtleThemeZus>((set) => ({
    bigPadding: "15px",
    isLight: true,
    swapTheme: () => set((oldState) => {
        return {isLight: !oldState.isLight}

    }),
    theme: new TurtleTheme(),
    setTheme: (obj: TurtleTheme) => set((newState) => ({theme: obj})),
}))


export function useThemeInit(): () => void {

    const {setTheme} = useTurtleTheme()

    async function init() {
        const redOne = await ThemeApi.GetDefaultTheme()
        setTheme(redOne)
    }

    return init
}


