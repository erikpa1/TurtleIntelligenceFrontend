
export default class ForeachFolderData {

    static TYPE = "foreachFolder"

    folderPath = ""


    ToJson() {
        return {
            folderPath: this.folderPath
        }
    }

    FromJson(jObj: any) {
        this.folderPath = jObj.folderPath ?? this.folderPath
    }
}

