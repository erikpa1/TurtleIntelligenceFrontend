export class OllamaData {
    ollamaUrl = ""
    modelName = ""


    FromJson(jObj: any) {
        this.ollamaUrl = jObj.method ?? this.ollamaUrl
        this.modelName = jObj.modelName ?? this.modelName
    }

    ToJson(): any {
        return {
            ollamaUrl: this.ollamaUrl,
            modelName: this.modelName,
        }
    }


}