import {Col, Divider, Flex, Row} from "antd"
import React from "react"
import {useTranslation} from "react-i18next"
import {IconSimulation} from "@Turtle/Icons"

import NodesLibrary from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/NodesLibrary"
import {GalleryButton} from "@Turtle/Components/GaleryButton"
import {useAgentNodesZus} from "@Turtle/LLM/LLMAgentsDock/Edit/agentNodeZus"
import AgentNodeParent, {CanvasStatus, NodePhaseType} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import TurtleApp from "@TurtleApp/TurtleApp"
import MongoObjectId from "@Turtle/Utils/MongoObjectId"
import IconApi from "@Turtle/Icons/IconApi"
import IconOllama from "@Turtle/Icons/IconOllama"


interface AgentNodesLibraryProps {
    agentUid: string
    onBeforeSubmit: () => void
}


export default function LLMNodesGallery({agentUid, onBeforeSubmit}: AgentNodesLibraryProps) {

    const [t] = useTranslation()

    const {nodes, setNodes} = useAgentNodesZus()


    async function addNodePressed(nodeType: string, phase: NodePhaseType) {
        TurtleApp.Lock()

        const tmp = new AgentNodeParent()
        tmp.uid = await MongoObjectId.GetMongoId()
        tmp.name = `${nodeType}`
        tmp.type = nodeType
        tmp.parent = agentUid
        tmp.phaseType = phase
        tmp.RandomizePosition()
        tmp.canvasStatus = CanvasStatus.CREATED

        TurtleApp.Unlock()

        setNodes([...nodes, tmp])

        onBeforeSubmit?.()
    }

    async function addAllAgentPressed() {
        TurtleApp.Lock()

        const tmp = new AgentNodeParent()
        tmp.uid = await MongoObjectId.GetMongoId()
        tmp.name = "LLM Agent"
        tmp.type = "llmAgent"
        tmp.parent = agentUid
        tmp.phaseType = NodePhaseType.AGENT
        tmp.RandomizePosition()
        tmp.canvasStatus = CanvasStatus.CREATED

        TurtleApp.Unlock()

        setNodes([...nodes, tmp])

        onBeforeSubmit?.()
    }


    async function addMemory() {
    }


    return (
        <Flex vertical gap={15}>

            <Divider orientation={"left"}>
                {t("triggers")}
            </Divider>

            <Row>
                {
                    NodesLibrary.ListTriggers().map((val) => {
                        return (
                            <Col
                                span={6}
                                key={val}
                            >
                                <GalleryButton
                                    lang={val}
                                    icon={(
                                        <_GalleryIcon icon={IconApi}/>
                                    )}
                                    onClick={() => addNodePressed(val, NodePhaseType.TRIGGER)}
                                />
                            </Col>
                        )
                    })
                }
            </Row>

            <Divider orientation={"left"}>
                LLM
            </Divider>

            <Row>
                <Col span={6}>
                    <_LLMAgentButton onClick={addAllAgentPressed}/>
                </Col>
                <Col span={6}>
                    <_LLMMemoryButton onClick={addAllAgentPressed}/>
                </Col>
                <Col span={6}>
                    <_OllamaButton onBeforeSubmit={onBeforeSubmit} agentUid={agentUid}/>
                </Col>
            </Row>


            <Divider orientation={"left"}>
                {t("actions")}
            </Divider>

            <Row>
                {
                    NodesLibrary.ListActions().map((val) => {
                        return (
                            <Col
                                span={6}
                                key={val}
                            >
                                <GalleryButton
                                    lang={val}
                                    icon={(
                                        <_GalleryIcon icon={IconSimulation}/>
                                    )}
                                    onClick={() => addNodePressed(val, NodePhaseType.ACTION)}
                                />
                            </Col>
                        )
                    })
                }
            </Row>

            <Divider orientation={"left"}>
                {t("outputs")}
            </Divider>

            {
                NodesLibrary.ListOutputs().map(([iconType, icon]) => {
                    return (
                        <Col
                            span={6}
                            key={iconType}
                        >
                            <GalleryButton
                                lang={iconType}
                                icon={(
                                    <_GalleryIcon icon={icon}/>
                                )}
                                onClick={() => addNodePressed(iconType, NodePhaseType.OUTPUT)}
                            />
                        </Col>
                    )
                })
            }

        </Flex>
    )
}

function _LLMAgentButton({onClick}) {
    return (
        <GalleryButton
            lang={"llm.agent"}
            icon={(
                <_GalleryIcon icon={IconSimulation}/>
            )}
            onClick={onClick}
        />
    )
}

function _LLMMemoryButton({onClick}) {
    return (
        <GalleryButton
            lang={"MongoDB memory"}
            icon={(
                <_GalleryIcon icon={IconSimulation}/>
            )}
            onClick={onClick}
        />
    )
}

function _OllamaButton({
                           onBeforeSubmit,
                           agentUid
                       }: AgentNodesLibraryProps) {

    async function addOllamaPressed() {

        const {nodes, setNodes} = useAgentNodesZus.getState()

        TurtleApp.Lock()

        const tmp = new AgentNodeParent()
        tmp.uid = await MongoObjectId.GetMongoId()
        tmp.name = "Ollama"
        tmp.type = "ollama"
        tmp.parent = agentUid
        tmp.phaseType = NodePhaseType.AGENT
        tmp.RandomizePosition()
        tmp.canvasStatus = CanvasStatus.CREATED

        TurtleApp.Unlock()

        setNodes([...nodes, tmp])

        onBeforeSubmit?.()
    }


    return (
        <GalleryButton
            lang={"Ollama"}
            icon={(
                <_GalleryIcon icon={IconOllama}/>
            )}
            onClick={addOllamaPressed}
        />
    )
}

function _GalleryIcon({icon}) {
    return React.createElement(icon, {
        width: "50px",
        height: "50px",
    })
}
