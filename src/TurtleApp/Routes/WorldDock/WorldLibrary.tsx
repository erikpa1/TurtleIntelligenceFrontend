import {useTranslation} from "react-i18next";
import React from "react";
import {Flex, Tree, TreeDataNode} from "antd";
import Entity from "@Turtle/Data/Entity";
import {WorldSingleton} from "@TurtleApp/Data/World";
import aee from "@Turtle/Data/Aee";
import {HierarchyCustomIcon} from "@Turtle/Components/HierarchyComponents";
import TurtleApp from "@TurtleApp/TurtleApp";
import {fetchMongoUid} from "@Turtle/Utils/Uid";
import IconFlagCheck from "@Turtle/Icons/IconFlagCheck";
import EntitiesFactory from "@TurtleApp/Factories/EntitiesFactory";


export default function WorldLibrary() {

    const [t] = useTranslation()

    const commonEntities = getBasicElements(elementSelected)

    const [data] = React.useState<Array<TreeDataNode>>([...commonEntities])

    async function addElement(type: string, position: number[]) {
        TurtleApp.Lock()

        const entity = new Entity()
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
            defaultExpandAll={true}
            virtual
        />
    )

}

function getBasicElements(elementClicked: (element: string) => void): Array<TreeDataNode> {

    const [t] = useTranslation()

    const basicEntities = React.useMemo(() => {
        return [
            {title: t("spawn"), key: "spawn"},
            {title: t("process"), key: "process"},
            {title: t("delay"), key: "delay",},
            {title: t("buffer"), key: "buffer"},
            {title: t("queue"), key: "queue"},
            {title: t("merge"), key: "merge"},
            {title: t("split"), key: "split"},
            {title: t("switch"), key: "switch"},
            {title: t("sink"), key: "sink"},
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
                            <HierarchyCustomIcon icon={EntitiesFactory.GetIconSvg(val.key)}/>
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
                            <HierarchyCustomIcon icon={<IconFlagCheck/>}/>
                            {val.title}
                        </Flex>
                    ),
                }))
            }
        ]
    }, [])


}