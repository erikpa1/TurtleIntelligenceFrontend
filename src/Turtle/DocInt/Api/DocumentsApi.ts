import {FileDocument} from "@Turtle/DocInt/Data/Document";
import Turxios, {getWithAbort} from "@Turtle/Api/Turxios";
import {UploadDocumentFileParams} from "@Turtle/DocInt/Api/Params";
import axios from "axios";


export default class DocumentsApi {

    static async ListDocuments(): Promise<Array<FileDocument>> {
        return (await axios.get<Array<any>>("/api/docs")).data.map((val) => {
            const tmp = new FileDocument()
            tmp.FromJson(val)
            return tmp
        })
    }

    static async UploadDocument(file: File, params: UploadDocumentFileParams) {
        const data = new FormData()
        data.set("pdf", file)
        data.set("data", JSON.stringify(params.ToJson()))
        await Turxios.post("/api/docs/upload", data)
    }

    static async UpdateDocument(doc: FileDocument) {
        const data = new FormData()
        data.set("data", JSON.stringify(doc.ToJson()))
        await Turxios.put("/api/docs", data)

    }

    static async Delete(uid: string) {
        await Turxios.delete("/api/docs", {
            params: {
                uid: uid
            }
        })
    }

    static async VSearch(abort: AbortController, searchText: string): Promise<Array<VSearchResult>> {
        const tmp = (await getWithAbort<Array<VSearchResult>>(abort, "/api/doc/vsearch", {
            params: {
                query: searchText
            }
        })).data

        console.log(tmp)

        return tmp.map((val) => {
            const doc = new FileDocument()
            doc.FromJson(val.doc)

            return {
                similarity: val.similarity,
                doc: doc
            }
        })

    }

}

export interface VSearchResult {
    similarity: number
    doc: FileDocument
}