import React from 'react'

import World, {WorldSingleton} from "@TurtleApp/Data/World"
import {Flex, Tree, TreeDataNode} from "antd";
import Aee from "@Turtle/Data/Aee";
import AeeWrapper from "@Turtle/Data/AeeWrapper";
import aee from "@Turtle/Data/Aee";
import {useTranslation} from "react-i18next";
import {
    HierarchyFlex,
    HierarchyCustomIcon,
    HierarchyDeleteButton,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents";
import SimEntity from "@TurtleApp/Routes/SimModelWorldDock/Data/SimEntity";
import TurtleApp from "@TurtleApp/TurtleApp";
import EntitiesFactory from "@TurtleApp/Factories/EntitiesFactory";


interface WorldEntitiesHierarchyProps {
    world: World
}

export default function WorldEntitiesHierarchy({world}: WorldEntitiesHierarchyProps) {

    const [t] = useTranslation()


    function entityDelete(entity: SimEntity) {
        TurtleApp.Lock()
        WorldSingleton.I.DeleteEntity(entity)
        TurtleApp.Unlock()
    }

    function entitySelected(entity: SimEntity) {
        aee.emit("WorldEntityClicked", entity)
    }

    function createEntitiesTree(): Array<TreeDataNode> {


        return [
            {
                title: t("entities"),
                key: "entities",
                children: Array.from(world.entities.values()).map((val) => {

                    console.log(EntitiesFactory.GetIcon(val.type))

                    return {
                        key: val.uid,
                        title: (
                            <HierarchyFlex
                                onClick={() => {
                                    entitySelected(val)
                                }}
                            >
                                <HierarchyCustomIcon
                                    icon={EntitiesFactory.GetIcon(val.type)}
                                />

                                {val.name}

                                <HierarchyRightFlex>
                                    <HierarchyDeleteButton onClick={() => {
                                        entityDelete(val)
                                    }}/>

                                </HierarchyRightFlex>

                            </HierarchyFlex>
                        ),
                    }
                })
            }
        ]
    }


    const [treeData, setTreeData] = React.useState<Array<TreeDataNode>>(createEntitiesTree())

    function refresh() {
        setTreeData(createEntitiesTree())
    }

    return (
        <AeeWrapper
            aee={aee}
            WorldEntitiesChanged={refresh}
        >
            <Tree
                blockNode
                virtual
                showLine
                defaultExpandAll={true}
                treeData={treeData}
            />
        </AeeWrapper>
    )
}

