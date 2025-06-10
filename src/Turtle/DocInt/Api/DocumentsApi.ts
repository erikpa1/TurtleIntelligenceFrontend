import {FileDocumentLight} from "@Turtle/DocInt/Data/Document";
import Turxios from "@Turtle/Api/Turxios";
import {UploadDocumentFileParams} from "@Turtle/DocInt/Api/Params";


export default class DocumentsApi {

    static async ListDocuments(): Promise<Array<FileDocumentLight>> {
        return (await Turxios.get<Array<any>>("/api/documents")).data.map((val) => {
            const tmp = new FileDocumentLight()
            tmp.FromJson(val)
            return tmp
        })
    }

    static async UploadDocument(file: File, params: UploadDocumentFileParams) {


    }

}