import {create} from "zustand";
import ColorConstants from "@Turtle/Constants/ColorConstants";


interface TurtleTheme {
    bigPadding: string | number
    iconPrimaryColor: string,
    iconSecondaryColor: string

}


export const useTurtleTheme = create<TurtleTheme>((set) => ({
    bigPadding: "15px",
    iconPrimaryColor: ColorConstants.AZURE_BLUE,
    iconSecondaryColor: ColorConstants.GRAY,

}))

