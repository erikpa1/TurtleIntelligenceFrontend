import {useTranslation} from "react-i18next"
import React from "react"
import {Flex, Tree, TreeDataNode} from "antd"

import {WorldSingleton} from "@TurtleApp/Data/World"
import aee from "@Turtle/Data/Aee"
import {HierarchyCustomIcon} from "@Turtle/Components/HierarchyComponents"
import TurtleApp from "@TurtleApp/TurtleApp"
import {fetchMongoUid} from "@Turtle/Utils/Uid"
import IconFlagCheck from "@Turtle/Icons/IconFlagCheck"
import SimFactory from "@TurtleSim/Factories/SimFactory"
import SimEntity from "@TurtleSim/SimModelWorldDock/Data/SimEntity"


export default function SimGallery() {

    const [t] = useTranslation()

    const commonEntities = getBasicElements(elementSelected)

    const [data] = React.useState<Array<TreeDataNode>>([...commonEntities])

    async function addElement(type: string, position: number[]) {
        TurtleApp.Lock()

        const entity = new SimEntity()
        entity.name = type
        entity.position = position
        entity.type = type
        entity.uid = await fetchMongoUid()

        TurtleApp.Unlock()

        WorldSingleton.I.AddEntity(entity)
    }

    function elementSelected(element: string) {
        aee.emit("World_PickEntity", (position) => {
            addElement(element, position)
        })
    }

    React.useEffect(() => {

    }, [])

    return (
        <Tree
            treeData={data}
            blockNode
            virtual
            showLine
            defaultExpandAll={true}
        />
    )

}

function getBasicElements(elementClicked: (element: string) => void): Array<TreeDataNode> {

    const [t] = useTranslation()

    const basicEntities = React.useMemo(() => {
        return [
            {title: t(SimFactory.TYPE_SPAWN), key: SimFactory.TYPE_SPAWN},
            {title: t(SimFactory.TYPE_PROCESS), key: SimFactory.TYPE_PROCESS},
            {title: t(SimFactory.TYPE_DELAY), key: SimFactory.TYPE_DELAY},
            {title: t(SimFactory.TYPE_BUFFER), key: SimFactory.TYPE_BUFFER},
            {title: t(SimFactory.TYPE_QUEUE), key: SimFactory.TYPE_QUEUE},
            {title: t(SimFactory.TYPE_MERGE), key: SimFactory.TYPE_MERGE},
            {title: t(SimFactory.TYPE_SPLIT), key: SimFactory.TYPE_SPLIT},
            {title: t(SimFactory.TYPE_SWITCH), key: SimFactory.TYPE_SWITCH},
            {title: t(SimFactory.TYPE_SINK), key: SimFactory.TYPE_SINK},
        ]
    }, [])

    const resources = React.useMemo(() => {
        return [
            {title: t(SimFactory.TYPE_WORKER_POOL), key: SimFactory.TYPE_WORKER_POOL},

        ]
    }, [])

    const actors = React.useMemo(() => {
        return [
            {title: t("human"), key: "human", icon: "/icons/robot_2.svg"},
            {title: t("agv"), key: "agv", icon: "/icons/robot_2.svg"},
            {title: t("forklift"), key: "forklift", icon: "/icons/robot_2.svg"},
        ]
    }, [])

    return React.useMemo(() => {
        return [
            {
                title: t("process.modeling"),
                key: "process_modeling",
                children: basicEntities.map((val) => ({
                    key: val.key,
                    title: (
                        <Flex
                            gap={10}
                            flex={1}
                            onClick={() => {
                                elementClicked(val.key)
                            }}
                        >
                            <HierarchyCustomIcon icon={SimFactory.GetIconSvg(val.key)}/>
                            {val.title}
                        </Flex>
                    ),
                }))
            },
            {
                title: t("resources"),
                key: "resources",
                children: resources.map((val) => ({
                    key: val.key,
                    title: (
                        <Flex
                            gap={10}
                            flex={1}
                            onClick={() => {
                                elementClicked(val.key)
                            }}
                        >
                            <HierarchyCustomIcon icon={SimFactory.GetIconSvg(val.key)}/>
                            {val.title}
                        </Flex>
                    ),
                }))
            },
            {
                title: t("actors"),
                key: "actors",
                children: actors.map((val) => ({
                    key: val.key,
                    title: (
                        <Flex
                            gap={10}
                            flex={1}
                            onClick={() => {
                                elementClicked(val.key)
                            }}
                        >
                            <HierarchyCustomIcon icon={val.icon}/>
                            {val.title}
                        </Flex>
                    ),
                }))
            }
        ]
    }, [])


}