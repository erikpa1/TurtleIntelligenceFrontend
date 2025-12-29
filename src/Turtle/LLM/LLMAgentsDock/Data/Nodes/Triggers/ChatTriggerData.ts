
export default class ChatTriggerData {

    triggerDescription = ""

    ToJson() : any {
        return {
            triggerDescription: this.triggerDescription,
        }
    }

    FromJson(jObj: any) {
        this.triggerDescription = jObj.triggerDescription ?? this.triggerDescription
    }

}