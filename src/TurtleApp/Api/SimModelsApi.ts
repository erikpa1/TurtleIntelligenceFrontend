import turxios from "@Turtle/Api/Turxios"
import {NeuralNetwork} from "@TurtleApp/Data/NN";
import SimModel from "@TurtleApp/Data/SimModel";


export default class SimModelsApi {


    static async COU(model: SimModel) {
        const form = new FormData()
        form.set("data", JSON.stringify([model.ToJson()]))
        await turxios.post("/api/sim-models", form)
    }

    static async ListModels(): Promise<SimModel[]> {
        return (await turxios.get<any[]>("/api/sim-models")).data.map((val) => {
            const tmp = new NeuralNetwork()
            tmp.FromJson(val)
            return tmp
        })
    }

    static async DeleteModel(uid: string) {
        await turxios.delete("/api/sim-models", {
            params: {
                uid: uid
            }
        })
    }
}