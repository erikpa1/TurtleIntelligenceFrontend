import IconBookmarkManager from "@Turtle/Icons/IconBookmarkManager";
import {IconSimulation} from "@Turtle/Icons";

export default class NodesLibrary {

    static httTrigger = "httpTrigger"

    static cmd = "cmd"
    static python = "python"
    static javascript = "javascript"

    static writeToFile = "writeToFile"
    static httpRequest = "httpRequest"


    static ListTriggers(): string[] {
        return [
            this.httTrigger,
        ]
    }

    static ListActions(): string[] {
        return [
            this.cmd,
            this.python,
            this.javascript,
        ]
    }

    static ListOutputs(): Array<[string, any]> {
        return [
            [this.writeToFile, IconBookmarkManager],
            [this.httpRequest, IconSimulation],
        ]
    }
}