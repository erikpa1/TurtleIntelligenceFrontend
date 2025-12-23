

export default class LLMAgentData {
    systemPrompt = ""
    userPrompt = ""

    ToJson(): any {
        return {
            systemPrompt: this.systemPrompt,
            userPrompt: this.userPrompt
        }
    }

    FromJson(jObj: any) {
        this.systemPrompt = jObj.systemPrompt ?? this.systemPrompt
        this.userPrompt = jObj.userPrompt ?? this.userPrompt
    }
}