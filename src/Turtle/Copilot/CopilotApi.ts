import Turxios from "@Turtle/Api/Turxios"


export default class CopilotApi {

    static async ChatCopilotContext(context: string, question: string): Promise<string> {
        const response = (await Turxios.post(`/api/${context}/copilot`, {
            data: question
        })).data

        return response
    }


}