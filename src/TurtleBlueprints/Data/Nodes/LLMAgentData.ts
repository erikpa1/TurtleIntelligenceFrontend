import NodeTypeData from "@TurtleBlueprints/Data/Nodes/NodeTypeData";
import ColorConstants from "@Turtle/Constants/ColorConstants";
import NodeColors from "@TurtleBlueprints/Data/Nodes/NodeColors";


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

    GetConnectionType(conn: string): string | undefined {
        if (conn === "b" || conn === "a") {
            return NodeColors.STRING
        }

        return super.GetConnectionType(conn)
    }
}