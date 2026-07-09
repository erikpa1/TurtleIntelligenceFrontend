import FileEntry from "./FileEntry";
import turxios from "@Turtle/Api/Turxios";

const UPLOAD_CHUNK_SIZE = 4 * 1024 * 1024

export default class FilesApi {

    static async ListFiles(path: string): Promise<Array<FileEntry>> {

        const data = (await turxios.get<Array<any>>("/api/files/list", {
            params: {path}
        })).data

        return data.map((val) => {
            const tmp = new FileEntry()
            tmp.FromJson(val)
            return tmp
        })
    }

    static async ReadFile(path: string): Promise<string> {
        const data = (await turxios.get<{ path: string, content: string }>("/api/files/read", {
            params: {path}
        })).data

        return data.content
    }

    static RawFileUrl(path: string): string {
        return `/api/files/raw?path=${encodeURIComponent(path)}`
    }

    static async CreateFolder(path: string) {
        const data = new FormData()
        data.set("path", path)
        await turxios.post("/api/files/folder", data)
    }

    static async WriteFile(path: string, content: string) {
        const data = new FormData()
        data.set("path", path)
        data.set("content", content)
        await turxios.post("/api/files/write", data)
    }

    static async DeleteEntry(path: string) {
        await turxios.delete("/api/files", {
            params: {path}
        })
    }

    static async RenameEntry(oldPath: string, newPath: string) {
        const data = new FormData()
        data.set("oldPath", oldPath)
        data.set("newPath", newPath)
        await turxios.put("/api/files/rename", data)
    }

    // UploadFile streams the file to the server in fixed-size chunks instead
    // of a single request, so large files don't have to be held in memory as
    // one payload on either end.
    static async UploadFile(path: string, file: File, onProgress?: (percent: number) => void) {

        const startData = new FormData()
        startData.set("path", path)
        const {uploadId} = (await turxios.post<{ uploadId: string }>("/api/files/upload/start", startData)).data

        try {
            let offset = 0
            while (offset < file.size) {
                const chunk = file.slice(offset, offset + UPLOAD_CHUNK_SIZE)

                const chunkData = new FormData()
                chunkData.set("uploadId", uploadId)
                chunkData.set("chunk", chunk)
                await turxios.post("/api/files/upload/chunk", chunkData)

                offset += UPLOAD_CHUNK_SIZE
                onProgress && onProgress(Math.min(100, Math.round((offset / file.size) * 100)))
            }

            const finishData = new FormData()
            finishData.set("uploadId", uploadId)
            await turxios.post("/api/files/upload/finish", finishData)

            onProgress && onProgress(100)
        } catch (e) {
            const abortData = new FormData()
            abortData.set("uploadId", uploadId)
            await turxios.post("/api/files/upload/abort", abortData)
            throw e
        }
    }

}
