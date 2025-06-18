export enum LLMModelType {
    GENERAL = 0,
    AGENTIC = 1,
    SPECIALIZED = 2
}

export default class LLM {

    uid = ""
    name = ""
    clusters = new Set<string>()
    ttl = "-1"
    modelVersion = "deepseek-coder-v2:latest"
    org = ""
    description = ""
    type = LLMModelType.GENERAL
    defaultTemperature = 1
    canUserOverrideTemperature = false
    isAgentic = false
    isDefault = false

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            clusters: Array.from(this.clusters.values()),
            ttl: this.ttl,
            org: this.org,
            description: this.description,
            modelVersion: this.modelVersion,
            isAgentic: this.isAgentic,
            defaultTemperature: this.defaultTemperature,
            canUserOverrideTemperature: this.canUserOverrideTemperature,
            isDefault: this.isDefault,
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""
        this.ttl = jObj.ttl ?? ""
        this.org = jObj.org ?? ""
        this.description = jObj.description ?? ""
        this.modelVersion = jObj.modelVersion ?? ""
        this.isAgentic = jObj.isAgentic ?? false
        this.defaultTemperature = jObj.defaultTemperature ?? 1
        this.canUserOverrideTemperature = jObj.canUserOverrideTemperature ?? false
        this.isDefault = jObj.isDefault ?? false

        this.clusters = new Set(jObj.clusters ?? [])
    }

}