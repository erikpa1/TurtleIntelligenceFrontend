export class UploadDocumentFileParams {
    name = ""
    llmDescription = true
    descriptionModel = ""

    ToJson(): any {
        return {
            name: this.name,
            llmDescription: this.llmDescription,
            descriptionModel: this.descriptionModel,
        }
    }

}