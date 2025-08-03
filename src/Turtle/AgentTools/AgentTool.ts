export default class AgentTool {
    uid = ""
    name = ""
    description = ""
    icon = ""
    category = ""
    provider = ""
    type = ""

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            description: this.description,
            icon: this.icon,
            category: this.category,
            provider: this.provider,
            type: this.type,
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""
        this.description = jObj.description ?? ""
        this.icon = jObj.icon ?? ""
        this.category = jObj.category ?? ""
        this.provider = jObj.provider ?? ""
        this.type = jObj.type ?? ""
    }

}