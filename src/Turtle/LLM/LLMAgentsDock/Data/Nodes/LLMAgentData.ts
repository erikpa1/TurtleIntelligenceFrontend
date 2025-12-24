

export default class LLMAgentData {
    systemPrompt = ""

    ToJson(): any {
        return {
            systemPrompt: this.systemPrompt,
        }
    }

    FromJson(jObj: any) {
        this.systemPrompt = jObj.systemPrompt ?? this.systemPrompt
    }
}