import NodesFactory from "@Turtle/LLM/LLMAgentsDock/Data/NodesFactory"


export default class SqliteInsertNode {

    static TYPE = "sqliteInsert"

    table = ""
    prompt = ""
    schema = "" //Precalculate your schema to boost performance
    autoSchema = false //This should use commands like SELECT sql FROM sqlite_master WHERE type='table' AND name='table_name'; or .schema table_name

    ToJson(): any {
        return {
            table: this.table,
        }
    }

    FromJson(jObj: any) {
        this.table = jObj.table ?? this.table
    }

}

