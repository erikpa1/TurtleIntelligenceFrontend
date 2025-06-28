import Turxios from "@Turtle/Api/Turxios";
import {Knowledge} from "@Turtle/Knowledge/Data/Knowledge";
import {GuidanceStep} from "@Turtle/Knowledge/Data/Guidance";

export default class KnowledgeApi {


    static async Get(knUid: string): Promise<Knowledge> {
        const data = (await Turxios.get("/api/knowledge", {
            params: {
                uid: knUid
            }
        })).data

        const knowledge = new Knowledge()
        knowledge.FromJson(data)
        return knowledge
    }

    static async COUStep(guidanceStep: GuidanceStep) {
        const data = new FormData()
        data.set("data", JSON.stringify(guidanceStep.ToJson()))
        await Turxios.post("/api/knowledge/step", data)
    }

    static async DeleteStep(stepUid: string) {
        await Turxios.delete("/api/knowledge/step", {
            params: {
                uid: stepUid
            }
        })
    }


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