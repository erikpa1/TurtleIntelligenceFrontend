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


export enum LLMAgentMethodType {
    GET = 0,
    POST = 1,
    PUT = 2,
    DELETE = 3
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
    commandExample = ""
    args = []
    agentsProps = new LLMAgentParamsProps()

    methodType = LLMAgentMethodType.GET

    tools = new Set<string>()

    FromJson(jObj: any) {

        this.uid = jObj.uid ?? ""
        this.org = jObj.org ?? ""
        this.userLevel = jObj.userLevel ?? ""
        this.name = jObj.name ?? ""
        this.description = jObj.description ?? ""
        this.specialization = jObj.specialization ?? ""
        this.useModel = jObj.useModel ?? ""
        this.createdAt = jObj.createdAt ?? 0
        this.updatedAt = jObj.updatedAt ?? 0
        this.createdBy = jObj.createdBy ?? ""
        this.updatedBy = jObj.updatedBy ?? ""
        this.url = jObj.url ?? ""
        this.xApiKey = jObj.xApiKey ?? ""
        this.args = []
        this.methodType = jObj.methodType ?? LLMAgentMethodType.GET
        this.commandExample = jObj.commandExample ?? ""
        this.agentsProps.FromJson(jObj.agentsProps ?? {})

        this.tools = new Set(jObj.tools ?? [])

        console.log(jObj.tools)

    }


    ToJson(): any {
        return {
            uid: this.uid,
            userLevel: this.userLevel,
            name: this.name,
            description: this.description,
            specialization: this.specialization,
            useModel: this.useModel,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            createdBy: this.createdBy,
            updatedBy: this.updatedBy,
            url: this.url,
            xApiKey: this.xApiKey,
            args: this.args,
            methodType: this.methodType,
            commandExample: this.commandExample,
            agentsProps: this.agentsProps.ToJson(),
            tools: Array.from(this.tools.values())
        }
    }

}

export class Mistral7bResponse {
    selectedAgent = ""
    confidence = 0
    parameters = {}
    reasoning = ""

    FromJson(jObj: any) {
        this.selectedAgent = jObj.selectedAgent ?? ""
        this.confidence = jObj.confidence ?? ""
        this.reasoning = jObj.reasoning ?? ""
    }

}

export class LLMAgentTestResponse {
    uid = ""
    agentUid = ""
    at = 0
    state = 0
    result = new Mistral7bResponse()
    error = ""
    text = ""
    agentToolUsage: AgentToolUsage[] = []

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.agentUid = jObj.agentUid ?? ""
        this.at = jObj.at ?? 0
        this.result.FromJson(jObj.result)
        this.error = jObj.error ?? ""
        this.text = jObj.text ?? ""
        this.agentToolUsage = jObj.agentToolUsage ?? []
    }

}

export interface AgentToolUsage {
    uid: string
    name: string
    parameters: any
    toolsResult: AgentToolResult
}

export interface AgentToolResult {
    textRaw: string
    textInfo: string
    isOk: boolean
}