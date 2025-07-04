export default class AgentIncident {
    uid = ""
    at = 0
    state = 0
    chatUid = ""


    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.at = jObj.at ?? 0
        this.chatUid = jObj.chatUid ?? ""
    }

    ToJson(): any {
        return {
            uid: this.uid,
            state: this.state
        }
    }


}