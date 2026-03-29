import NetessPod from "@TurtleNetess/Data/NetessPod"
import Turxios from "@Turtle/Api/Turxios";


export default class NetessApi {

    static async ListPods(): Promise<Array<NetessPod>> {
        const response = (await Turxios.get<Array<any>>("/api/netess/pods")).data
        return response.map((val) => {
            const tmp = new NetessPod()
            tmp.FromJson(val)
            return tmp
        })
    }

    static async COUPod(pod: NetessPod) {
        const data = new FormData()
        data.set("data", JSON.stringify(pod.ToJson()))
        await Turxios.post("/api/netess/pod", data)
    }

    static async DeletePod(podUid: string) {
        await Turxios.delete("/api/netess/pod", {
            params: {
                uid: podUid
            }
        })
    }


}