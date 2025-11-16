export default class KhDomain {
    name = ""
    uid = ""
    description = ""
    color = ""
    createdAt = 0

    ToJson(): any {
        return {
            name: this.name,
            uid: this.uid,
            description: this.description,
            color: this.color,
            createdAt: this.createdAt,
        }
    }

    FromJson(jObj: any): any {
        this.name = jObj.name ?? ""
        this.uid = jObj.uid ?? ""
        this.description = jObj.description ?? ""
        this.color = jObj.color ?? ""
        this.createdAt = jObj.createdAt ?? 0
    }

}