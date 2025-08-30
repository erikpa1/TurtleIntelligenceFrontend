import {DocumentsCollection} from "@Turtle/DocInt/Data/DocumentsCollection"
import Turxios from "@Turtle/Api/Turxios"

export default class DocColApi {


    static async ListCollections(): Promise<DocumentsCollection[]> {
        const tmp = (await Turxios.get<Array<any>>("/api/docs-cols")).data
        return tmp.map((val) => {
            const docCol = new DocumentsCollection()
            docCol.FromJson(val)
            return docCol
        })
    }

    static async Create(docCol: DocumentsCollection) {
        const data = new FormData()
        data.set("data", JSON.stringify(docCol.ToJson()))
        await Turxios.post("/api/docs-col", data)
    }

    static async Delete(docColUid: string) {
        await Turxios.delete("/api/docs-col", {
            params: {
                uid: docColUid
            }
        })
    }
}