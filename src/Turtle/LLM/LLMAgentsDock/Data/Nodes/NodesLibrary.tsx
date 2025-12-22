import IconBookmarkManager from "@Turtle/Icons/IconBookmarkManager";
import {IconSimulation} from "@Turtle/Icons";

export default class NodesLibrary {

    static httTrigger = "httpTrigger"

    static bash = "bash"
    static python = "python"
    static javascript = "javascript"
    static powershell = "powershell"

    static writeToFile = "writeToFile"
    static httpRequest = "httpRequest"
    static ollama = "ollama"

    //Databases
    static mongoDb = "mongoDb"
    static sqlite = "sqlite"
    static mysql = "mysql"


    static ListTriggers(): string[] {
        return [
            this.httTrigger,
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