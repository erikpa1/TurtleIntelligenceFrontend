
export default class DeepseekOcr {

    static TYPE = "deepseekOcr"

    model = "deepseek-ocr:3b"
    prompt = ""

    constructor() {
        this.prompt = "Extract the text in the image."
    }

    ToJson() {
        return {

        }
    }

    FromJson(jObj: any) {
        this.model = jObj.model ?? this.model
        this.prompt = jObj.prompt ?? this.prompt
    }
}

