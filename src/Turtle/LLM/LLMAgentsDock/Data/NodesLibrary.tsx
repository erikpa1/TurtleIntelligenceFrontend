
import IconChat from "@Turtle/Icons/IconChat";
import IconApi from "@Turtle/Icons/IconApi";
import IconOllama from "@Turtle/Icons/IconOllama";
import IconRobot2 from "@Turtle/Icons/IconRobot2";
import IconNetworkIntelNode from "@Turtle/Icons/IconNetworkIntelNode";

import TriggerNode from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/TriggerNode"
import AgentLLMNode from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/AgentLLMNode"
import OllamaNode from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/OllamaNode"
import ABNode from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/ABNode"
import CircleNode from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/CircleNode"
import NodesFactory from "@Turtle/LLM/LLMAgentsDock/Data/NodesFactory"
import COUMongoDb from "@Turtle/LLM/LLMAgentsDock/Edit/EditViews/COUMongoDb"
import {StaticMemoryData} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/StaticMemoryData"
import COUStaticMemory from "@Turtle/LLM/LLMAgentsDock/Edit/EditViews/COUStaticMemory"
import COUOllamaView from "@Turtle/LLM/LLMAgentsDock/Edit/EditViews/COUOllamaView"
import {OllamaData} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/OllamaData"
import LLMAgentData from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/LLMAgentData"
import COULLMNodeView from "@Turtle/LLM/LLMAgentsDock/Edit/EditViews/COULLMNodeView"
import COUWriteToFileView from "@Turtle/LLM/LLMAgentsDock/Edit/EditViews/COUWriteToFileView"
import {WriteToFileNode} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/WriteToFileNode"
import ChatTriggerData from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/ChatTriggerData"
import COUChatTrigger from "@Turtle/LLM/LLMAgentsDock/Edit/EditViews/COUChatTrigger"
import {HttpTriggerData} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/HttpTriggerData"
import COUHttpTriggerView from "@Turtle/LLM/LLMAgentsDock/Edit/EditViews/COUHttpTriggerView"
import ABNodeSmall from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/ABNodeSmall"
import ABCircle from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/ABCircle"
import IconSmartToy from "@Turtle/Icons/IconSmartToy"

export default class NodesLibrary {

    static httpTrigger = "httpTrigger"
    static chatTrigger = "chatTrigger"

    static bash = "bash"
    static python = "python"
    static javascript = "javascript"
    static powershell = "powershell"


    static httpRequest = "httpRequest"

    static ollama = "ollama"
    static llmAgent = "llmAgent"
    static mongoDbMemory = "mongoDbMemory"
    static staticMemory = "staticMemory"

    //Databases
    static mongoDb = "mongoDb"
    static sqlite = "sqlite"
    static mysql = "mysql"

    static triggers = new Set([this.httpTrigger, this.chatTrigger])


    // Formats
    static readExcel = "readExcel"
    static readWord = "readWord"
    static readPdf = "readPdf"
    static readImage = "readImage"
    static readVideo = "readVideo"
    static readAudio = "readAudio"
    static readTextFile = "readTextFile"
    static readPpt = "readPpt"
    static readCsv = "readCsv"
    static readJson = "readJson"
    static readText = "readText"

    static writeExcel = "writeExcel"
    static writeWord = "writeWord"
    static writePpt = "writePpt"
    static writeCsv = "writeCsv"
    static writeJson = "writeJson"
    static writeText = "writeText"
    static writeToFile = "writeToFile"
    static writeSqlite = "writeSqllite"

    static ListLLMNodes(): string[] {
        return [
            this.llmAgent,
            this.ollama,
            this.mongoDbMemory,
            this.staticMemory,
        ]
    }

    static ListTriggers(): string[] {
        return [
            this.httpTrigger,
            this.chatTrigger
        ]
    }

    static ListActions(): string[] {
        return [
            this.bash,
            this.python,
            this.javascript,
            this.powershell,
        ]
    }

    static ListReaders(): string[] {
        return [
            this.readExcel,
            this.readWord,
        ]
    }

    static ListOutputs(): string[] {
        return [
            this.writeToFile,
            this.httpRequest,
            this.writeExcel,
            this.writeWord,
            this.writeSqlite,
        ]
    }

    static ListDatabases(): string[] {
        return [
            this.mongoDb,
            this.sqlite,
            this.mysql,
        ]
    }

    static ListCategorized(): { name: string, nodes: string[] }[] {
        return [
            {name: "triggers", nodes: this.ListTriggers()},
            {name: "llmNodes", nodes: this.ListLLMNodes()},
            {name: "scripts", nodes: this.ListActions()},
            {name: "outputs", nodes: this.ListOutputs()},
            {name: "databases", nodes: this.ListDatabases()},
        ]
    }

    static GetNodesAndCanvasTypes() {

        const result = {}

        // Triggers
        result[this.httpTrigger] = TriggerNode
        result[this.chatTrigger] = TriggerNode

        // LLM nodes
        result[this.llmAgent] = AgentLLMNode
        result[this.ollama] = OllamaNode
        result[this.staticMemory] = CircleNode
        result[this.mongoDbMemory] = CircleNode

        // Actions
        result[this.writeToFile] = ABNode

        // Databases
        result[this.mongoDb] = CircleNode
        result[this.sqlite] = CircleNode
        result[this.mysql] = CircleNode

        //Formats
        result[this.writeExcel] = ABCircle
        result[this.writeSqlite] = ABCircle

        return result


    }


    static InitNodesFactory() {

        /*
            Triggers
         */
        NodesFactory.Register({
            type: this.httpTrigger,
            dataConstructor: HttpTriggerData,
            couComponent: COUHttpTriggerView,
            icon: IconApi
        })

        NodesFactory.Register({
            type: this.chatTrigger,
            dataConstructor: ChatTriggerData,
            couComponent: COUChatTrigger,
            icon: IconChat
        })


        /*
            Action nodes
         */
        NodesFactory.Register({
            type: this.writeToFile,
            dataConstructor: WriteToFileNode,
            couComponent: COUWriteToFileView,
        })


        /*
            LLM nodes
         */
        NodesFactory.Register({
            type: this.llmAgent,
            dataConstructor: LLMAgentData,
            couComponent: COULLMNodeView,
            icon: IconSmartToy
        })

        NodesFactory.Register({
            type: this.ollama,
            dataConstructor: OllamaData,
            couComponent: COUOllamaView,
            icon: IconOllama
        })

        NodesFactory.Register({
            type: this.staticMemory,
            dataConstructor: StaticMemoryData,
            couComponent: COUStaticMemory,
            icon: IconNetworkIntelNode
        })

        /* Database nodes */
        NodesFactory.Register({
            type: this.mongoDb,
            couComponent: COUMongoDb,
            icon: "/icons/mongo_short.svg"
        })


        NodesFactory.Register({
            type: this.sqlite,
            icon: "/icons/sqlite.svg"
        })

        NodesFactory.Register({
            type: this.mysql,
            icon: "/icons/mariaDb.svg"
        })

        /* Script nodes */
        NodesFactory.Register({
            type: this.bash,
            icon: IconRobot2
        })

        NodesFactory.Register({
            type: this.python,
            icon: "/icons/python.svg"
        })

        NodesFactory.Register({
            type: this.javascript,
            icon: "/icons/javascript.svg"
        })

        NodesFactory.Register({
            type: this.powershell,
            icon: "/icons/powershell.svg"
        })

        //Formats
        NodesFactory.Register({
            type: this.writeExcel,
            icon: "/icons/excel.svg"
        })

        NodesFactory.Register({
            type: this.writeSqlite,
            icon: "/icons/sqlite.svg"
        })


    }
}