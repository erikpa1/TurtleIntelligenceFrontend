import ColorConstants from "@Turtle/Constants/ColorConstants";
import {create} from "zustand"
import ThemeApi from "@Turtle/Theme/ThemeApi"

export class TurtleThemeLight {
    uid = ""
    name = ""
    default = false
    color = ColorConstants.AZURE_BLUE

    ToJson() {
        return {
            uid: this.uid,
            name: this.name,
            default: this.default,
            color: this.color,
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""
        this.default = jObj.default ?? false
        this.color = jObj.color ?? this.color
    }
}

export class TurtleTheme extends  TurtleThemeLight{
    name =""
    uid = ""
    default = false
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

    ToJson() {
        return {
            ...super.ToJson(),
            topBarHeightBig: this.topBarHeightBig,
            bigPadding: this.bigPadding,
            headingFontColor: this.headingFontColor,
            iconPrimaryColor: this.iconPrimaryColor,
            iconSecondaryColor: this.iconSecondaryColor,
            borderColor: this.borderColor,
            borderHoverColor: this.borderHoverColor,
        }
    }

    FromJson(jObj: any) {
        super.FromJson(jObj)
        Object.entries(this).forEach(([key]) => {
            if (jObj[key]) {
                this[key] = jObj[key]
            }
        })
    }


}
