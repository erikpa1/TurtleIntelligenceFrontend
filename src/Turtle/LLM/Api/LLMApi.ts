import LLM from "@Turtle/LLM/Data/LLM";
import Turxios from "@Turtle/Api/Turxios";
import LLMCluster from "@Turtle/LLM/Data/LLMCluster";

export default class LLMApi {

    //---od tadato zacinaju modely

    static async ListLLMS(): Promise<Array<LLM>> {
        return (await Turxios.get("/api/llm/models")).data.map((val) => {
            const tmp = new LLM()
            tmp.FromJson(val)
            return tmp
        })
    }

    static async ListLLMSMap(): Promise<Map<string, LLM>> {
        return new Map((await LLMApi.ListLLMS()).map((val) => [val.uid, val]))
    }

    static async DeleteModel(mopdelUid: string) {
        await Turxios.delete("/api/llm/model", {
            params: {
                uid: mopdelUid
            }
        })
    }

    static async COUModel(model: LLM) {
        const formData = new FormData()
        formData.set("data", JSON.stringify(model.ToJson()))
        await Turxios.post("/api/llm/model", formData)
    }


    //---od tadato zacinaju clustre

    static async ListClusters(): Promise<Array<LLMCluster>> {
        return (await Turxios.get("/api/llm/clusters")).data.map((val) => {
            const tmp = new LLMCluster()
            tmp.FromJson(val)
            return tmp
        })
    }

    static async COUCluster(cluster: LLMCluster) {
        const formData = new FormData()
        formData.set("data", JSON.stringify(cluster.ToJson()))
        await Turxios.post("/api/llm/cluster", formData)
    }


    static async DeleteCluster(clusterUid: string) {
        await Turxios.delete("/api/llm/cluster", {
            params: {
                uid: clusterUid
            }
        })
    }


}