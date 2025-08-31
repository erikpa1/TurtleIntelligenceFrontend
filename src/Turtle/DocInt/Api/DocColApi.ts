import {DocumentsCollection} from "@Turtle/DocInt/Data/DocumentsCollection"
import Turxios from "@Turtle/Api/Turxios"
import {FileDocument} from "@Turtle/DocInt/Data/Document";

export default class DocColApi {


    static async ListCollections(): Promise<DocumentsCollection[]> {
        const tmp = (await Turxios.get<Array<any>>("/api/docs-cols")).data
        return tmp.map((val) => {
            const docCol = new DocumentsCollection()
            docCol.FromJson(val)
            return docCol
        })
    }

    static async ListDocumentsOfCollection(colUid: string): Promise<Array<FileDocument>> {
        const tmp = (await Turxios.get<Array<any>>("/api/docs-cols/docs", {
            params: {
                uid: colUid
            }
        })).data

        return tmp.map((val) => {
            const docCol = new FileDocument()
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

    static async DeleteAssignment(docColUid: string) {
        await Turxios.delete("/api/docs-col/item", {
            params: {
                uid: docColUid
            }
        })
    }

    static async RefreshCollection(docColUid: string) {
        await Turxios.post("/api/docs-col/refresh", null, {
            params: {
                uid: docColUid
            }
        })
    }

    static async ClearCollection(docColUid: string) {
        await Turxios.delete("/api/docs-col/clear", {
            params: {
                uid: docColUid
            }
        })
    }
}