export default class Artifact {
    uid = ""
    name = ""
    type = 0
    typeData = {}

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            type: this.type,
            typeData: this.typeData
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""
        this.type = jObj.type ?? 0
        this.typeData = jObj.typeData ?? {}
    }
}

