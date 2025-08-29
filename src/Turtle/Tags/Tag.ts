export default class Tag {

    id = ""
    uid = ""
    name = ""
    type = ""
    color = ""
    description = ""

    ToJson(): any {
        return {
            id: this.id,
            uid: this.uid,
            name: this.name,
            color: this.color,
            type: this.type,
        }
    }

    FromJson(jObj: any) {
        this.id = this.id ?? ""
        this.uid = this.uid ?? ""
        this.name = jObj.name ?? ""
        this.type = jObj.type ?? ""
        this.color = jObj.color ?? ""
        this.description = jObj.description ?? ""
    }

}