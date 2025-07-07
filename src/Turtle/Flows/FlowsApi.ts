import {Flow, FlowLight} from "@Turtle/Flows/Flow"
import Turxios from "@Turtle/Api/Turxios"

export default class FlowsApi {


    static async List(): Promise<FlowLight[]> {

        const response = (await Turxios.get<Array<any>>("/api/flows")).data

        return response.map((val) => {
            const tmp = new FlowLight()
            tmp.FromJson(val)
            return tmp
        })
    }

    static async COU(flow: FlowLight) {
        const tmp = new FormData()
        tmp.set("data", JSON.stringify(flow.ToJson()))
        await Turxios.post<string>("/api/flow", tmp)

    }

    static async Get(flowUid: string): Promise<Flow> {
        const response = (await Turxios.get<Array<any>>("/api/flow", {
            params: {
                uid: flowUid
            }
        })).data
        const flow = new Flow()
        flow.FromJson(response)
        return flow
    }

    static async Delete(flowUid: string) {
        await Turxios.delete("/api/flow", {
            params: {
                uid: flowUid
            }
        })
    }


}