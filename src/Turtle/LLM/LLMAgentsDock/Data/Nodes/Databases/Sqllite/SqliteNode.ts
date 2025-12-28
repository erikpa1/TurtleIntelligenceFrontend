import NodesFactory from "@Turtle/LLM/LLMAgentsDock/Data/NodesFactory"

export default class SqliteNode {

    static TYPE = "sqlite"

    path = ""
    preload = false

    ToJson(): any {
        return {
            path: this.path,
            preConnect: this.preload,
        }
    }

    FromJson(jObj: any) {
        this.path = jObj.path ?? this.path
        this.preload = jObj.preload ?? this.preload
    }
}


