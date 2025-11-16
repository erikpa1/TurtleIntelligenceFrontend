import Turxios from "@Turtle/Api/Turxios";
import KhDomain from "@Turtle/KnowledgeHub/Data/Domains";


export default class KhDomainApi {

    static async List(): Promise<Array<KhDomain>> {

        const response = (await Turxios.get<Array<any>>("/api/kh/domains")).data

        return response.map((val) => {
            const tmp = new KhDomain()
            tmp.FromJson(val)
            return tmp
        })

    }

    static async COU(domain: KhDomain) {
        const data = new FormData()
        data.set("data", JSON.stringify(domain.ToJson()))
        await Turxios.post("/api/kh/domain", data)
    }

    static async Delete(uid: string) {
        await Turxios.delete("/api/kh/domain", {
            params: {
                uid: uid
            }
        })
    }


}

