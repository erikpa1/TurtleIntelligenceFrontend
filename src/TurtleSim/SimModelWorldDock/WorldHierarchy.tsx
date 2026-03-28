import React from "react"
import {useTranslation} from "react-i18next"
import {Button, Flex, Tabs} from "antd"

import SimGallery from "@TurtleSim/SimModelWorldDock/SimGallery"
import WorldEntitiesHierarchy from "@TurtleSim/SimModelWorldDock/WorldEntitiesHierarchy"
import {SettingOutlined} from "@ant-design/icons";
import {TopBarWrapperNoFlex} from "@Turtle/Components/TopBarWrapper";


export default function WorldHierarchy({world}) {


    const [t] = useTranslation()

    const [segment, setSegment] = React.useState("library")

    return (
        <>
            <TopBarWrapperNoFlex>
                <Tabs
                    defaultActiveKey="library"
                    centered
                    size={"small"}
                    onChange={setSegment}
                    items={[
                        {
                            label: t("library"),
                            key: "library",
                        },
                        {
                            label: (
                                <Flex>
                                    {t("hierarchy")}
                                </Flex>
                            ),
                            key: "hierarchy",
                        },


                    ]}
                />
            </TopBarWrapperNoFlex>


            <div
                style={{
                    padding: "15px"
                }}
            >
                <Flex
                    vertical
                    gap={10}
                >
                    {
                        segment === "library" && (
                            <SimGallery/>
                        )
                    }

                    {
                        segment === "hierarchy" && (
                            <WorldEntitiesHierarchy world={world}/>
                        )
                    }

                </Flex>
            </div>
        </>
    )

}

