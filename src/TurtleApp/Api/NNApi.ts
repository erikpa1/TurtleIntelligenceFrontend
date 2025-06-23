import turxios from "@Turtle/Api/Turxios"
import {NeuralNetwork} from "@TurtleApp/Data/NN";


export default class NNApi {


    static async COU(model: NeuralNetwork) {
        const form = new FormData()
        form.set("data", JSON.stringify([model.ToJson()]))
        await turxios.post("/api/nn", form)
    }

    static async ListModels(): Promise<NeuralNetwork[]> {
        return (await turxios.get<any[]>("/api/nn")).data.map((val) => {
            const tmp = new NeuralNetwork()
            tmp.FromJson(val)
            return tmp
        })
    }

    static async DeleteModel(uid: string) {
        await turxios.delete("/api/nn", {
            params: {
                uid: uid
            }
        })
    }
}