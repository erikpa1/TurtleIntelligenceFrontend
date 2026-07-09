function extensionFromName(name: string): string {
    const dot = name.lastIndexOf(".")
    return dot > 0 ? name.slice(dot + 1).toLowerCase() : ""
}

export default class FileEntry {

    name = ""
    path = ""
    isDir = false
    size = 0
    modified = ""
    count = 0
    extension = ""

    FromJson(jObj: any) {
        this.name = jObj.name ?? ""
        this.path = jObj.path ?? ""
        this.isDir = jObj.isDir ?? false
        this.size = jObj.size ?? 0
        this.modified = jObj.modified ?? ""
        this.count = jObj.count ?? 0
        this.extension = jObj.extension ?? extensionFromName(this.name)
    }

}
