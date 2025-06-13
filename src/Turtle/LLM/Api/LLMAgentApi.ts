import {LLMAgent, LLMAgentTestResponse} from "@Turtle/LLM/Data/LLMAgent";
import Turxios from "@Turtle/Api/Turxios";
import axios from "axios";


export default class LLMAgentApi {


    static async COUAgent(agent: LLMAgent) {
        const data = new FormData()
        data.set("data", JSON.stringify(agent.ToJson()))
        await Turxios.post("/api/llm/agent", data)
    }

    static async ListAgents(): Promise<Array<LLMAgent>> {
        return (await Turxios.get("/api/llm/agents")).data.map((item) => {
            const tmp = new LLMAgent()
            tmp.FromJson(item)
            return tmp
        })
    }

    static async DeleteAgent(agentUid: string) {
        await Turxios.delete("/api/llm/agent", {
            params: {
                uid: agentUid
            }
        })
    }

    static async TestAgent(agentUid: string, activeModel: string, text: string): Promise<LLMAgentTestResponse> {

        const data = new FormData()
        data.set("text", text)
        data.set("agent", agentUid)

        const response = (await axios.post("/api/llm/agent/test", data).catch((e) => {

            return {
                data: {
                    error: `${e.response.status}`,
                    text: "",
                    result: {}
                }
            }
        })).data

        const testResponse = new LLMAgentTestResponse()
        testResponse.FromJson(response)
        return testResponse
    }


}