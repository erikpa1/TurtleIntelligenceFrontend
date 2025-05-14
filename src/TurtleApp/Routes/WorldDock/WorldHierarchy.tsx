import React from "react"
import {useTranslation} from "react-i18next";
import {Flex, Segmented, Tabs, Tree, TreeDataNode} from "antd";
import aee from "@Turtle/Data/Aee";
import {HierarchyCustomIcon} from "@Turtle/Components/HierarchyComponents";
import Entity from "@Turtle/Data/Entity";
import {WorldSingleton} from "@TurtleApp/Data/World";
import IconSimulation from "@Turtle/Icons/IconSimulation";
import WorldLibrary from "@TurtleApp/Routes/WorldDock/WorldLibrary";


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
                    <div>Here</div>
                )
            }

        </Flex>
    )

}

