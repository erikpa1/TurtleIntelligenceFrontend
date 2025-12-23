export class WriteToFileNode {
    parentFolder = "llmOutput"
    fileName = ""
    openFolder = false
    useWd = false


    FromJson(jObj: any) {
        this.parentFolder = jObj.method ?? this.parentFolder
        this.fileName = jObj.fileName ?? this.fileName
        this.openFolder = jObj.openFolder ?? this.openFolder
        this.useWd = jObj.useWd ?? this.useWd
    }

    ToJson(): any {
        return {
            parentFolder: this.parentFolder,
            fileName: this.fileName,
            openFolder: this.openFolder,
            useWd: this.useWd,
        }
    }


}