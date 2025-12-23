import IconBookmarkManager from "@Turtle/Icons/IconBookmarkManager";
import {IconSimulation} from "@Turtle/Icons";
import IconChat from "@Turtle/Icons/IconChat";
import IconApi from "@Turtle/Icons/IconApi";
import IconOllama from "@Turtle/Icons/IconOllama";

export default class NodesLibrary {

    static httpTrigger = "httpTrigger"
    static chatTrigger = "chatTrigger"

    static bash = "bash"
    static python = "python"
    static javascript = "javascript"
    static powershell = "powershell"

    static writeToFile = "writeToFile"
    static httpRequest = "httpRequest"

    static ollama = "ollama"
    static llmAgent = "llmAgent"
    static mongoDbMemory = "mongoDbMemory"

    //Databases
    static mongoDb = "mongoDb"
    static sqlite = "sqlite"
    static mysql = "mysql"


    static ListLLMNodes(): Array<[string, any]> {
        return [
            [this.llmAgent, IconOllama],
            [this.ollama, IconOllama]
            [this.mongoDbMemory, "/icons/mongo_short.svg"]
        ]
    }


    static ListTriggers(): Array<[string, any]>  {
        return [
            [this.httpTrigger, IconApi],
            [this.chatTrigger, IconChat]
        ]
    }

    static ListActions(): Array<[string, any]> {
        return [
            [this.bash, IconBookmarkManager],
            [this.python, "/icons/python.svg"],
            [this.javascript, "/icons/javascript.svg"],
            [this.powershell, "/icons/powershell.svg"],
        ]
    }

    static ListOutputs(): Array<[string, any]> {
        return [
            [this.writeToFile, IconBookmarkManager],
            [this.httpRequest, IconSimulation],
        ]
    }

    static ListDatabases(): Array<[string, any]> {
        return [
            [this.mongoDb, "/icons/mongo_short.svg"],
            [this.sqlite, "/icons/sqlite.svg"],
            [this.mysql, IconBookmarkManager],
        ]
    }
}