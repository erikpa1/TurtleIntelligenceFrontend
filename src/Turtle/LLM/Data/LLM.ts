export enum LLMNodeType {
    RAW = 0,
    TURTLE = 1
}


export default class LLM {

    uid = ""
    name = ""
    url = ""
    nodeType = 0
    xApiKey = ""

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            url: this.url,
            xApiKey: this.xApiKey,
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid
        this.name = jObj.name
        this.url = jObj.url
        this.xApiKey = jObj.xApiKey
    }

}