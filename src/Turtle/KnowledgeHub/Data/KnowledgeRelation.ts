export default class KnowledgeRelation {
    uid = ""
    a = ""
    b = ""
    relationType = 0
    relationWeight = 1
    typeData = {}
    bidirect = false

    ToJson(): any {
        return {
            uid: this.uid,
            a: this.a,
            b: this.b,
            bidirect: this.bidirect,
            relationType: this.relationType,
            relationWeight: this.relationWeight,
        }
    }

    FromJson(jObj: any): any {
        this.uid = jObj.uid ?? ""
        this.a = jObj.a ?? ""
        this.b = jObj.b ?? ""
        this.relationType = jObj.relationType ?? 0
        this.relationWeight = jObj.relationWeight ?? 1
        this.bidirect = jObj.bidirect ?? false
    }


}