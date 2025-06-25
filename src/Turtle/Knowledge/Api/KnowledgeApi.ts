import Turxios from "@Turtle/Api/Turxios";
import {Knowledge} from "@Turtle/Knowledge/Data/Knowledge";

export default class KnowledgeApi {

    static async Delete(knowledge: string) {
        await Turxios.delete("/api/knowledge", {
            params: {
                uid: knowledge
            }
        });
    }

    static async List(): Promise<Knowledge[]> {
        const response = (await Turxios.get<Array<any>>("/api/knowledge/list", {})).data

        return response.map((val) => {
            const tmp = new Knowledge()
            tmp.FromJson(val)
            return tmp
        })

    }

    static async COU(knowledge: Knowledge) {
        const data = new FormData()
        data.set("data", JSON.stringify(knowledge.ToJson()))
        await Turxios.post("/api/knowledge", data)
    }

}