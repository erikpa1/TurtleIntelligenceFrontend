import PointCloudEntry from "./PointCloudEntry";
import PointCloudNodeEntry from "./PointCloudNodeEntry";
import turxios from "@Turtle/Api/Turxios";

const UPLOAD_CHUNK_SIZE = 4 * 1024 * 1024

export default class PointCloudApi {

    static async ListClouds(): Promise<Array<PointCloudEntry>> {
        const data = (await turxios.get<Array<any>>("/api/pointclouds/list")).data

        return data.map((val) => {
            const tmp = new PointCloudEntry()
            tmp.FromJson(val)
            return tmp
        })
    }

    static async GetCloud(uid: string): Promise<PointCloudEntry> {
        const data = (await turxios.get<any>(`/api/pointclouds/${uid}`)).data
        const tmp = new PointCloudEntry()
        tmp.FromJson(data)
        return tmp
    }

    static async DeleteCloud(uid: string) {
        await turxios.delete(`/api/pointclouds/${uid}`)
    }

    static async GetTree(uid: string): Promise<Array<PointCloudNodeEntry>> {
        const data = (await turxios.get<Array<any>>(`/api/pointclouds/${uid}/tree`)).data

        return data.map((val) => {
            const tmp = new PointCloudNodeEntry()
            tmp.FromJson(val)
            return tmp
        })
    }

    static async FetchNodeData(uid: string, path: string, signal?: AbortSignal): Promise<ArrayBuffer> {
        // The root node's path is "", which can't survive as a URL segment
        // (it collapses the "//"), so the server expects "root" for it.
        const segment = path === "" ? "root" : path
        const data = (await turxios.get<ArrayBuffer>(`/api/pointclouds/${uid}/node/${encodeURIComponent(segment)}/data`, {
            responseType: "arraybuffer",
            signal
        })).data

        return data
    }

    // UploadFile streams the file to the server in fixed-size chunks, mirroring
    // FilesApi.UploadFile, so large point cloud sources don't have to be held
    // in memory as one payload on either end.
    static async UploadFile(name: string, file: File, onProgress?: (percent: number) => void): Promise<string> {

        const extension = name.includes(".") ? name.slice(name.lastIndexOf(".") + 1).toLowerCase() : ""

        const startData = new FormData()
        startData.set("name", name)
        startData.set("extension", extension)
        const {uploadId} = (await turxios.post<{ uploadId: string }>("/api/pointclouds/upload/start", startData)).data

        try {
            let offset = 0
            while (offset < file.size) {
                const chunk = file.slice(offset, offset + UPLOAD_CHUNK_SIZE)

                const chunkData = new FormData()
                chunkData.set("uploadId", uploadId)
                chunkData.set("chunk", chunk)
                await turxios.post("/api/pointclouds/upload/chunk", chunkData)

                offset += UPLOAD_CHUNK_SIZE
                onProgress && onProgress(Math.min(100, Math.round((offset / file.size) * 100)))
            }

            const finishData = new FormData()
            finishData.set("uploadId", uploadId)
            const {cloudUid} = (await turxios.post<{ cloudUid: string }>("/api/pointclouds/upload/finish", finishData)).data

            onProgress && onProgress(100)

            return cloudUid
        } catch (e) {
            const abortData = new FormData()
            abortData.set("uploadId", uploadId)
            await turxios.post("/api/pointclouds/upload/abort", abortData)
            throw e
        }
    }

}
