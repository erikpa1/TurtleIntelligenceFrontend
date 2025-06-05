export class LLMAgentParamsProps {
    role = ""
    systemPrompt = ""
    tools = new Array<string>()
    requiredAgents = new Array<string>()
    answerFormat = ""
    requiredParameters = new Array<string>()
    optionalParameters = new Array<string>()


    FromJson(jObj: any) {
        this.role = jObj.role ?? ""
        this.systemPrompt = jObj.systemPrompt ?? ""
        this.tools = jObj.tools ?? []
        this.requiredAgents = jObj.requiredAgents ?? []
        this.answerFormat = jObj.answerFormat ?? ""
        this.requiredParameters = jObj.requiredParameters ?? []
        this.optionalParameters = jObj.optionalParameters ?? []
    }

    ToJson(): any {
        return {
            role: this.role,
            systemPrompt: this.systemPrompt,
            tools: this.tools,
            requiredAgents: this.requiredAgents,
            answerFormat: this.answerFormat,
            requiredParameters: this.requiredParameters,
        }
    }


}

export class LLMAgent {

    uid = ""
    org = ""
    userLevel = 0
    name = ""
    description = ""
    specialization = ""
    useModel = ""
    createdAt = 0
    updatedAt = 0
    createdBy = ""
    updatedBy = ""
    url = ""
    xApiKey = ""
    args = []
    agentsProps = new LLMAgentParamsProps()

    FromJson(jObj: any) {

        this.uid = jObj.uid ?? ""
        this.org = jObj.org ?? ""
        this.userLevel = jObj.userLevel ?? ""
        this.name = jObj.name ?? ""
        this.description = jObj.description ?? ""
        this.specialization = jObj.specialization ?? ""
        this.useModel = jObj.useModel ?? ""
        this.createdAt = jObj.createdAt ?? ""
        this.updatedAt = jObj.updatedAt ?? ""
        this.createdBy = jObj.createdAt ?? ""
        this.updatedBy = jObj.updatedAt ?? ""
        this.url = jObj.url ?? ""
        this.xApiKey = jObj.xApiKey ?? ""
        this.args = []
        this.agentsProps.FromJson(jObj.agentsProps ?? {})

    }


    ToJson(): any {
        return {
            uid: this.uid,
            userLevel: this.userLevel,
        }
    }

}