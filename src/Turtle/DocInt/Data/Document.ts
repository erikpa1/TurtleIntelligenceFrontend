export class FileDocument {
    uid = ""
    name = ""
    ext = ""
    description = ""

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            ext: this.ext,
            description: this.description,
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""
        this.ext = jObj.ext ?? ""
        this.description = jObj.description ?? ""
    }


}
