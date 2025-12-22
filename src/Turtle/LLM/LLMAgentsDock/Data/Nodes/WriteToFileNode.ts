export class WriteToFileNode {
    parentFolder = "C:/LLMOutput"
    fileName = ""


    FromJson(jObj: any) {
        this.parentFolder = jObj.method ?? this.parentFolder
        this.fileName = jObj.fileName ?? this.fileName
    }

    ToJson(): any {
        return {
            parentFolder: this.parentFolder,
            fileName: this.fileName,
        }
    }


}