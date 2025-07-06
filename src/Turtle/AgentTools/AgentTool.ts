export default class AgentTool {
    uid = ""
    name = ""
    description = ""
    icon = ""

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            description: this.description,
            icon: this.icon,
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""
        this.description = jObj.description ?? ""
        this.icon = jObj.icon ?? ""
    }

}