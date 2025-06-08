import {XApiKey} from "@Turtle/XApiKey/XApiKey";
import Turxios from "@Turtle/Api/Turxios";

export default class XApiKeyApi {
    static async ListKeys(): Promise<XApiKey[]> {
        return (await Turxios.get<Array<any>>("/api/xApiKeys")).data.map((val) => {
            const tmp = new XApiKey()
            tmp.FromJson(val)
            return tmp
        })
    }

    static async COUKey(key: XApiKey) {
        const data = new FormData()
        data.set("data", JSON.stringify(key))
        await Turxios.post<Array<any>>("/api/xApiKey")
    }


    static async DeleteKey(key: string) {
        await Turxios.delete("/api/xApiKey", {
            params: {
                uid: key
            }
        })
    }


}