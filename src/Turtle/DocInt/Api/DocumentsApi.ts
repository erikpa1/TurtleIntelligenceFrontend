import {FileDocumentLight} from "@Turtle/DocInt/Data/Document";
import Turxios from "@Turtle/Api/Turxios";
import {UploadDocumentFileParams} from "@Turtle/DocInt/Api/Params";
import axios from "axios";


export default class DocumentsApi {

    static async ListDocuments(): Promise<Array<FileDocumentLight>> {
        return (await axios.get<Array<any>>("/api/docs")).data.map((val) => {
            const tmp = new FileDocumentLight()
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

}