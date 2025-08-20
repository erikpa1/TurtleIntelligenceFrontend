import React from "react"
import {useTranslation} from "react-i18next"
import {Button, Flex, Tabs} from "antd"

import SimEntitiesLibrary from "@TurtleApp/Routes/SimModelWorldDock/SimEntitiesLibrary"
import WorldEntitiesHierarchy from "@TurtleApp/Routes/SimModelWorldDock/WorldEntitiesHierarchy"
import {SettingOutlined} from "@ant-design/icons";


export default function WorldHierarchy({world}) {


    const [t] = useTranslation()

    const [segment, setSegment] = React.useState("library")

    return (
        <Flex
            vertical
            gap={10}
        >

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

            {
                segment === "library" && (
                    <SimEntitiesLibrary/>
                )
            }

            {
                segment === "hierarchy" && (
                    <WorldEntitiesHierarchy world={world}/>
                )
            }

        </Flex>
    )

}

