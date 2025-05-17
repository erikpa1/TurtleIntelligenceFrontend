import React from 'react'

import World, {WorldSingleton} from "@TurtleApp/Data/World"
import {Flex, Tree, TreeDataNode} from "antd";
import Aee from "@Turtle/Data/Aee";
import AeeWrapper from "@Turtle/Data/AeeWrapper";
import aee from "@Turtle/Data/Aee";
import {useTranslation} from "react-i18next";
import {HierarchFlex, HierarchyDeleteButton, HierarchyRightFlex} from "@Turtle/Components/HierarchyComponents";
import Entity from "@Turtle/Data/Entity";
import TurtleApp from "@TurtleApp/TurtleApp";


interface WorldEntitiesHierarchyProps {
    world: World
}

export default function WorldEntitiesHierarchy({world}: WorldEntitiesHierarchyProps) {

    const [t] = useTranslation()


    function entityDelete(entity: Entity) {
        TurtleApp.Lock()
        WorldSingleton.I.DeleteEntity(entity)
        TurtleApp.Unlock()
    }

    function entitySelected(entity: Entity) {
        aee.emit("WorldEntityClicked", entity)
    }

    function createEntitiesTree(): Array<TreeDataNode> {
        return [
            {
                title: t("entities"),
                key: "entities",
                children: world.entities.map((val) => {
                    return {
                        key: val.uid,
                        title: (
                            <HierarchFlex
                                onClick={() => {
                                    entitySelected(val)
                                }}
                            >
                                {val.uid}

                                <HierarchyRightFlex>
                                    <HierarchyDeleteButton onClick={() => {
                                        entityDelete(val)
                                    }}/>

                                </HierarchyRightFlex>

                            </HierarchFlex>
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
                treeData={treeData}
                defaultExpandAll={true}
                virtual
            />
        </AeeWrapper>
    )
}

