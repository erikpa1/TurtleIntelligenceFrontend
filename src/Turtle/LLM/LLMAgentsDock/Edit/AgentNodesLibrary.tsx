import {Col, Divider, Flex, Row, Tabs} from "antd"
import React from "react"
import {useTranslation} from "react-i18next";
import {MyNavbarItem} from "@Turtle/Components/NavBar";
import {IconSimulation} from "@Turtle/Icons";
import {HierarchyCustomIcon} from "@Turtle/Components/HierarchyComponents";
import NodesLibrary from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/NodesLibrary";

export default function AgentNodesLibrary() {

    const [t] = useTranslation()

    const [activeView, setActiveView] = React.useState("triggers")


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
                                <div>
                                    {val}
                                </div>
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
                                <div>
                                    {val}
                                </div>
                            </Col>
                        )
                    })
                }
            </Row>

            <Divider orientation={"left"}>
                {t("outputs")}
            </Divider>


        </Flex>
    )
}