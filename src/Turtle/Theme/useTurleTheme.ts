import {create} from "zustand";
import ColorConstants from "@Turtle/Constants/ColorConstants";


class TurtleTheme {
    bigPadding = "15px"
    iconPrimaryColor = ColorConstants.AZURE_BLUE
    iconSecondaryColor = ColorConstants.GRAY

}


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

    function init() {
        const redOne = new TurtleTheme()
        redOne.iconPrimaryColor = ColorConstants.RED
        redOne.iconSecondaryColor = ColorConstants.GRAY
        setTheme(redOne)
    }


    return init

}
