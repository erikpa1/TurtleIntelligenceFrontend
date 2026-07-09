export default class PointCloudNodeEntry {

    uid = ""
    cloudUid = ""
    path = ""
    depth = 0
    pointCount = 0
    boundsMin: [number, number, number] = [0, 0, 0]
    boundsMax: [number, number, number] = [0, 0, 0]
    hasChildren = false
    dataPath = ""

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.cloudUid = jObj.cloudUid ?? ""
        this.path = jObj.path ?? ""
        this.depth = jObj.depth ?? 0
        this.pointCount = jObj.pointCount ?? 0
        this.boundsMin = jObj.boundsMin ?? [0, 0, 0]
        this.boundsMax = jObj.boundsMax ?? [0, 0, 0]
        this.hasChildren = jObj.hasChildren ?? false
        this.dataPath = jObj.dataPath ?? ""
    }

}
