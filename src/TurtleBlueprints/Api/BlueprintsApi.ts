import {Blueprint, LLMAgentTestResponse} from "@TurtleBlueprints/Data/Blueprint";
import Turxios from "@Turtle/Api/Turxios";
import axios from "axios";


export default class BlueprintsApi {


    static async COU(agent: Blueprint) {
        const data = new FormData()
        data.set("data", JSON.stringify(agent.ToJson()))
        await Turxios.post("/api/blueprint", data)
    }


    static async GetAllAgentsPrompt(): Promise<string> {
        return (await Turxios.get("/api/blueprint/all/prompt")).data

    }

    static async List(): Promise<Array<Blueprint>> {
        return (await Turxios.get("/api/blueprints")).data.map((item) => {
            const tmp = new Blueprint()
            tmp.FromJson(item)
            return tmp
        })
    }

    static async Delete(agentUid: string) {
        await Turxios.delete("/api/blueprint", {
            params: {
                uid: agentUid
            }
        })
    }

    static async TestBlueprint(agentUid: string, activeModel: string, text: string): Promise<LLMAgentTestResponse> {

        const data = new FormData()
        data.set("text", text)
        data.set("agent", agentUid)

        const response = (await axios.post("/api/blueprint/test", data).catch((e) => {

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