import Turxios from "@Turtle/Api/Turxios";


export default class AIChatApi {
    static async Chat(chatUid: string, text: string) {

        const data = new FormData()
        data.set("chatUid", chatUid)
        data.set("text", text)

        await Turxios.post("/api/llm/chat-ask", data)
    }
}