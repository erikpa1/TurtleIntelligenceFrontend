import {create} from "zustand";
import ColorConstants from "@Turtle/Constants/ColorConstants";


class TurtleTheme {
    topBarHeightBig = "45px"
    bigPadding = "15px"
    iconPrimaryColor = ColorConstants.AZURE_BLUE
    iconSecondaryColor = ColorConstants.GRAY
    borderColor = ColorConstants.AZURE_BLUE
    borderHoverColor = ColorConstants.AZURE_BLUE_HOVER

    GetSplitterBigHeight(): string {
        return `calc(100vh - ${this.topBarHeightBig})`
    }

    GetSpliterContentHeight(): string {
        return `calc(100% - ${this.topBarHeightBig})`
    }

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
        redOne.borderColor = ColorConstants.RED
        redOne.borderHoverColor = ColorConstants.RED
        setTheme(redOne)
    }


    return init

}
