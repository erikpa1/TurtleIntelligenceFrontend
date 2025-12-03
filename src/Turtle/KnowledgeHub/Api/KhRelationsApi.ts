import KnowledgeRelation from "@Turtle/KnowledgeHub/Data/KnowledgeRelation";
import Turxios, {PostEntity} from "@Turtle/Api/Turxios";


export default class KhRelationsApi {

    static async COU(entity: KnowledgeRelation) {
        const tmp = new FormData()
        tmp.set("data", JSON.stringify(entity.ToJson()))
        await PostEntity("/api/kh/relation", entity)
    }

    static async ListConnectionsOfKnowledge(khUid: string): Promise<KnowledgeRelation[]> {

        const tmp = (await Turxios.get<any[]>(`/api/kh/relations`, {
            params: {
                khUid: khUid
            }
        })).data

        return tmp.map((val) => {
            const tmp = new KnowledgeRelation()
            tmp.FromJson(val)
            return tmp
        })

    }
}