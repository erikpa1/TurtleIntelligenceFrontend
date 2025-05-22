import ColorConstants from "@Turtle/Constants/ColorConstants";

export default class Actor {

    uid = ""
    name = ""
    model = ""
    color = ColorConstants.AZURE_BLUE

    varDef = {}


    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            color: this.color,
            model: this.model,
            varDef: this.varDef,
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""
        this.color = jObj.color ?? ColorConstants.AZURE_BLUE
        this.model = jObj.model ?? ""
        this.varDef = jObj.varDef ?? this.varDef
    }


}