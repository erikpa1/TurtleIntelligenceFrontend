import Turxios from "@Turtle/Api/Turxios";


export default class OllamaApi {

    static async List(): Promise<string> {
        return (await Turxios.get("/api/ollama/list")).data

    }
}