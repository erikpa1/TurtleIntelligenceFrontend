export enum LLMModelType {
    GENERAL = 0,
    AGENTIC = 1,
    SPECIALIZED = 2
}

export default class LLMModel {

    uid = ""
    name = ""
    cluster = ""
    ttl = ""
    org = ""
    description = ""
    type = LLMModelType.GENERAL


    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            cluster: this.cluster,
            ttl: this.ttl,
            org: this.org,
            description: this.description,
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid
        this.name = jObj.name
        this.cluster = jObj.cluster
        this.ttl = jObj.ttl
        this.org = jObj.org
        this.description = jObj.description
    }

}