export class ChatHistoryLight {
    uid = ""
    name = ""
    at = 0

    FromJson(jObj: any) {

        this.uid = jObj.uid
        this.name = jObj.name
        this.at = jObj.at
    }


}


export class SmartSegment {
    type = ""
    text = ""

    FromJson(jObj: any) {
        this.type = jObj.type
        this.text = jObj.text
    }
}

export class ConversationSegment {
    at = 0
    text = ""
    isUser = false
    duration = 0

    smartTexts = new Array<SmartSegment>()

    FromJson(jObj: any) {
        this.text = jObj.text
        this.at = jObj.at
        this.isUser = jObj.isUser
        this.duration = jObj.duration

        this.smartTexts = (jObj.smartTexts ?? []).map((val) => {
            const tmp = new SmartSegment()
            tmp.FromJson(val)
            return tmp
        })
    }
}

export class LLMChat {
    uid = ""
    name = ""
    at = 0
    conversation = new Array<ConversationSegment>()


    FromJson(jObj: any) {
        this.uid = jObj.uid
        this.name = jObj.name
        this.at = jObj.at

        this.conversation = jObj.conversation.map((val) => {
            const tmp = new ConversationSegment()
            tmp.FromJson(val)
            return tmp
        })
    }


}