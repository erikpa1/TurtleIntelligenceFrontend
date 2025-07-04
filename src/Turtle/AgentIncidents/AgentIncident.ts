export default class AgentIncident {
    uid = ""
    at = 0
    chatUid = ""


    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.at = jObj.at ?? 0
        this.chatUid = jObj.chatUid ?? ""
    }


}