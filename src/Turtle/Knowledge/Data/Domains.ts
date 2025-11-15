export default class KnowledgeDomain {
    name = ""
    uid = ""
    description = ""
    color = ""

    ToJson(): any {
        return {
            name: this.name,
            uid: this.uid,
            description: this.description,
            color: this.color
        }
    }

    FromJson(jObj: any): any {
        this.name = jObj.name ?? ""
        this.uid = jObj.uid ?? ""
        this.description = jObj.description ?? ""
        this.color = jObj.color ?? ""
    }
    
}