export enum KnowledgeType {
    PLAIN_TEXT = 0
}

export class Knowledge {
    uid = ""
    name = ""
    description = ""
    type = 0
    domain = ""
    hasEmbedding = false
    typeData = {}

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            description: this.description,
            type: this.type,
            hasEmbedding: this.hasEmbedding,
            typeData: this.typeData,
            domain: this.domain,
        }
    }

    FromJson(jObj: any): any {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""
        this.description = jObj.description ?? ""
        this.type = jObj.type ?? ""
        this.hasEmbedding = jObj.hasEmbedding
        this.typeData = jObj.typeData ?? {}
        this.domain = jObj.domain ?? ""
    }
}



