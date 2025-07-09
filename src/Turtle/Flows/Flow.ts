import ColorConstants from "@Turtle/Constants/ColorConstants";

export class FlowLight {

    uid = ""
    name = ""


    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
        }
    }

    FromJson(jObject: any) {
        this.uid = jObject.uid ?? ""
        this.name = jObject.name ?? ""
    }

}


export class Flow extends FlowLight {

    states = new Map<string, any>()

    ToJson(): any {
        return {
            ...super.ToJson(),
            states: Object.fromEntries(this.states)
        }
    }

    FromJson(jObject: any) {
        super.FromJson(jObject)

        this.states = new Map<string, any>(Object.entries(jObject.states))
    }

}


export class FlowTypes {
    static COLOR_MAPS = new Map<string, string>([
        ["string", ColorConstants.AZURE_BLUE],
        ["float64", ColorConstants.GREEN],
        ["boolean", ColorConstants.RED],
    ])

    static GetVariableColor(varType: string): string {
        return FlowTypes.COLOR_MAPS.get(varType) ?? "#000000"

    }
}

