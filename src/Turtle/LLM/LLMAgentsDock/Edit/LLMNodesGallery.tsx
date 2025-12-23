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
import NodesFactory from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/NodesFactory";


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
        tmp.typeData = NodesFactory.GetDataByType(nodeType, {})

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
                    NodesLibrary.ListTriggers().map(([iconType, icon]) => {
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
                                    onClick={() => addNodePressed(iconType, NodePhaseType.TRIGGER)}
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
                {
                    NodesLibrary.ListLLMNodes().map(([iconType, icon]) => {
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
                                    onClick={() => addNodePressed(iconType, NodePhaseType.ACTION)}
                                />
                            </Col>
                        )
                    })
                }
            </Row>

            <Divider orientation={"left"}>
                {t("actions")}
            </Divider>

            <Row>
                {
                    NodesLibrary.ListActions().map(([iconType, icon]) => {
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
            </Row>

            <Divider orientation={"left"}>
                {t("outputs")}
            </Divider>

            <Row>
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
            </Row>

            <Divider orientation={"left"}>
                {t("databases")}
            </Divider>

            <Row>
                {
                    NodesLibrary.ListDatabases().map(([iconType, icon]) => {
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
                                    onClick={() => addNodePressed(iconType, NodePhaseType.DATABASE)}
                                />
                            </Col>
                        )
                    })
                }
            </Row>


        </Flex>
    )
}



function _GalleryIcon({icon}) {

    if (typeof icon === 'string') {
        return (
            <img
                src={icon as ""}
                alt={"icon"}
                style={{
                    width: "50px",
                    height: "50px",
                }}
            />
        )
    } else {

        return React.createElement(icon, {
            width: "50px",
            height: "50px",
        })
    }

}
