import Turxios from "@Turtle/Api/Turxios"


export default class CopilotApi {

    static async ChatCopilotContext(context: string, question: string): Promise<string> {
        const response = (await Turxios.post(`/api/${context}/copilot`, question)).data
        return response
    }

    static async GetCopilotExample(context: string): Promise<string> {
        const response = (await Turxios.post(`/api/${context}/copilot/examples`)).data

        return response
    }


}