import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import Turxios, {DeleteEntity, PostEntity, QueryEntities} from "@Turtle/Api/Turxios";

export default class AgentNodesApi {

    static async ListNodesOfAgent(agentUid: string): Promise<Array<AgentNodeParent>> {
        return QueryEntities("/api/llm/agent-nodes/query", {parent: agentUid}, AgentNodeParent)
    }

    static async Delete(nodeUid: string) {
        await DeleteEntity("/api/llm/agent-node", nodeUid)
    }

    static async COU(node: AgentNodeParent) {
        await PostEntity("/api/llm/agent-node", node)
    }

}