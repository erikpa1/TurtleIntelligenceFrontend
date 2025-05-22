import {useTranslation} from "react-i18next";
import React from "react";
import {Flex, Tree, TreeDataNode} from "antd";
import aee from "@Turtle/Data/Aee";
import {
    HierarchyFlex,
    HierarchyAddButton,
    HierarchyDeleteButton,
    HierarchyRightFlex,
    HierarchyViewButton
} from "@Turtle/Components/HierarchyComponents";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import ModelsApi from "@TurtleApp/Api/ModelsApi";
import {useNavigate} from "react-router-dom";
import TurtleApp from "@TurtleApp/TurtleApp";
import EntityForm from "@Turtle/Components/Forms/EntityForm";
import Model from "@TurtleApp/Data/Model";
import ModelProperties from "@TurtleApp/Data/Model_Properties";


export default function ModelsHierarchy({}) {
    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()

    function createModelsHierarchy(models: Array<Model>) {
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
                                        navigate(`/model/${val.uid}`)
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
        const tmp = new Model()

        activate({
            title: t("create.model"),
            content: (
                <EntityForm
                    entity={tmp}
                    properties={ModelProperties.Get()}
                    submitFunction={ModelsApi.COU}
                    onBeforeSubmit={deactivate}
                    onAfterSubmit={refresh}
                />
            )
        })
    }

    async function deleteModel(uid: string) {
        TurtleApp.Lock()
        await ModelsApi.DeleteModel(uid)
        TurtleApp.Unlock()
    }

    async function refresh() {
        const models = await ModelsApi.ListModels()
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