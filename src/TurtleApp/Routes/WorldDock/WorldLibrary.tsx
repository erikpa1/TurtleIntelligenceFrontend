import {useTranslation} from "react-i18next";
import React from "react";
import {Flex, Tree, TreeDataNode} from "antd";
import Entity from "@Turtle/Data/Entity";
import {WorldSingleton} from "@TurtleApp/Data/World";
import aee from "@Turtle/Data/Aee";
import {HierarchyCustomIcon} from "@Turtle/Components/HierarchyComponents";


export default function WorldLibrary() {

    const [t] = useTranslation()

    const commonEntities = getBasicElements(elementSelected)

    const [data] = React.useState<Array<TreeDataNode>>([...commonEntities])

    function addElement(type: string, position: number[]) {
        const entity = new Entity()
        entity.position = position
        entity.type = type

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
            defaultExpandAll={true}
        />
    )

}

function getBasicElements(elementClicked: (element: string) => void): Array<TreeDataNode> {

    const [t] = useTranslation()

    const basicEntities = React.useMemo(() => {
        return [
            {title: t("spawn"), key: "spawn", icon: "/icons/flag_check.svg"},
            {title: t("sink"), key: "sink", icon: "/icons/flag_check.svg"},
            {title: t("process"), key: "process", icon: "/icons/flag_check.svg"},
            {title: t("delay"), key: "delay", icon: "/icons/flag_check.svg"},
            {title: t("queue"), key: "queue", icon: "/icons/flag_check.svg"},
            {title: t("merge"), key: "merge", icon: "/icons/flag_check.svg"},
            {title: t("split"), key: "split", icon: "/icons/flag_check.svg"},
            {title: t("switch"), key: "switch", icon: "/icons/flag_check.svg"},
        ]
    }, [])

    const actors = React.useMemo(() => {
        return [
            {title: t("human"), key: "human", icon: "/icons/flag_check.svg"},
            {title: t("agv"), key: "agv", icon: "/icons/flag_check.svg"},
            {title: t("forklift"), key: "forklift", icon: "/icons/flag_check.svg"},
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
                            <HierarchyCustomIcon icon={val.icon}/>
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