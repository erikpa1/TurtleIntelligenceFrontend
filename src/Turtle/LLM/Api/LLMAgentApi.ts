import {LLMAgent} from "@Turtle/LLM/Data/LLMAgent";
import Turxios from "@Turtle/Api/Turxios";


export default class LLMAgentApi {


    static async COUAgent(agent: LLMAgent) {
        const data = new FormData()
        data.set("data", JSON.stringify(agent.ToJson()))
        await Turxios.post("/api/llm/agents", data)

    }


}