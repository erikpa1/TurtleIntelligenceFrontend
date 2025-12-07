import {Col, Divider, Flex, Row} from "antd"
import React from "react"
import {useTranslation} from "react-i18next";

import {IconSimulation} from "@Turtle/Icons";
import NodesLibrary from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/NodesLibrary";
import {GalleryButton} from "@Turtle/Components/GaleryButton";
import {useAgentNodesZus} from "@Turtle/LLM/LLMAgentsDock/Edit/agentNodeZus";
import AgentNodeParent, {PhaseType} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import TurtleApp from "@TurtleApp/TurtleApp";

export default function AgentNodesLibrary({onBeforeSubmit}) {

    const [t] = useTranslation()


    const {nodes, setNodes} = useAgentNodesZus()

    const [activeView, setActiveView] = React.useState("triggers")

    function addPressed(nodeType: string, phase: PhaseType) {
        TurtleApp.Lock()

        const tmp = new AgentNodeParent()
        tmp.uid = crypto.randomUUID()
        tmp.name = "New node"
        tmp.type = nodeType
        tmp.phaseType = PhaseType.TRIGGER

        TurtleApp.Unlock()

        setNodes([...nodes, tmp])

        onBeforeSubmit?.()
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
                                            width={"50px"}
                                            height={"50px"}
                                        />
                                    )}
                                    onClick={() => addPressed(val, PhaseType.TRIGGER)}
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
                                            width={"50px"}
                                            height={"50px"}
                                        />
                                    )}
                                    onClick={() => addPressed(val, PhaseType.CONTROL)}
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
                                        width={"50px"}
                                        height={"50px"}
                                    />
                                )}
                                onClick={() => addPressed(val, PhaseType.OUTPUT)}
                            />
                        </Col>
                    )
                })
            }

        </Flex>
    )
}