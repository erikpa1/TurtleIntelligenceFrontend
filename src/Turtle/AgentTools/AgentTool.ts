export default class AgentTool {
    uid = ""
    name = ""
    description = ""

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            description: this.description,
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""
        this.description = jObj.description ?? ""
    }

}