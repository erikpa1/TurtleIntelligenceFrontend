export class FileDocumentLight {
    uid = ""
    name = ""
    ext = ""

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            ext: this.ext
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""
        this.ext = jObj.ext ?? ""
    }


}

export class FileDocument extends FileDocumentLight {

    summary = ""
    tags = ""
    wordsCount = 0

    ToJson(): any {
        return {
            ...super.ToJson(),
            summary: this.summary,
            tags: this.tags,
        }
    }

    FromJson(jObj: any) {
        super.FromJson(jObj)
        this.summary = jObj.summary ?? ""
        this.tags = jObj.tags ?? ""
        this.wordsCount = jObj.wordsCount ?? 0

    }


}