import {useTranslation} from "react-i18next";
import React from "react";
import {useNavigate} from "react-router-dom";
import {Flex, Tree, TreeDataNode} from "antd";
import {
    HierarchyFlex,
    HierarchyAddButton,
    HierarchyDeleteButton,
    HierarchyRightFlex,
    HierarchyViewButton
} from "@Turtle/Components/HierarchyComponents";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import SimModelsApi from "@TurtleApp/Api/SimModelsApi";

import TurtleApp from "@TurtleApp/TurtleApp"

import SimModel from "@TurtleApp/Data/SimModel"
import COUSimModel from "@TurtleSim/SimModelsDock/COUSimModel";


export default function SimModelsHierarchy({}) {
    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()

    function createModelsHierarchy(models: Array<SimModel>) {
        return [
            {
                key: "models",
                title: (
                    <Flex>
                        {t("models")} ({models.length})
                        <HierarchyRightFlex>
                            <HierarchyAddButton onClick={createModelPressed}/>

                        </HierarchyRightFlex>
                    </Flex>
                ),
                children: models.map((val) => {
                    return {
                        key: val.uid,
                        title: (
                            <HierarchyFlex>
                                {val.name}

                                <HierarchyRightFlex>

                                    <HierarchyViewButton onClick={() => {
                                        navigate(`/sim-models/${val.uid}`)
                                    }}/>

                                    <HierarchyDeleteButton onClick={() => {
                                        deleteModel(val.uid)
                                    }}/>
                                </HierarchyRightFlex>
                            </HierarchyFlex>
                        ),
                    }
                })
            }
        ]
    }

    const [data, setData] = React.useState<Array<TreeDataNode>>(createModelsHierarchy([]))


    function createModelPressed() {
        const tmp = new SimModel()

        activate({
            title: t("create.model"),
            content: (
                <COUSimModel
                    model={tmp}
                    onBeforeSubmit={deactivate}
                    onAfterSubmit={refresh}
                />
            )
        })
    }

    async function deleteModel(uid: string) {
        TurtleApp.Lock()
        await SimModelsApi.DeleteModel(uid)
        TurtleApp.Unlock()
        refresh()
    }

    async function refresh() {
        const models = await SimModelsApi.ListModels()
        setData(createModelsHierarchy(models))
    }


    React.useEffect(() => {
        refresh()
    }, [])

    return (
        <Tree
            key={data[0]?.children?.length}
            blockNode
            virtual
            showLine
            treeData={data}
            defaultExpandAll={true}
        />
    )
}