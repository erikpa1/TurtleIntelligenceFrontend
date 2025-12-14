import React from "react"
import {Col, Flex, Row, Space} from "antd";
import IconAutoRenew from "@Turtle/Icons/IconAutoRenew";

import IconCleaningServices from "@Turtle/Icons/IconCleaningServices";
import IconColor from "@Turtle/Icons/IconColor";
import IconDatabaseSearch from "@Turtle/Icons/IconDatabaseSearch";
import IconFlagCheck from "@Turtle/Icons/IconFlagCheck";
import {IconFolder, IconSimulation, IconWidgets} from "@Turtle/Icons";
import IconNetworkIntelNode from "@Turtle/Icons/IconNetworkIntelNode";
import IconSearchInsight from "@Turtle/Icons/IconSearchInsight";
import IconSprint from "@Turtle/Icons/IconSprint";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import IconChat from "@Turtle/Icons/IconChat";
import IconRobot2 from "@Turtle/Icons/IconRobot2";
import IconApi from "@Turtle/Icons/IconApi";
import IconWebhook from "@Turtle/Icons/IconWebhook";
import IconOllama from "@Turtle/Icons/IconOllama";


export default function IconsGalleryDock({}) {

    const {bigPadding} = useTurtleTheme()

    return (
        <div style={{
            padding: bigPadding,

        }}>
            <IconsGallery/>
        </div>
    )
}

export function IconsGallery({}) {

    const {bigPadding} = useTurtleTheme()


    return (
        <Flex
            vertical
            gap={15}
        >

            <Row>
                {
                    [
                        ["AutoRenew", IconAutoRenew],
                        ["CleaningServices", IconCleaningServices],
                        ["Color", IconColor],
                        ["DatabaseSearch", IconDatabaseSearch],
                        ["FlagCheck", IconFlagCheck],
                        ["Folder", IconFolder],
                        ["NetworkIntelNode", IconNetworkIntelNode],
                        ["SearchInsight", IconSearchInsight],
                        ["Simulation", IconSimulation],
                        ["Sprint", IconSprint],
                        ["Widgets", IconWidgets],
                        ["Chat", IconChat],
                        ["Robot2", IconRobot2],
                        ["Api", IconApi],
                        ["Webhook", IconWebhook],
                        ["Ollama", IconOllama],
                    ].map(([lang, icon], i) => {

                        const tmp: any = React.createElement(icon, {
                            width: "75px",
                            height: "75px",
                        } as any)

                        return (
                            <Col
                                span={6}
                                key={i}
                                style={{
                                    padding: bigPadding,
                                }}
                            >
                                <Space>
                                    {tmp}
                                    {lang}
                                </Space>

                            </Col>
                        )
                    })
                }
            </Row>

        </Flex>
    )
}