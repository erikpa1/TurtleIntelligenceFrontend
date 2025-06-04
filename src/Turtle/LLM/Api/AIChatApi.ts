import Turxios from "@Turtle/Api/Turxios";
import {ChatHistoryLight, LLMChat} from "@Turtle/LLM/Data/ChatHistory";


export default class AIChatApi {

    static async Ask(chatUid: string, text: string) {
        const data = new FormData()
        data.set("chatUid", chatUid)
        data.set("text", text)

        await Turxios.post("/api/llm/chat-ask", data)
    }

    static async GetMyChatHistory(): Promise<Array<ChatHistoryLight>> {

        const tmp = (await Turxios.get<Array<any>>("/api/llm/chats")).data.map((val) => {
            const tmp = new ChatHistoryLight()
            tmp.FromJson(val)
            return tmp
        })

        tmp.reverse()

        return tmp
    }

    static async GetChat(chatUid: string): Promise<LLMChat> {

        const response = (await Turxios.get<Array<any>>("/api/llm/chat", {
            params: {
                "uid": chatUid
            }
        })).data

        const tmp = new LLMChat()
        tmp.FromJson(response)

        return tmp

    }

    static async DeleteChat(chatUid: string) {
        await Turxios.delete("/api/llm/chat", {
            params: {
                "uid": chatUid
            }
        })
    }

    static async CreateNewChat(nameSuggestion: string): Promise<string> {
        const truncated = nameSuggestion.length > 17 ? nameSuggestion.slice(0, 17) + "..." : nameSuggestion;

        const data = new FormData()
        data.set("name", truncated)

        return (await Turxios.post("/api/llm/chat/start", data)).data
    }
}