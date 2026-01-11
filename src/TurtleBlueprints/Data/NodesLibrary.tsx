import IconChat from "@Turtle/Icons/IconChat"
import IconApi from "@Turtle/Icons/IconApi"
import IconOllama from "@Turtle/Icons/IconOllama"
import IconRobot2 from "@Turtle/Icons/IconRobot2"
import IconNetworkIntelNode from "@Turtle/Icons/IconNetworkIntelNode"

import TriggerHandle from "@TurtleBlueprints/Edit/Nodes/TriggerHandle"
import AgentLLMNode from "@TurtleBlueprints/Edit/Nodes/AgentLLMNode"
import CircleUpTargetNode from "@TurtleBlueprints/Edit/Nodes/CircleUpTargetNode"
import ABNodeHandle from "@TurtleBlueprints/Edit/Nodes/ABNodeHandle"
import CircleNode from "@TurtleBlueprints/Edit/Nodes/CircleNode"
import NodesFactory from "@TurtleBlueprints/Data/NodesFactory"
import COUMongoDb from "@TurtleBlueprints/Edit/EditViews/Databases/COUMongoDb"
import {StaticMemoryData} from "@TurtleBlueprints/Data/Nodes/StaticMemoryData"
import COUStaticMemory from "@TurtleBlueprints/Edit/EditViews/Memory/COUStaticMemory"
import COUOllamaView from "@TurtleBlueprints/Edit/EditViews/COUOllamaView"
import {OllamaData} from "@TurtleBlueprints/Data/Nodes/OllamaData"
import LLMAgentData from "@TurtleBlueprints/Data/Nodes/LLMAgentData"
import COULLMNodeView from "@TurtleBlueprints/Edit/EditViews/COULLMNodeView"


import ChatTriggerData from "@TurtleBlueprints/Data/Nodes/Triggers/ChatTriggerData"
import COUChatTrigger from "@TurtleBlueprints/Edit/EditViews/Triggers/COUChatTrigger"
import {HttpTriggerData} from "@TurtleBlueprints/Data/Nodes/Triggers/HttpTriggerData"
import COUHttpTriggerView from "@TurtleBlueprints/Edit/EditViews/Triggers/COUHttpTriggerView"
import ABNodeSmall from "@TurtleBlueprints/Edit/Nodes/ABNodeSmall"
import ABCircle from "@TurtleBlueprints/Edit/Nodes/ABCircle"
import IconSmartToy from "@Turtle/Icons/IconSmartToy"

import "./Nodes"
import DeepseekOcr from "@TurtleBlueprints/Data/Nodes/Ocr/DeepseekOcr"
import COUDeepseekOcr from "@TurtleBlueprints/NodeCous/COUDeepseekOcr"
import SqliteNode from "@TurtleBlueprints/Data/Nodes/Databases/Sqllite/SqliteNode"
import SqliteInsertNode from "@TurtleBlueprints/Data/Nodes/Databases/Sqllite/SqliteInsert"
import COUSqlite from "@TurtleBlueprints/Edit/EditViews/Databases/COUSqlite"
import ABWithConn from "@TurtleBlueprints/Edit/Nodes/ABWithConn"
import ForeachHandle from "@TurtleBlueprints/Edit/Nodes/ForeachHandle"
import IconRepeat from "@Turtle/Icons/IconRepeat"
import IconLeftClick from "@Turtle/Icons/IconLeftClick"

import {IconSimulation} from "@Turtle/Icons"
import ABErrorNodeHandle from "@TurtleBlueprints/Edit/Nodes/ABErrorNodeHandle"
import IconJson from "@Turtle/Icons/IconJson"
import ABErrorWithConnNodeHandle from "@TurtleBlueprints/Edit/Nodes/ABErrorWithConnNodeHandle"
import IconClinicalNotes from "@Turtle/Icons/IconClinicalNotes"
import COUFormTrigger from "@TurtleBlueprints/Edit/EditViews/Triggers/COUFormTrigger"

import StrToJsonArrayData from "@TurtleBlueprints/Data/Nodes/Json/StrToJsonArrayData"


import IconDriveFileMove from "@Turtle/Icons/IconDriveFileMove"

//FIle system nodes
import {LoadFileStringData, COULoadFileStringView} from "@TurtleBlueprints/Data/Nodes/Filesystem/LoadFileStringData"
import {ForeachFileInFolder, COUForeachFileInFolder} from "@TurtleBlueprints/Data/Nodes/Filesystem/ForeachFileInFolder"
import {WriteToFile, COUWriteToFileView} from "@TurtleBlueprints/Data/Nodes/Filesystem/WriteToFile"
import {MoveFile, COUMoveToFileView} from "@TurtleBlueprints/Data/Nodes/Filesystem/MoveFile"
import LLMIf, {COULLMIfView} from "@TurtleBlueprints/Data/Nodes/LLM/LLMIf"
import IfHandle from "@TurtleBlueprints/Edit/Nodes/IfNode"
import LLMIfHandle from "@TurtleBlueprints/Edit/Nodes/LLMIfHandle"

export default class NodesLibrary {

    static chatTrigger = "chatTrigger"
    static clickTrigger = "clickTrigger"
    static formTrigger = "formTrigger"

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

    static triggers = new Set([HttpTriggerData.TYPE, this.chatTrigger])


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
        //TODO AI nody by mali byt v stamostatnom packagi
        return [
            this.llmAgent,
            this.ollama,
            this.mongoDbMemory,
            this.staticMemory,
            ...NodesFactory.NODE_GROUPS.get("llm") ?? []
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


    static InitLLMNodes() {
        const CATEGORY = "llm"


        //File system
        NodesFactory.Register({
            type: LLMIf.TYPE,
            dataConstructor: LLMIf,
            couComponent: COULLMIfView,
            icon: IconSimulation, //TODO find icon with arrows
            nodeHandle: LLMIfHandle,
            groupType: CATEGORY,
        })

    }

    static InitFileNodes() {

        const CATEGORY = "filesystem"

        //File system
        NodesFactory.Register({
            type: LoadFileStringData.TYPE,
            dataConstructor: LoadFileStringData,
            couComponent: COULoadFileStringView,
            icon: IconSimulation,
            nodeHandle: ABErrorNodeHandle,
            groupType: CATEGORY,
        })

        NodesFactory.Register({
            type: ForeachFileInFolder.TYPE,
            icon: IconRepeat,
            nodeHandle: ForeachHandle,
            dataConstructor: ForeachFileInFolder,
            couComponent: COUForeachFileInFolder,
            groupType: CATEGORY,
        })

        NodesFactory.Register({
            type: MoveFile.TYPE,
            icon: IconDriveFileMove,
            dataConstructor: MoveFile,
            couComponent: COUMoveToFileView,
            nodeHandle: ABErrorNodeHandle,
            groupType: CATEGORY,
        })

    }


    static InitNodesFactory() {

        this.InitFileNodes()
        this.InitLLMNodes()

        /*
            Triggers
         */
        NodesFactory.Register({
            type: HttpTriggerData.TYPE,
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

        NodesFactory.Register({
            type: this.formTrigger,
            icon: IconClinicalNotes,
            couComponent: COUFormTrigger,
            nodeHandle: TriggerHandle,
            groupType: "trigger",
        })

        /*
            Action nodes
         */
        NodesFactory.Register({
            type: this.writeToFile,
            dataConstructor: WriteToFile,
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
            dataConstructor: StrToJsonArrayData,
            nodeHandle: ABErrorNodeHandle,
        })

    }
}