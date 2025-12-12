import {Col, Divider, Flex, Row} from "antd"
import React from "react"
import {useTranslation} from "react-i18next";

import {IconSimulation} from "@Turtle/Icons";
import NodesLibrary from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/NodesLibrary";
import {GalleryButton} from "@Turtle/Components/GaleryButton";
import {useAgentNodesZus} from "@Turtle/LLM/LLMAgentsDock/Edit/agentNodeZus";
import AgentNodeParent, {CanvasStatus, PhaseType} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import TurtleApp from "@TurtleApp/TurtleApp";
import {fetchMongoUid} from "@Turtle/Utils/Uid";
import MongoObjectId from "@Turtle/Utils/MongoObjectId";

interface AgentNodesLibraryProps {
    agentUid: string
    onBeforeSubmit: () => void
}


const ICON_SIZE = "50px"

export default function LLMNodesGallery({agentUid, onBeforeSubmit}: AgentNodesLibraryProps) {

    const [t] = useTranslation()

    const {nodes, setNodes} = useAgentNodesZus()

    const [activeView, setActiveView] = React.useState("triggers")

    async function addTriggerPressed(nodeType: string, phase: PhaseType) {
        TurtleApp.Lock()

        const tmp = new AgentNodeParent()
        tmp.uid = await MongoObjectId.GetMongoId()
        tmp.name = "New node"
        tmp.type = nodeType
        tmp.parent = agentUid
        tmp.phaseType = PhaseType.TRIGGER
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
        tmp.phaseType = PhaseType.AGENT
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
                                        <IconSimulation
                                            width={ICON_SIZE}
                                            height={ICON_SIZE}
                                        />
                                    )}
                                    onClick={() => addTriggerPressed(val, PhaseType.TRIGGER)}
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
                                        <IconSimulation
                                            width={ICON_SIZE}
                                            height={ICON_SIZE}
                                        />
                                    )}
                                    onClick={() => addTriggerPressed(val, PhaseType.Action)}
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
                NodesLibrary.ListOutputs().map((val) => {
                    return (
                        <Col
                            span={6}
                            key={val}
                        >
                            <GalleryButton
                                lang={val}
                                icon={(
                                    <IconSimulation
                                        width={ICON_SIZE}
                                        height={ICON_SIZE}
                                    />
                                )}
                                onClick={() => addTriggerPressed(val, PhaseType.OUTPUT)}
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
                <IconSimulation
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                />
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
                <IconSimulation
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                />
            )}
            onClick={onClick}
        />
    )
}