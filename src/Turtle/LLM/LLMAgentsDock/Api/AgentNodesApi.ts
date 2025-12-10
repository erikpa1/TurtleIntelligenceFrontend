import AgentNodeParent, {CanvasStatus} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import Turxios, {DeleteEntity, PostEntity, QueryEntities} from "@Turtle/Api/Turxios";
import MongoObjectId from "@Turtle/Utils/MongoObjectId";

export default class AgentNodesApi {

    static async ListNodesOfAgent(agentUid: string): Promise<Array<AgentNodeParent>> {
        const query = MongoObjectId.GetObjectIdQuery("parent", agentUid)
        return QueryEntities("/api/llm/agent-nodes/query", query, AgentNodeParent)
    }

    static async Delete(nodeUid: string) {
        await DeleteEntity("/api/llm/agent-node", nodeUid)
    }

    static async COU(node: AgentNodeParent) {
        await PostEntity("/api/llm/agent-node", node)
    }


    static async SavePressed(nodes: Array<AgentNodeParent>, deletedNodes: Array<AgentNodeParent>) {
        const modified = nodes.filter(val => val.canvasStatus === CanvasStatus.MODIFIED)
        const created = nodes.filter(val => val.canvasStatus === CanvasStatus.CREATED)

        const tmp = {
            modified: modified.map(val => val.ToJson()),
            created: created.map(val => val.ToJson()),
            deleted: deletedNodes.map(val => val.uid),
        }

        const formData = new FormData()
        formData.set("data", JSON.stringify(tmp))

        await Turxios.post("/api/llm/agent-nodes", formData)
    }

}