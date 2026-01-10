import NodeTypeData from "@TurtleBlueprints/Data/Nodes/NodeTypeData";

export default class DeepseekOcr extends NodeTypeData {

    static TYPE = "deepseekOcr"

    model = "deepseek-ocr:3b"
    prompt = "Extract the text in the image."


    ToJson() {
        return {}
    }

    FromJson(jObj: any) {
        this.model = jObj.model ?? this.model
        this.prompt = jObj.prompt ?? this.prompt
    }
}

