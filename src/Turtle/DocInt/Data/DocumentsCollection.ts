export class DocumentsCollection {
    uid = ""
    name = ""
    selectedTags = new Set<string>()
    filter = ""

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            selectedTags: Array.from(this.selectedTags),
            filter: this.filter,
        }
    }

    FromJson(jObj: any): any {
        this.uid = jObj.uid ?? ""
        this.name = jObj.name ?? ""
        this.selectedTags = new Set<string>((jObj.selectedTags ?? []))
        this.filter = jObj.filter ?? ""
    }
}