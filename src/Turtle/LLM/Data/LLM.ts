export enum LLMModelType {
    GENERAL = 0,
    AGENTIC = 1,
    SPECIALIZED = 2
}

export default class LLM {

    uid = ""
    name = ""
    cluster = ""
    ttl = "-1"
    modelVersion = "deepseek-coder-v2:latest"
    org = ""
    description = ""
    type = LLMModelType.GENERAL
    defaultTemperature = 1
    canUserOverrideTemperature = false
    isAgentic = false

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            cluster: this.cluster,
            ttl: this.ttl,
            org: this.org,
            description: this.description,
            isAgentic: this.isAgentic,
            defaultTemperature: this.defaultTemperature,
            canUserOverrideTemperature: this.canUserOverrideTemperature,
        }
    }

    FromJson(jObj: any) {
        console.log(jObj)
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""
        this.cluster = jObj.cluster ?? ""
        this.ttl = jObj.ttl ?? ""
        this.org = jObj.org ?? ""
        this.description = jObj.description ?? ""
        this.isAgentic = jObj.isAgentic ?? false
        this.defaultTemperature = jObj.defaultTemperature ?? 1
        this.canUserOverrideTemperature = jObj.canUserOverrideTemperature ?? false
    }

}