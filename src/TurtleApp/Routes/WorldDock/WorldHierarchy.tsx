import React from "react"
import {useTranslation} from "react-i18next"
import {Flex, Tabs} from "antd"

import WorldLibrary from "@TurtleApp/Routes/WorldDock/WorldLibrary"
import WorldEntitiesHierarchy from "@TurtleApp/Routes/WorldDock/WorldEntitiesHierarchy"


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
                        label: t("hierarchy"),
                        key: "hierarchy",
                    },

                ]}
            />


            {
                segment === "library" && (
                    <WorldLibrary/>
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

