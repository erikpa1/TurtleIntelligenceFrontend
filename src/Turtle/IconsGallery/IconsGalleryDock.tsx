import React from "react"
import {Col, Flex, Row, Space, Splitter} from "antd";
import IconAutoRenew from "../../TurtleIcons/IconAutoRenew";

import IconCleaningServices from "../../TurtleIcons/IconCleaningServices";
import IconColor from "../../TurtleIcons/IconColor";
import IconDatabaseSearch from "../../TurtleIcons/IconDatabaseSearch";
import IconFlagCheck from "../../TurtleIcons/IconFlagCheck";
import {IconFolder, IconSimulation, IconWidgets} from "../../TurtleIcons";
import IconNetworkIntelNode from "../../TurtleIcons/IconNetworkIntelNode";
import IconSearchInsight from "../../TurtleIcons/IconSearchInsight";
import IconSprint from "../../TurtleIcons/IconSprint";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import IconChat from "../../TurtleIcons/IconChat";
import IconRobot2 from "../../TurtleIcons/IconRobot2";
import IconApi from "../../TurtleIcons/IconApi";
import IconWebhook from "../../TurtleIcons/IconWebhook";
import IconOllama from "../../TurtleIcons/IconOllama";
import IconBookmarkManager from "../../TurtleIcons/IconBookmarkManager";
import {SplitterWithHeader} from "@Turtle/Antd/Splitter";
import IconRepeat from "../../TurtleIcons/IconRepeat"
import IconLeftClick from "../../TurtleIcons/IconLeftClick"
import IconJson from "../../TurtleIcons/IconJson"
import IconSupportAgent from "../../TurtleIcons/IconSupportAgent"
import IconArticlePerson from "../../TurtleIcons/IconArticlePerson"
import IconClinicalNotes from "../../TurtleIcons/IconClinicalNotes";
import IconSdCard from "../../TurtleIcons/IconSdCard";
import IconDriveFileMove from "../../TurtleIcons/IconDriveFileMove";
import IconSave from "../../TurtleIcons/IconSave"
import IconExportNotes from "../../TurtleIcons/IconExportNotes"
import IconDriveFolderUpload from "../../TurtleIcons/IconDriveFolderUpload";
import IconTortoise from "../../TurtleIcons/IconTortoise"


export default function IconsGalleryDock({}) {

    const {bigPadding} = useTurtleTheme()

    return (
        <SplitterWithHeader topbar={<></>}>
            <Splitter.Panel>
                <div style={{
                    padding: bigPadding,

                }}>
                    <IconsGallery/>
                </div>
            </Splitter.Panel>
        </SplitterWithHeader>
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
                        ["BookmarkManager", IconBookmarkManager],
                        ["Repeat", IconRepeat],
                        ["LeftClick", IconLeftClick],
                        ["Json", IconJson],
                        ["SupportAgent", IconSupportAgent],
                        ["ArticlePerson", IconArticlePerson],
                        ["IconClinicalNotes", IconClinicalNotes],
                        ["IconSdCard", IconSdCard],
                        ["IconDriveFileMove", IconDriveFileMove],
                        ["IconSave", IconSave],
                        ["IconExportNotes", IconExportNotes],
                        ["IconDriveFolderUpload", IconDriveFolderUpload],
                        ["IconTortoise", IconTortoise],
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