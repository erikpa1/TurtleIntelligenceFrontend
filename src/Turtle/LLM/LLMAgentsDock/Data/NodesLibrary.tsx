import IconChat from "@Turtle/Icons/IconChat";
import IconApi from "@Turtle/Icons/IconApi";
import IconOllama from "@Turtle/Icons/IconOllama";
import IconRobot2 from "@Turtle/Icons/IconRobot2";
import IconNetworkIntelNode from "@Turtle/Icons/IconNetworkIntelNode";

import TriggerHandle from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/TriggerHandle"
import AgentLLMNode from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/AgentLLMNode"
import CircleUpTargetNode from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/CircleUpTargetNode"
import ABNodeHandle from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/ABNodeHandle"
import CircleNode from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/CircleNode"
import NodesFactory from "@Turtle/LLM/LLMAgentsDock/Data/NodesFactory"
import COUMongoDb from "@Turtle/LLM/LLMAgentsDock/Edit/EditViews/Databases/COUMongoDb"
import {StaticMemoryData} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/StaticMemoryData"
import COUStaticMemory from "@Turtle/LLM/LLMAgentsDock/Edit/EditViews/Memory/COUStaticMemory"
import COUOllamaView from "@Turtle/LLM/LLMAgentsDock/Edit/EditViews/COUOllamaView"
import {OllamaData} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/OllamaData"
import LLMAgentData from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/LLMAgentData"
import COULLMNodeView from "@Turtle/LLM/LLMAgentsDock/Edit/EditViews/COULLMNodeView"
import COUWriteToFileView from "@Turtle/LLM/LLMAgentsDock/Edit/EditViews/COUWriteToFileView"
import {WriteToFileNode} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/WriteToFileNode"
import ChatTriggerData from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/Triggers/ChatTriggerData"
import COUChatTrigger from "@Turtle/LLM/LLMAgentsDock/Edit/EditViews/Triggers/COUChatTrigger"
import {HttpTriggerData} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/Triggers/HttpTriggerData"
import COUHttpTriggerView from "@Turtle/LLM/LLMAgentsDock/Edit/EditViews/Triggers/COUHttpTriggerView"
import ABNodeSmall from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/ABNodeSmall"
import ABCircle from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/ABCircle"
import IconSmartToy from "@Turtle/Icons/IconSmartToy"

import "./Nodes/index"
import DeepseekOcr from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/Ocr/DeepseekOcr"
import COUDeepseekOcr from "@Turtle/LLM/LLMAgentsDock/NodeCous/COUDeepseekOcr"
import SqliteNode from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/Databases/Sqllite/SqliteNode"
import SqliteInsertNode from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/Databases/Sqllite/SqliteInsert"
import COUSqlite from "@Turtle/LLM/LLMAgentsDock/Edit/EditViews/Databases/COUSqlite"
import ABWithConn from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/ABWithConn"
import ForeachHandle from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/ForeachHandle"
import IconRepeat from "@Turtle/Icons/IconRepeat"
import IconLeftClick from "@Turtle/Icons/IconLeftClick"
import ForeachFolderData from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/Filesystem/ForeachFolderData"
import {IconSimulation} from "@Turtle/Icons"
import ABErrorNodeHandle from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/ABErrorNodeHandle"
import IconJson from "@Turtle/Icons/IconJson"
import ABErrorWithConnNodeHandle from "@Turtle/LLM/LLMAgentsDock/Edit/Nodes/ABErrorWithConnNodeHandle"

export default class NodesLibrary {

    static httpTrigger = "httpTrigger"
    static chatTrigger = "chatTrigger"
    static clickTrigger = "clickTrigger"

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
            this.writeWord,
            this.writeSqlite,
        ]
    }

    static ListOcr(): string[] {
        return NodesFactory.NODE_GROUPS.get("ocr") ?? []
    }

    static ListCategorized(): { name: string, nodes: string[] }[] {
        //TODO toto prepisat na file system
        return [
            {name: "triggers", nodes: (NodesFactory.NODE_GROUPS.get("trigger") ?? [])},
            {name: "llmNodes", nodes: this.ListLLMNodes()},
            {name: "scripts", nodes: this.ListActions()},
            {name: "outputs", nodes: this.ListOutputs()},
            {name: "databases", nodes: (NodesFactory.NODE_GROUPS.get("databases") ?? [])},
            {name: "ocr", nodes: this.ListOcr()},
            {name: "flow_control", nodes: (NodesFactory.NODE_GROUPS.get("flow_control") ?? [])},
            {name: "filesystem", nodes: (NodesFactory.NODE_GROUPS.get("filesystem") ?? [])},
            {name: "excel", nodes: (NodesFactory.NODE_GROUPS.get("excel") ?? [])},
            {name: "json", nodes: (NodesFactory.NODE_GROUPS.get("json") ?? [])},
        ]
    }

    static GetNodesAndCanvasTypes() {

        const result = {}

        // Actions
        result[this.writeToFile] = ABNodeHandle


        result[this.writeSqlite] = ABCircle

        return {
            ...result,
            ...NodesFactory.NODE_HANDLERS
        }


    }


    static InitNodesFactory() {

        /*
            Triggers
         */
        NodesFactory.Register({
            type: this.httpTrigger,
            dataConstructor: HttpTriggerData,
            couComponent: COUHttpTriggerView,
            icon: IconApi,
            nodeHandle: TriggerHandle,
            groupType: "trigger",
        })

        NodesFactory.Register({
            type: this.chatTrigger,
            dataConstructor: ChatTriggerData,
            couComponent: COUChatTrigger,
            icon: IconChat,
            nodeHandle: TriggerHandle,
            groupType: "trigger",
        })

        NodesFactory.Register({
            type: this.clickTrigger,
            icon: IconLeftClick,
            nodeHandle: TriggerHandle,
            groupType: "trigger",
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
            icon: IconSmartToy,
            nodeHandle: AgentLLMNode
        })

        NodesFactory.Register({
            type: this.ollama,
            dataConstructor: OllamaData,
            couComponent: COUOllamaView,
            icon: IconOllama,
            nodeHandle: CircleUpTargetNode
        })

        NodesFactory.Register({
            type: this.staticMemory,
            dataConstructor: StaticMemoryData,
            couComponent: COUStaticMemory,
            icon: IconNetworkIntelNode,
            nodeHandle: CircleNode
        })

        /* Database nodes */
        NodesFactory.Register({
            type: this.mongoDb,
            couComponent: COUMongoDb,
            icon: "/icons/mongo_short.svg",
            nodeHandle: CircleNode,
            groupType: "database"
        })


        NodesFactory.Register({
            type: this.mysql,
            icon: "/icons/mariaDb.svg",
            nodeHandle: CircleNode,
            groupType: "database"
        })

        /*
        SQL lite
         */
        NodesFactory.Register({
            type: SqliteNode.TYPE,
            icon: "/icons/sqlite.svg",
            dataConstructor: SqliteNode,
            couComponent: COUSqlite,
            groupType: "databases",
            nodeHandle: CircleUpTargetNode
        })

        NodesFactory.Register({
            type: SqliteInsertNode.TYPE,
            icon: "/icons/sqlite.svg",
            dataConstructor: SqliteInsertNode,
            groupType: "databases",
            nodeHandle: ABWithConn
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
            type: this.writeSqlite,
            icon: "/icons/sqlite.svg"
        })

        //OCR
        NodesFactory.Register({
            type: DeepseekOcr.TYPE,
            icon: "/icons/deepseek.svg",
            dataConstructor: DeepseekOcr,
            nodeHandle: ABNodeHandle,
            couComponent: COUDeepseekOcr,
            groupType: "ocr",
        })

        // Flow control nodes
        NodesFactory.Register({
            type: "foreach",
            icon: IconRepeat,
            nodeHandle: ForeachHandle,
            groupType: "flow_control",
        })


        //File system
        NodesFactory.Register({
            type: "loadFileString",
            icon: IconSimulation,
            nodeHandle: ABErrorNodeHandle,
            groupType: "filesystem",
        })



        NodesFactory.Register({
            type: ForeachFolderData.TYPE,
            icon: IconRepeat,
            nodeHandle: ForeachHandle,
            groupType: "filesystem",
        })

        //Excel
        NodesFactory.Register({
            type: "excel",
            icon: "/icons/excel.svg",
            groupType: "excel",
            nodeHandle: CircleUpTargetNode
        })

        NodesFactory.Register({
            type: "writeExcelLine",
            icon: "/icons/excel.svg",
            groupType: "excel",
            nodeHandle: ABErrorWithConnNodeHandle,
        })

        NodesFactory.Register({
            type: "writeExcel",
            icon: "/icons/excel.svg",
            groupType: "excel",
            nodeHandle: ABErrorWithConnNodeHandle,
        })

        //JSON
        NodesFactory.Register({
            type: "strToJsonArray",
            icon: IconJson,
            groupType: "json",
            nodeHandle: ABErrorNodeHandle,
        })

    }
}