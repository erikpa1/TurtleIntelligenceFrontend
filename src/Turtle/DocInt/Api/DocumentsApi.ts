import axios from "axios";
import {FileDocument} from "@Turtle/DocInt/Data/Document";
import Turxios, {getWithAbort} from "@Turtle/Api/Turxios";
import {UploadDocumentFileParams} from "@Turtle/DocInt/Api/Params";

export default class DocumentsApi {

    static DocFilePath(documentUid: string): string {
        return `/api/doc/file?uid=${documentUid}`
    }

    static async Get(documentUid: string): Promise<FileDocument> {
        const response = (await axios.get<Array<any>>("/api/doc", {
            params: {
                uid: documentUid
            }
        })).data
        const tmp = new FileDocument()
        tmp.FromJson(response)
        return tmp
    }

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