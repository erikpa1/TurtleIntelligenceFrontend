import LLM from "@Turtle/LLM/Data/LLM";
import Turxios from "@Turtle/Api/Turxios";

export default class LLMApi {

    static async ListClusters(): Promise<Array<LLM>> {
        return (await Turxios.get("/api/llms")).data.map((val) => {
            const tmp = new LLM()
            tmp.FromJson(val)
            return tmp
        })
    }

    static async ListLLMS(): Promise<Array<LLM>> {
        return (await Turxios.get("/api/llms")).data.map((val) => {
            const tmp = new LLM()
            tmp.FromJson(val)
            return tmp
        })
    }

}