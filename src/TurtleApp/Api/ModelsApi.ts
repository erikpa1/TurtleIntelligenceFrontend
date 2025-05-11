import Model from "@TurtleApp/Data/Model";
import {Axios} from "@Turtle/Api/Turxios";


export default class ModelsApi {


    static async COU(model: Model) {
        const form = new FormData()
        form.set("data", JSON.stringify([model.ToJson()]))
        await Axios.post("/api/models", form)
    }

    static async ListModels(): Promise<Model[]> {
        return (await Axios.get<any[]>("/api/models")).data.map((val) => {
            const tmp = new Model()
            tmp.FromJson(val)
            return tmp
        })
    }

    static async DeleteModel(uid: string) {
        await Axios.delete("/api/model", {
            params: {
                uid: uid
            }
        })
    }
}