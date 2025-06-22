export class UploadDocumentFileParams {
    name = ""
    description = ""
    llmDescription = true
    descriptionModel = ""
    createEmbedding = true

    ToJson(): any {
        return {
            name: this.name,
            description: this.description,
            llmDescription: this.llmDescription,
            descriptionModel: this.descriptionModel,
            createEmbedding: this.createEmbedding,
        }
    }

}