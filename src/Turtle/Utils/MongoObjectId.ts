import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import {fetchMongoUid} from "@Turtle/Utils/Uid";


export default class MongoObjectId {
    static async GetMongoId(): Promise<string> {
        return await fetchMongoUid()
    }

    static GetObjectIdQuery(name: string, value): any {
        const tmp = {}
        tmp[name] = {"$oid": value}
        return tmp
    }
}