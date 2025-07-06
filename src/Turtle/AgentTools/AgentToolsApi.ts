import AgentTool from "@Turtle/AgentTools/AgentTool";
import Turxios from "@Turtle/Api/Turxios";


export default class AgentToolsApi {


    static async ListInstalledTools(): Promise<Array<AgentTool>> {

        const response = (await Turxios.get<Array<any>>("/api/agent-tools")).data

        const data = response.map((val) => {
            const tmp = new AgentTool()
            tmp.FromJson(val)
            return tmp
        })

        console.log(data)

        return data
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