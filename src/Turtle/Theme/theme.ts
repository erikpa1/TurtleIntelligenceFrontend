import ColorConstants from "@Turtle/Constants/ColorConstants";
import {create} from "zustand"
import ThemeApi from "@Turtle/Theme/ThemeApi"


export class TurtleThemeLight {
    uid = ""
    name = ""

}

export class TurtleTheme {
    name =""
    uid = ""
    topBarHeightBig = "45px"
    bigPadding = "15px"
    headingFontColor = ColorConstants.AZURE_BLUE
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
