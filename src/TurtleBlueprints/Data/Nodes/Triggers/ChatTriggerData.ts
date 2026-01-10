import NodeTypeData from "@TurtleBlueprints/Data/Nodes/NodeTypeData";

export default class ChatTriggerData extends NodeTypeData {

    triggerDescription = ""

    ToJson(): any {
        return {
            triggerDescription: this.triggerDescription,
        }
    }

    FromJson(jObj: any) {
        this.triggerDescription = jObj.triggerDescription ?? this.triggerDescription
    }

}