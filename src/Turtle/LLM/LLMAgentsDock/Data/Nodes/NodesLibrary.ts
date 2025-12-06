export default class NodesLibrary {
    static ListTriggers(): string[] {
        return [
            "http-trigger",
        ]
    }

    static ListActions(): string[] {
        return [
            "cmd",
            "python",
            "javascript"
        ]
    }

    static ListOutputs(): string[] {
        return [
            "write-file",
            "http-request",

        ]
    }
}