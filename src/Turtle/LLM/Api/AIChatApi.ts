import Turxios from "@Turtle/Api/Turxios";
import {ChatHistoryLight, LLMChat} from "@Turtle/LLM/Data/LLMChatHistory";
import {LangChainStreamer, StreamCallbacks} from "@Turtle/LLM/Api/LangChainStream";


export default class AIChatApi {

    static async Ask(modelUid: string, chatUid: string, text: string) {
        const data = new FormData()
        data.set("modelUid", modelUid)
        data.set("chatUid", chatUid)
        data.set("text", text)

        await Turxios.post("/api/llm/chat-ask", data)
    }


    static async AskModel(modelUid: string, text: string): Promise<string> {
        const data = new FormData()

        data.set("modelUid", modelUid)
        data.set("text", text)
        return (await Turxios.post("/api/llm/ask", data)).data
    }

    static AskModelStream(modelUid: string, text: string, callbacks: StreamCallbacks = {}): LangChainStreamer {

        const streamer = new LangChainStreamer()

        console.log("Started stream")

        streamer.streamResponse("/api/llm/ask/stream", modelUid, text, {
            onToken: (token: string) => {
                console.log(token)
            }
        })

        return streamer

    }

    static async TestEmbeding(): Promise<string> {
        return (await Turxios.post("/api/llm/embedding")).data
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