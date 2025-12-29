import {create} from "zustand";
import ColorConstants from "@Turtle/Constants/ColorConstants";
import ThemeApi from "@Turtle/Theme/ThemeApi"
import {TurtleTheme} from "@Turtle/Theme/theme"



interface TurtleThemeZus {
    bigPadding: string | number
    theme: TurtleTheme,
    setTheme: (newTheme: TurtleTheme) => void


}


export const useTurtleTheme = create<TurtleThemeZus>((set) => ({
    bigPadding: "15px",
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
