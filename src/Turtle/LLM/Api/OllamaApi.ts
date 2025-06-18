import Turxios from "@Turtle/Api/Turxios";


export default class OllamaApi {

    static async List(): Promise<string> {
        return (await Turxios.get("/api/ollama/list")).data


    }

    static async Install(cluster: string, model: string): Promise<string> {

        const formData = new FormData()
        formData.set("cluster", cluster)
        formData.set("model", model)

        return (await Turxios.post("/api/ollama/install", formData)).data

    }
}