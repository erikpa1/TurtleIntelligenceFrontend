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
            states: this.states
        }
    }

    FromJson(jObject: any) {
        super.FromJson(jObject)
        this.states = new Map<string, any>(Object.entries(this.ToJson()))
    }

}


export class FlowItem {
    uid = ""
    name = ""

}

