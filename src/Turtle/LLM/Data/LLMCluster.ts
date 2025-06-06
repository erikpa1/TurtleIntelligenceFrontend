export default class LLMCluster {
    uid = ""
    name = ""
    url = ""
    xApiKey = ""
    org = ""

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            url: this.url,
            xApiKey: this.xApiKey,
            org: this.org,
        }
    }

    FromJson(json: any): any {
        this.uid = json.uid ?? ""
        this.name = json.name ?? ""
        this.url = json.url ?? ""
        this.xApiKey = json.xApiKey ?? ""
        this.org = json.org ?? ""
    }


}