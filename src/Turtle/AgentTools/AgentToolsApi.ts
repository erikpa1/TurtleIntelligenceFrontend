import AgentTool from "@Turtle/AgentTools/AgentTool";
import Turxios from "@Turtle/Api/Turxios";


export default class AgentToolsApi {


    static async ListInstalledTools(): Promise<Array<AgentTool>> {

        const response = (await Turxios.get<Array<any>>("/api/agent-tools")).data

        return response.map((val) => {
            const tmp = new AgentTool()
            tmp.FromJson(val)
            return tmp
        })
    }


    static async ListAllAvailableTools(): Promise<Array<AgentTool>> {

        const response = (await Turxios.get<Array<any>>("/api/agent-tools/store")).data

        return response.map((val) => {
            const tmp = new AgentTool()
            tmp.FromJson(val)
            return tmp
        })
    }

}