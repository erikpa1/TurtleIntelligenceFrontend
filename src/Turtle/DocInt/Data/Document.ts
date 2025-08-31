export class FileDocument {
    uid = ""
    name = ""
    extension = ""
    description = ""

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            extension: this.extension,
            description: this.description,
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""
        this.extension = jObj.extension ?? ""
        this.description = jObj.description ?? ""
    }

    GetDocIntPath(): string {
        return `/doc-int/doc/${this.uid}`
    }


}
