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
    stages: FlowStage[] = []

    ToJson(): any {


        const finalObject = {
            ...super.ToJson(),
            states: Object.fromEntries(this.states),
            stages: this.stages.map((val) => {
                return val.ToJson()

            })
        }

        return finalObject
    }

    FromJson(jObject: any) {
        super.FromJson(jObject)

        this.states = new Map<string, any>(Object.entries(jObject.states))

        this.stages = (jObject.stages ?? []).map((val) => {
            const tmp = new FlowStage()
            tmp.FromJson(val)
            return tmp
        })
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


export class FlowStage {
    uid = ""

    name = ""
    type = ""

    ToJson(): any {
        return {
            //Do not serialize UID, no reason to do so
            name: this.name,
            type: this.type,
        }
    }

    FromJson(jObj: any) {
        this.name = jObj.name ?? ""
        this.type = jObj.type ?? ""
    }

    StateRemoved(stateUid: string) {

    }


}