import Turxios from "@Turtle/Api/Turxios";
import AgentIncident from "@Turtle/AgentIncidents/AgentIncident";

export default class AgentIncidentsApi {

    static async List(): Promise<AgentIncident[]> {

        const response = (await Turxios.get<Array<any>>("/api/agents-incidents")).data

        return response.map((val) => {
            const tmp = new AgentIncident()
            tmp.FromJson(val)
            return tmp
        })
    }

    static async Update(inc: AgentIncident) {


        const data = new FormData()
        data.set("data", JSON.stringify(inc.ToJson()))

        await Turxios.put(`/api/agents-incidents`, data)
    }


    static async Delete(incUid: string) {
        await Turxios.delete(`/api/agents-incidents`, {
            params: {
                incUid: incUid
            }
        })
    }

}