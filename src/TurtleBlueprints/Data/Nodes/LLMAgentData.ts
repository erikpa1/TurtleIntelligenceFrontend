import NodeTypeData from "@TurtleBlueprints/Data/Nodes/NodeTypeData";
import ColorConstants from "@Turtle/Constants/ColorConstants";


export default class LLMAgentData extends NodeTypeData{
    systemPrompt = ""

    ToJson(): any {
        return {
            systemPrompt: this.systemPrompt,
        }
    }

    FromJson(jObj: any) {
        this.systemPrompt = jObj.systemPrompt ?? this.systemPrompt
    }

    GetConnectionColor(conn: string): string | undefined {
        if (conn === "b" || conn === "a") {
            return ColorConstants.AZURE_BLUE
        }

        return super.GetConnectionColor(conn)
    }
}