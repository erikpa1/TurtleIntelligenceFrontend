import AgentNodeParent, {CanvasStatus} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import Turxios, {DeleteEntity, PostEntity, QueryEntities} from "@Turtle/Api/Turxios";
import MongoObjectId from "@Turtle/Utils/MongoObjectId";
import AgentNodeEdge, {NodeConnStatus} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/NodeConnections";

export default class AgentNodesApi {

    static async ListEdgesOfParent(agentUid: string): Promise<AgentNodeEdge[]> {
        const query = MongoObjectId.GetObjectIdQuery("parent", agentUid)
        const result = await QueryEntities("/api/llm/agent-edges/query", query, AgentNodeEdge)

        return result
    }

    static async ListNodesOfAgent(agentUid: string): Promise<Array<AgentNodeParent>> {
        const query = MongoObjectId.GetObjectIdQuery("parent", agentUid)
        return await QueryEntities("/api/llm/agent-nodes/query", query, AgentNodeParent)
    }

    static async Delete(nodeUid: string) {
        await DeleteEntity("/api/llm/agent-node", nodeUid)
    }

    static async COU(node: AgentNodeParent) {
        await PostEntity("/api/llm/agent-node", node)
    }


    static async PlayNode(nodeUid: string) {
        await PostEntity("/api/llm/agent-play", null, {
            params: {
                uid: nodeUid,
            }
        })
    }


    static async SavePressed(
        nodes: Array<AgentNodeParent>,
        deletedNodes: Array<AgentNodeParent>,
        edges: Array<AgentNodeEdge>,
        deletedEdges: Array<AgentNodeEdge>
    ) {
        const modified = nodes.filter(val => val.canvasStatus === CanvasStatus.MODIFIED)
        const created = nodes.filter(val => val.canvasStatus === CanvasStatus.CREATED)

        const newConnections = edges.filter(val => val._status === NodeConnStatus.NEW)

        const deleted = deletedNodes.filter((val) => val.canvasStatus !== CanvasStatus.CREATED)

        const tmp = {
            modified: modified.map(val => val.ToJson()),
            created: created.map(val => val.ToJson()),
            deleted: deleted.map(val => val.uid),
            newEdges: newConnections.map(val => val.ToJson()),
            deletedEdges: deletedEdges.map(val => val.uid),
        }

        const formData = new FormData()
        formData.set("data", JSON.stringify(tmp))

        await Turxios.post("/api/llm/agent-nodes", formData)
    }

}