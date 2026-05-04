import React from "react"
import {useTranslation} from "react-i18next"
import {Button, Flex, Tabs} from "antd"

import SimEntitiesGallery from "@TurtleSim/SimModelWorldDock/SimEntitiesGallery"
import SimEntitiesHierarchy from "@TurtleSim/SimModelWorldDock/SimEntitiesHierarchy"
import {SettingOutlined} from "@ant-design/icons";
import {TopBarWrapperNoFlex} from "@Turtle/Components/TopBarWrapper";


export default function SimWorldHierarchy({world}) {


    const [t] = useTranslation()


    const [segment, setSegment] = React.useState("library")

    return (
        <>
            <TopBarWrapperNoFlex>
                <Tabs
                    className="no-border-tabs"
                    type={"line"}
                    tabBarStyle={{borderBottom: 'none'}}
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
                            label: t("hierarchy"),
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
                            <SimEntitiesGallery/>
                        )
                    }

                    {
                        segment === "hierarchy" && (
                            <SimEntitiesHierarchy world={world}/>
                        )
                    }

                </Flex>
            </div>
        </>
    )

}

