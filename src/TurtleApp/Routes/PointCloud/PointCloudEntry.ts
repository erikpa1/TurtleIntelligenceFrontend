export type PointCloudStatus = "processing" | "ready" | "error"

export default class PointCloudEntry {

    uid = ""
    name = ""
    sourcePath = ""
    extension = ""
    status: PointCloudStatus = "processing"
    error = ""
    hasColor = false
    totalPoints = 0
    nodeCount = 0
    maxDepth = 0
    boundsMin: [number, number, number] = [0, 0, 0]
    boundsMax: [number, number, number] = [0, 0, 0]
    created = ""

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""
        this.sourcePath = jObj.sourcePath ?? ""
        this.extension = jObj.extension ?? ""
        this.status = jObj.status ?? "processing"
        this.error = jObj.error ?? ""
        this.hasColor = jObj.hasColor ?? false
        this.totalPoints = jObj.totalPoints ?? 0
        this.nodeCount = jObj.nodeCount ?? 0
        this.maxDepth = jObj.maxDepth ?? 0
        this.boundsMin = jObj.boundsMin ?? [0, 0, 0]
        this.boundsMax = jObj.boundsMax ?? [0, 0, 0]
        this.created = jObj.created ?? ""
    }

}
